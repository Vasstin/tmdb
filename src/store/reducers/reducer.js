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
    nowPlaying: { ...state.nowPlaying, movies: action.payload},
  };
};
const setLatestTv = (state, action) => {
  return {
    ...state,
    nowPlaying: { ...state.nowPlaying, tvs: action.payload},
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
    default:
      return state;
  }
};

export default moviesReducer;
