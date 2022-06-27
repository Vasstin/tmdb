import * as actionTypes from "../actions/actionTypes";

const initialState = {
  popular: {
    movies: [],
    tvs: [],
  },
  tranding: {
    day: [],
    week: [],
  },
  nowPlaying: {
    movies: [],
    tvs: [],
  },
  advicedMovies: {
    recommendations: [],
    similar: [],
  },
  cardData: {
    data: {},
    cast: [],
    crew: [],
    trailers: [],
  },
};

const setPopularMovies = (state, action) => {
  return {
    ...state,
    popular: { ...state.popular, movies: action.payload },
  };
};
const setPopularTvs = (state, action) => {
  return {
    ...state,
    popular: { ...state.popular, tvs: action.payload },
  };
};
const setTrandingPerDay = (state, action) => {
  return {
    ...state,
    tranding: { ...state.tranding, day: action.payload },
  };
};
const setTrandingPerWeek = (state, action) => {
  return {
    ...state,
    tranding: { ...state.tranding, week: action.payload },
  };
};
const setNowPlayingMovies = (state, action) => {
  return {
    ...state,
    nowPlaying: { ...state.nowPlaying, movies: action.payload },
  };
};
const setLatestTv = (state, action) => {
  return {
    ...state,
    nowPlaying: { ...state.nowPlaying, tvs: action.payload },
  };
};
const setCardData = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, data: action.payload },
  };
};

const cleanupCardData = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, data: [] },
  };
};

const setTrailers = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, trailers: action.payload },
  };
};
const setCrew = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, crew: action.payload },
  };
};
const setCast = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, cast: action.payload },
  };
};

const cleanupCast = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, cast: [] },
  };
};

const setRecommendationsMovies = (state, action) => {
  return {
    ...state,
    advicedMovies: { ...state.advicedMovies, recommendations: action.payload },
  };
};
const setSimilarMovies = (state, action) => {
  return {
    ...state,
    advicedMovies: { ...state.advicedMovies, similar: action.payload },
  };
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POPULAR_MOVIES_START:
      return { ...state };
    case actionTypes.FETCH_POPULAR_MOVIES_SUCCESS:
      return setPopularMovies(state, action);
    case actionTypes.FETCH_POPULAR_MOVIES_FAIL:
      return { ...state };
    case actionTypes.FETCH_POPULAR_TVS_START:
      return { ...state };
    case actionTypes.FETCH_POPULAR_TVS_SUCCESS:
      return setPopularTvs(state, action);
    case actionTypes.FETCH_POPULAR_TVS_FAIL:
      return { ...state };
    case actionTypes.FETCH_TRANDING_PER_DAY_START:
      return { ...state };
    case actionTypes.FETCH_TRANDING_PER_DAY_SUCCESS:
      return setTrandingPerDay(state, action);
    case actionTypes.FETCH_TRANDING_PER_DAY_FAIL:
      return { ...state };
    case actionTypes.FETCH_TRANDING_PER_WEEK_START:
      return { ...state };
    case actionTypes.FETCH_TRANDING_PER_WEEK_SUCCESS:
      return setTrandingPerWeek(state, action);
    case actionTypes.FETCH_TRANDING_PER_WEEK_FAIL:
      return { ...state };
    case actionTypes.FETCH_NOW_PLAYING_MOVIES_START:
      return { ...state };
    case actionTypes.FETCH_NOW_PLAYING_MOVIES_SUCCESS:
      return setNowPlayingMovies(state, action);
    case actionTypes.FETCH_NOW_PLAYING_MOVIES_FAIL:
      return { ...state };
    case actionTypes.FETCH_LATEST_TV_START:
      return { ...state };
    case actionTypes.FETCH_LATEST_TV_SUCCESS:
      return setLatestTv(state, action);
    case actionTypes.FETCH_LATEST_TV_FAIL:
      return { ...state };
    case actionTypes.FETCH_CARD_DATA_START:
      return { ...state };
    case actionTypes.FETCH_CARD_DATA_SUCCESS:
      return setCardData(state, action);
    case actionTypes.FETCH_CARD_DATA_FAIL:
      return { ...state };
    case actionTypes.CLEANUP_CARD_DATA:
      return cleanupCardData(state, action);
    case actionTypes.FETCH_TRAILERS_START:
      return { ...state };
    case actionTypes.FETCH_TRAILERS_SUCCESS:
      return setTrailers(state, action);
    case actionTypes.FETCH_TRAILERS_FAIL:
      return { ...state };
    case actionTypes.FETCH_CREW_AND_CAST_START:
      return { ...state };
    case actionTypes.FETCH_CREW_SUCCESS:
      return setCrew(state, action);
    case actionTypes.FETCH_CAST_SUCCESS:
      return setCast(state, action);
    case actionTypes.FETCH_CREW_AND_CAST_FAIL:
      return { ...state };
    case actionTypes.CLEANUP_CAST:
      return cleanupCast(state, action);
    case actionTypes.FETCH_RECOMMEND_AND_SIMILAR_START:
      return { ...state };
    case actionTypes.FETCH_RECOMMEND_SUCCESS:
      return setRecommendationsMovies(state, action);
    case actionTypes.FETCH_SIMILAR_SUCCESS:
      return setSimilarMovies(state, action);
    case actionTypes.FETCH_RECOMMEND_AND_SIMILAR_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default moviesReducer;
