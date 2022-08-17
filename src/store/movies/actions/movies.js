import * as actionTypes from "./actionTypes";
import apiKey from "../../../utility/apiKey";
import tmdbUrl from "../../../utility/tmdbUrl";

const fetchPopularMoviesStart = () => {
  return {
    type: actionTypes.FETCH_POPULAR_MOVIES_START,
  };
};
const fetchPopularMoviesSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_POPULAR_MOVIES_SUCCESS,
    payload: payload,
  };
};

const fetchAllPopularMoviesStart = () => {
  return {
    type: actionTypes.FETCH_ALL_POPULAR_MOVIES_START,
  };
};

const fetchAllPopularMoviesSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_ALL_POPULAR_MOVIES_SUCCESS,
    payload: payload,
  };
};
const fetchPopularMoviesFail = (error) => {
  return {
    type: actionTypes.FETCH_POPULAR_MOVIES_FAIL,
    error: error,
  };
};
const setMoviesTotalPages = (payload) => {
  return {
    type: actionTypes.SET_MOVIES_TOTAL_PAGES,
    payload: payload,
  };
};
export const setMoviesCurrentPage = (payload) => {
  return {
    type: actionTypes.SET_MOVIES_CURRENT_PAGE,
    payload: payload,
  };
};

export const cleanupPopularMovies = (payload) => {
  return {
    type: actionTypes.CLEANUP_POPULAR_MOVIES,
    payload: payload,
  };
};
export const cleanupPopularMoviesCurrentPage = (payload) => {
  return {
    type: actionTypes.CLEANUP_POPULAR_MOVIES_CURRENT_PAGE,
    payload: payload,
  };
};

const fetchPopularTvsStart = () => {
  return {
    type: actionTypes.FETCH_POPULAR_TVS_START,
  };
};
const fetchPopularTvsSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_POPULAR_TVS_SUCCESS,
    payload: payload,
  };
};
const fetchPopularTvsFail = (error) => {
  return {
    type: actionTypes.FETCH_POPULAR_TVS_FAIL,
    error: error,
  };
};
const setTvsTotalPages = (payload) => {
  return {
    type: actionTypes.SET_TVS_TOTAL_PAGES,
    payload: payload,
  };
};
export const setTvsCurrentPage = (payload) => {
  return {
    type: actionTypes.SET_TVS_CURRENT_PAGE,
    payload: payload,
  };
};
export const cleanupPopularTvsCurrentPage = (payload) => {
  return {
    type: actionTypes.CLEANUP_POPULAR_TVS_CURRENT_PAGE,
    payload: payload,
  };
};
const fetchTrandingPerDayStart = () => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_DAY_START,
  };
};
const fetchTrandingPerDaySuccess = (payload) => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_DAY_SUCCESS,
    payload: payload,
  };
};
const fetchTrandingPerDayFail = (error) => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_DAY_FAIL,
    error: error,
  };
};
const fetchTrandingPerWeekStart = () => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_WEEK_START,
  };
};
const fetchTrandingPerWeekSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_WEEK_SUCCESS,
    payload: payload,
  };
};
const fetchTrandingPerWeekFail = (error) => {
  return {
    type: actionTypes.FETCH_TRANDING_PER_WEEK_FAIL,
    error: error,
  };
};

const fetchNowPlayingMoviesStart = () => {
  return {
    type: actionTypes.FETCH_NOW_PLAYING_MOVIES_START,
  };
};
const fetchNowPlayingMoviesSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_NOW_PLAYING_MOVIES_SUCCESS,
    payload: payload,
  };
};
const fetchNowPlayingMoviesFail = (error) => {
  return {
    type: actionTypes.FETCH_NOW_PLAYING_MOVIES_FAIL,
    error: error,
  };
};

const fetchLatestTvStart = () => {
  return {
    type: actionTypes.FETCH_LATEST_TV_START,
  };
};
const fetchLatestTvSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_LATEST_TV_SUCCESS,
    payload: payload,
  };
};
const fetchLatestTvFail = (error) => {
  return {
    type: actionTypes.FETCH_LATEST_TV_FAIL,
    error: error,
  };
};

const fetchCardDataStart = () => {
  return {
    type: actionTypes.FETCH_CARD_DATA_START,
  };
};
const fetchCardDataSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_CARD_DATA_SUCCESS,
    payload: payload,
  };
};
const fetchCardDataFail = (error) => {
  return {
    type: actionTypes.FETCH_CARD_DATA_FAIL,
    error: error,
  };
};

export const cleanupCardData = (payload) => {
  return {
    type: actionTypes.CLEANUP_CARD_DATA,
    payload: payload,
  };
};

const fetchTrailersStart = () => {
  return {
    type: actionTypes.FETCH_TRAILERS_START,
  };
};
const fetchTrailersSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_TRAILERS_SUCCESS,
    payload: payload,
  };
};
const fetchTrailersFail = (error) => {
  return {
    type: actionTypes.FETCH_TRAILERS_FAIL,
    error: error,
  };
};

