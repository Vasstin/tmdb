import * as actionTypes from "../../search/actions/actionTypes";

const initialState = {
  search: {
    data: [],
    currentPage: 1,
    totalPages: 10,
  },
  isError: false,
};

const setSearchData = (state, action) => {
  return {
    ...state,
    search: { ...state.search, data: action.payload },
  };
};
const setSearchTotalPages = (state, action) => {
  return {
    ...state,
    search: { ...state.search, totalPages: action.payload },
  };
};

const isError = (state, action) => {
  return {
    ...state,
    isError: action.error,
  };
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SEARCH_DATA_START:
      return { ...state };
    case actionTypes.FETCH_SEARCH_DATA_SUCCESS:
      return setSearchData(state, action);
    case actionTypes.FETCH_SEARCH_DATA_FAIL:
      return isError(state, action);
    case actionTypes.SET_SEARCH_TOTAL_PAGES:
      return setSearchTotalPages(state, action);
    
    default:
      return state;
  }
};

export default searchReducer;
