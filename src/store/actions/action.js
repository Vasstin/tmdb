import * as actionTypes from "./actionTypes";
import apiKey from "../../utility/apiKey";
import tmdbUrl from "../../utility/tmdbUrl";

export const fetchPopularMoviesStart = () => {
  return {
    type: actionTypes.FETCH_POPULAR_MOVIES_START,
  };
};
export const fetchPopularMoviesSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_POPULAR_MOVIES_SUCCESS,
    payload: payload,
  };
};
export const fetchPopularMoviesFail = (error) => {
  return {
    type: actionTypes.FETCH_POPULAR_MOVIES_FAIL,
    error: error,
  };
};

export const fetchPopularTvsStart = () => {
  return {
    type: actionTypes.FETCH_POPULAR_TVS_START,
  };
};
export const fetchPopularTvsSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_POPULAR_TVS_SUCCESS,
    payload: payload,
  };
};
export const fetchPopularTvsFail = (error) => {
  return {
    type: actionTypes.FETCH_POPULAR_TVS_FAIL,
    error: error,
  };
};

export const fetchTrandingPerDayStart = () => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_DAY_START,
  };
};
export const fetchTrandingPerDaySuccess = (payload) => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_DAY_SUCCESS,
    payload: payload,
  };
};
export const fetchTrandingPerDayFail = (error) => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_DAY_FAIL,
    error: error,
  };
};
export const fetchTrandingPerWeekStart = () => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_WEEK_START,
  };
};
export const fetchTrandingPerWeekSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_WEEK_SUCCESS,
    payload: payload,
  };
};
export const fetchTrandingPerWeekFail = (error) => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_WEEK_FAIL,
    error: error,
  };
};

export const fetchNowPlayingMoviesStart = () => {
  return {
    type: actionTypes.FETCH_NOW_PLAYING_MOVIES_START,
  };
};
export const fetchNowPlayingMoviesSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_NOW_PLAYING_MOVIES_SUCCESS,
    payload: payload,
  };
};
export const fetchNowPlayingMoviesFail = (error) => {
  return {
    type: actionTypes.FETCH_NOW_PLAYING_MOVIES_FAIL,
    error: error,
  };
};

export const fetchLatestTvStart = () => {
  return {
    type: actionTypes.FETCH_LATEST_TV_START,
  };
};
export const fetchLatestTvSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_LATEST_TV_SUCCESS,
    payload: payload,
  };
};
export const fetchLatestTvFail = (error) => {
  return {
    type: actionTypes.FETCH_LATEST_TV_FAIL,
    error: error,
  };
};

export const fetchPopularMovies = () => {
  return (dispatch) => {
    dispatch(fetchPopularMoviesStart());
    tmdbUrl
      .get(`movie/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) =>
        dispatch(fetchPopularMoviesSuccess(response.data.results))
      );
  };
};
export const fetchPopularTvs = () => {
  return (dispatch) => {
    dispatch(fetchPopularTvsStart());
    tmdbUrl
      .get(`tv/popular?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) =>
        dispatch(fetchPopularTvsSuccess(response.data.results))
      );
  };
};

export const fetchTrandingPerDay = () => {
  return (dispatch) => {
    dispatch(fetchTrandingPerDayStart());
    tmdbUrl
      .get(`trending/all/day?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) =>
        dispatch(fetchTrandingPerDaySuccess(response.data.results))
      );
  };
};
export const fetchTrandingPerWeek = () => {
  return (dispatch) => {
    dispatch(fetchTrandingPerWeekStart());
    tmdbUrl
      .get(`trending/all/week?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) =>
        dispatch(fetchTrandingPerWeekSuccess(response.data.results))
      );
  };
};

export const fetchNowPlayingMovies = () => {
  return (dispatch) => {
    dispatch(fetchNowPlayingMoviesStart());
    tmdbUrl
      .get(`movie/now_playing?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) =>
        dispatch(fetchNowPlayingMoviesSuccess(response.data.results))
      );
  };
};

export const fetchLatestTv = () => {
  return (dispatch) => {
    dispatch(fetchLatestTvStart());
    tmdbUrl
      .get(`tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`)
      .then((response) => dispatch(fetchLatestTvSuccess(response.data.results))
      );
  };
};

