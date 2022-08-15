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
    // trailers: [],
  },
};

const setPeopleCardData = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, data: action.payload },
  };
};
const setPeoplePopular = (state, action) => {
  return {
    ...state,
    popular: { ...state.popular, people: action.payload },
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

const peoplesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PEOPLE_CARD_DATA_START:
      return { ...state };
    case actionTypes.FETCH_PEOPLE_CARD_DATA_SUCCESS:
      return setPeopleCardData(state, action);
    case actionTypes.FETCH_PEOPLE_CARD_DATA_FAIL:
      return { ...state };
    case actionTypes.FETCH_PEOPLE_POPULAR_START:
      return { ...state };
    case actionTypes.FETCH_PEOPLE_POPULAR_SUCCESS:
      return setPeoplePopular(state, action);
    case actionTypes.FETCH_PEOPLE_POPULAR_FAIL:
      return { ...state };
    case actionTypes.FETCH_PEOPLE_CREDITS_START:
      return { ...state };
    case actionTypes.FETCH_PEOPLE_CREDITS_CREW_SUCCESS:
      return setPeopleCreditsCrew(state, action);
    case actionTypes.FETCH_PEOPLE_CREDITS_CAST_SUCCESS:
      return setPeopleCreditsCast(state, action);
    case actionTypes.FETCH_PEOPLE_CREDITS_FAIL:
      return { ...state };
    case actionTypes.CLEANUP_CARD_DATA:
      return cleanupCardData(state, action);
    default:
      return state;
  }
};

export default peoplesReducer;