const fetchCrewAndCastStart = () => {
  return {
    type: actionTypes.FETCH_CREW_AND_CAST_START,
  };
};
const fetchCrewSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_CREW_SUCCESS,
    payload: payload,
  };
};
const fetchCastSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_CAST_SUCCESS,
    payload: payload,
  };
};
const setTopCast = (payload) => {
  return {
    type: actionTypes.SET_TOP_CAST_SUCCESS,
    payload: payload,
  };
};
const fetchCrewAndCastFail = (error) => {
  return {
    type: actionTypes.FETCH_CREW_AND_CAST_FAIL,
    error: error,
  };
};

export const cleanupTopCast = (payload) => {
  return {
    type: actionTypes.CLEANUP_TOP_CAST,
    payload: payload,
  };
};

const fetchRecommendAndSimilarMoviesStart = () => {
  return {
    type: actionTypes.FETCH_RECOMMEND_AND_SIMILAR_START,
  };
};
const fetchRecommendMoviesSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_RECOMMEND_SUCCESS,
    payload: payload,
  };
};
const fetchSimilarMoviesSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_SIMILAR_SUCCESS,
    payload: payload,
  };
};
const fetchRecommendAndSimilarMoviesFail = (error) => {
  return {
    type: actionTypes.FETCH_RECOMMEND_AND_SIMILAR_FAIL,
    error: error,
  };
};

export const fetchPopularMovies = (page) => {
  return (dispatch) => {
    dispatch(fetchPopularMoviesStart());
    tmdbUrl
      .get(`movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
      .then((response) => {
        dispatch(fetchPopularMoviesSuccess(response.data.results));
      });
  };
};
export const fetchAllPopularMovies = (page) => {
  return (dispatch) => {
    dispatch(fetchAllPopularMoviesStart());
    tmdbUrl
      .get(`movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
      .then((response) => {
        dispatch(fetchAllPopularMoviesSuccess(response.data.results));
        dispatch(setMoviesTotalPages(response.data.total_pages));
      });
  };
};
export const fetchPopularTvs = (page) => {
  return (dispatch) => {
    dispatch(fetchPopularTvsStart());
    tmdbUrl
      .get(`tv/popular?api_key=${apiKey}&language=en-US&page=${page}`)
      .then((response) => {
        dispatch(fetchPopularTvsSuccess(response.data.results));
        dispatch(setTvsTotalPages(response.data.total_pages));
      });
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
      .then((response) =>
        dispatch(fetchLatestTvSuccess(response.data.results))
      );
  };
};

export const fetchCardData = (id, mediaType) => {
  return (dispatch) => {
    dispatch(fetchCardDataStart());
    tmdbUrl
      .get(`${mediaType}/${id}?api_key=${apiKey}&language=en-US`)
      .then((response) => dispatch(fetchCardDataSuccess(response.data)));
  };
};

export const fetchTrailers = (id, mediaType) => {
  return (dispatch) => {
    dispatch(fetchTrailersStart());
    tmdbUrl
      .get(`${mediaType}/${id}/videos?api_key=${apiKey}&language=en-US`)
      .then((response) =>
        dispatch(
          fetchTrailersSuccess(
            response.data.results.filter((item) =>
              item.name.includes("Trailer")
            )
          )
        )
      );
  };
};

export const fetchCrewAndCast = (id, mediaType, credits) => {
  return (dispatch) => {
    dispatch(fetchCrewAndCastStart());
    tmdbUrl
      .get(`${mediaType}/${id}/${credits}?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        dispatch(fetchCrewSuccess(response.data.crew));
        dispatch(fetchCastSuccess(response.data.cast));
        dispatch(setTopCast(response.data.cast.slice(0, 10)));
      });
  };
};
export const fetchRecommendAndSimilarMovies = (id, mediaType, section) => {
  return (dispatch) => {
    dispatch(fetchRecommendAndSimilarMoviesStart());
    tmdbUrl
      .get(`${mediaType}/${id}/${section[0]}?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        dispatch(
          fetchRecommendMoviesSuccess(response.data.results.slice(0, 10))
        );
      });
    tmdbUrl
      .get(`${mediaType}/${id}/${section[1]}?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        dispatch(fetchSimilarMoviesSuccess(response.data.results.slice(0, 10)));
      });
  };
};

// useEffect(() => {
//   tmdbUrl
//     .get(
//       `${locationState.state}/${id}/credits?api_key=${apiKey}&language=en-US`
//     )
//     .then((response) => {
//       setCredits(response.data);
//       const director = response.data.crew.filter(
//         (item) => item.job === "Director"
//       );
//       const screenplay = response.data.crew.filter(
//         (item) => item.job === "Screenplay"
//       );
//       setCoreCrew([...director, ...screenplay]);
//     });
// }, [id, locationState.state]);

// useEffect(() => {
//   let isSubscribed = true;
//   tmdbUrl
//     .get(
//       `${locationState.state}/${cardData.id}/videos?api_key=${apiKey}&language=en-US`
//     )
//     .then((response) =>setTrailers(response.data.results.filter((item)=>item.name.includes("Trailer")))
//         : null
//     );
//   return () => (isSubscribed = false);
// }, [locationState.state, cardData.id]);
