import * as actionTypes from "../actions/actionTypes";

const initialState = {
  popular: {
    movies: {
      movies: [],
      allPopularMovies: [],
      currentPage: 1,
      totalPages: 10,
    },
    tvs: {
      tvs: [],
      allPopularTvs: [],
      currentPage: 1,
      totalPages: 10,
    },
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
    topCast: [],
  },
  isError: false,
};

const setPopularMovies = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      movies: { ...state.popular.movies, movies: action.payload },
    },
  };
};
const setAllPopularMovies = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      movies: { ...state.popular.movies, allPopularMovies: action.payload },
    },
  };
};
const setMoviesTotalPages = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      movies: { ...state.popular.movies, totalPages: action.payload },
    },
  };
};
const setMoviesCurrentPage = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      movies: { ...state.popular.movies, currentPage: action.payload },
    },
  };
};

const cleanupPopularMovies = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      movies: { ...state.popular.movies, movies: [] },
    },
  };
};
const cleanupPopularMoviesCurrentPage = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      movies: { ...state.popular.movies, currentPage: 1 },
    },
  };
};

const setPopularTvs = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      tvs: { ...state.popular.tvs, tvs: action.payload },
    },
  };
};

const setTvsTotalPages = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      tvs: { ...state.popular.tvs, totalPages: action.payload },
    },
  };
};
const setTvsCurrentPage = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      tvs: { ...state.popular.tvs, currentPage: action.payload },
    },
  };
};

const cleanupPopularTvsCurrentPage = (state, action) => {
  return {
    ...state,
    popular: {
      ...state.popular,
      tvs: { ...state.popular.tvs, currentPage: 1 },
    },
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
const setTopCast = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, topCast: action.payload },
  };
};

const cleanupTopCast = (state, action) => {
  return {
    ...state,
    cardData: { ...state.cardData, topCast: [] },
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
const isError = (state, action) => {
  return {
    ...state,
    isError: action.error,
  };
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POPULAR_MOVIES_START:
      return { ...state };
    case actionTypes.FETCH_POPULAR_MOVIES_SUCCESS:
      return setPopularMovies(state, action);
    case actionTypes.FETCH_ALL_POPULAR_MOVIES_START:
      return { ...state };
    case actionTypes.FETCH_ALL_POPULAR_MOVIES_SUCCESS:
      return setAllPopularMovies(state, action);
    case actionTypes.FETCH_ALL_POPULAR_MOVIES_FAIL:
      return isError(state, action);
    case actionTypes.SET_MOVIES_TOTAL_PAGES:
      return setMoviesTotalPages(state, action);
    case actionTypes.SET_MOVIES_CURRENT_PAGE:
      return setMoviesCurrentPage(state, action);
    case actionTypes.CLEANUP_POPULAR_MOVIES:
      return cleanupPopularMovies(state, action);
    case actionTypes.CLEANUP_POPULAR_MOVIES_CURRENT_PAGE:
      return cleanupPopularMoviesCurrentPage(state, action);
    case actionTypes.FETCH_POPULAR_MOVIES_FAIL:
      return isError(state, action);
    case actionTypes.FETCH_POPULAR_TVS_START:
      return { ...state };
    case actionTypes.FETCH_POPULAR_TVS_SUCCESS:
      return setPopularTvs(state, action);
    case actionTypes.FETCH_POPULAR_TVS_FAIL:
      return isError(state, action);
    case actionTypes.SET_TVS_TOTAL_PAGES:
      return setTvsTotalPages(state, action);
    case actionTypes.SET_TVS_CURRENT_PAGE:
      return setTvsCurrentPage(state, action);
    case actionTypes.CLEANUP_POPULAR_TVS_CURRENT_PAGE:
      return cleanupPopularTvsCurrentPage(state, action);
    case actionTypes.FETCH_TRANDING_PER_DAY_START:
      return { ...state };
    case actionTypes.FETCH_TRANDING_PER_DAY_SUCCESS:
      return setTrandingPerDay(state, action);
    case actionTypes.FETCH_TRANDING_PER_DAY_FAIL:
      return isError(state, action);
    case actionTypes.FETCH_TRANDING_PER_WEEK_START:
      return { ...state };
    case actionTypes.FETCH_TRANDING_PER_WEEK_SUCCESS:
      return setTrandingPerWeek(state, action);
    case actionTypes.FETCH_TRANDING_PER_WEEK_FAIL:
      return isError(state, action);
    case actionTypes.FETCH_NOW_PLAYING_MOVIES_START:
      return { ...state };
    case actionTypes.FETCH_NOW_PLAYING_MOVIES_SUCCESS:
      return setNowPlayingMovies(state, action);
    case actionTypes.FETCH_NOW_PLAYING_MOVIES_FAIL:
      return isError(state, action);
    case actionTypes.FETCH_LATEST_TV_START:
      return { ...state };
    case actionTypes.FETCH_LATEST_TV_SUCCESS:
      return setLatestTv(state, action);
    case actionTypes.FETCH_LATEST_TV_FAIL:
      return isError(state, action);
    case actionTypes.FETCH_CARD_DATA_START:
      return { ...state };
    case actionTypes.FETCH_CARD_DATA_SUCCESS:
      return setCardData(state, action);
    case actionTypes.FETCH_CARD_DATA_FAIL:
      return isError(state, action);
    case actionTypes.CLEANUP_CARD_DATA:
      return cleanupCardData(state, action);
    case actionTypes.FETCH_TRAILERS_START:
      return { ...state };
    case actionTypes.FETCH_TRAILERS_SUCCESS:
      return setTrailers(state, action);
    case actionTypes.FETCH_TRAILERS_FAIL:
      return isError(state, action);
    case actionTypes.FETCH_CREW_AND_CAST_START:
      return { ...state };
    case actionTypes.FETCH_CREW_SUCCESS:
      return setCrew(state, action);
    case actionTypes.FETCH_CAST_SUCCESS:
      return setCast(state, action);
    case actionTypes.SET_TOP_CAST_SUCCESS:
      return setTopCast(state, action);
    case actionTypes.FETCH_CREW_AND_CAST_FAIL:
      return isError(state, action);
    case actionTypes.CLEANUP_TOP_CAST:
      return cleanupTopCast(state, action);
    case actionTypes.FETCH_RECOMMEND_AND_SIMILAR_START:
      return { ...state };
    case actionTypes.FETCH_RECOMMEND_SUCCESS:
      return setRecommendationsMovies(state, action);
    case actionTypes.FETCH_SIMILAR_SUCCESS:
      return setSimilarMovies(state, action);
    case actionTypes.FETCH_RECOMMEND_AND_SIMILAR_FAIL:
      return isError(state, action);
    default:
      return state;
  }
};

export default moviesReducer;
