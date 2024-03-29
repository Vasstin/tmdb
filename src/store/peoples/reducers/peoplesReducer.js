import * as actionTypes from "../../peoples/actions/actionTypes";

const initialState = {
  popular: {
    people: [],
    currentPage: 1,
    totalPages: 10,
  },
  cardData: {
    data: {},
    cast: [],
    crew: [],
    media: [],
    // trailers: [],
  },
  isError: false,
};

const setPeopleCardData = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, data: action.payload },
  };
};
const setPeopleCardDataMedia = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, media: action.payload },
  };
};
const setPeoplePopular = (state, action) => {
  return {
    ...state,
    popular: { ...state.popular, people: action.payload },
  };
};
const setPeopleCurrentPage = (state, action) => {
  return {
    ...state,
    popular: { ...state.popular, currentPage: action.payload },
  };
};
const setPeopleTotalPages = (state, action) => {
  return {
    ...state,
    popular: { ...state.popular, totalPages: action.payload },
  };
};

const cleanupPeopleCurrentPage = (state, action) => {
  return {
    ...state,
    popular: { ...state.popular, currentPage: 1 },
  };
};
const setPeopleCreditsCrew = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, crew: action.payload },
  };
};
const setPeopleCreditsCast = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, cast: action.payload },
  };
};

const cleanupCardData = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, data: [], cast: [], crew: [] },
  };
};

const isError = (state, action) => {
  return {
    ...state,
    isError: action.error,
  };
};

const peoplesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PEOPLE_CARD_DATA_START:
      return { ...state };
    case actionTypes.FETCH_PEOPLE_CARD_DATA_SUCCESS:
      return setPeopleCardData(state, action);
    case actionTypes.FETCH_PEOPLE_CARD_DATA_FAIL:
      return isError(state, action);
    case actionTypes.FETCH_PEOPLE_CARD_DATA_MEDIA_START:
      return { ...state };
    case actionTypes.FETCH_PEOPLE_CARD_DATA_MEDIA_SUCCESS:
      return setPeopleCardDataMedia(state, action);
    case actionTypes.FETCH_PEOPLE_CARD_DATA_MEDIA_FAIL:
      return isError(state, action);
    case actionTypes.FETCH_PEOPLE_POPULAR_START:
      return { ...state };
    case actionTypes.FETCH_PEOPLE_POPULAR_SUCCESS:
      return setPeoplePopular(state, action);
    case actionTypes.FETCH_PEOPLE_POPULAR_FAIL:
      return isError(state, action);
    case actionTypes.SET_PEOPLE_CURRENT_PAGE:
      return setPeopleCurrentPage(state, action);
    case actionTypes.SET_PEOPLE_TOTAL_PAGES:
      return setPeopleTotalPages(state, action);
    case actionTypes.CLEANUP_PEOPLE_CURRENT_PAGE:
      return cleanupPeopleCurrentPage(state, action);
    case actionTypes.FETCH_PEOPLE_CREDITS_START:
      return { ...state };
    case actionTypes.FETCH_PEOPLE_CREDITS_CREW_SUCCESS:
      return setPeopleCreditsCrew(state, action);
    case actionTypes.FETCH_PEOPLE_CREDITS_CAST_SUCCESS:
      return setPeopleCreditsCast(state, action);
    case actionTypes.FETCH_PEOPLE_CREDITS_FAIL:
      return isError(state, action);
    case actionTypes.CLEANUP_CARD_DATA:
      return cleanupCardData(state, action);
    default:
      return state;
  }
};

export default peoplesReducer;
