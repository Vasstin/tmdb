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

export const fetchCardDataStart = () => {
  return {
    type: actionTypes.FETCH_CARD_DATA_START,
  };
};
export const fetchCardDataSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_CARD_DATA_SUCCESS,
    payload: payload,
  };
};
export const fetchCardDataFail = (error) => {
  return {
    type: actionTypes.FETCH_CARD_DATA_FAIL,
    error: error,
  };
};

export const cleanupCardData = (payload) => {
  return {
    type: actionTypes.CLEANUP_CARD_DATA,
    payload: payload
  }
}

export const fetchTrailersStart = () => {
  return {
    type: actionTypes.FETCH_TRAILERS_START,
  };
};
export const fetchTrailersSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_TRAILERS_SUCCESS,
    payload: payload,
  };
};
export const fetchTrailersFail = (error) => {
  return {
    type: actionTypes.FETCH_TRAILERS_FAIL,
    error: error,
  };
};

export const fetchCrewAndCastStart = () => {
  return {
    type: actionTypes.FETCH_CREW_AND_CAST_START,
  };
};
export const fetchCrewSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_CREW_SUCCESS,
    payload: payload,
  };
};
export const fetchCastSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_CAST_SUCCESS,
    payload: payload,
  };
};
export const fetchCrewAndCastFail = (error) => {
  return {
    type: actionTypes.FETCH_CREW_AND_CAST_FAIL,
    error: error,
  };
};

export const cleanupCast = (payload) => {
  return {
    type: actionTypes.CLEANUP_CAST,
    payload: payload
  }
}


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

export const fetchCrewAndCast = (id, mediaType) => {
  return (dispatch) => {
    dispatch(fetchCrewAndCastStart());
    tmdbUrl
      .get(`${mediaType}/${id}/credits?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        const director = response.data.crew.filter(
          (item) => item.job === "Director"
        );
        const screenplay = response.data.crew.filter(
          (item) => item.job === "Screenplay"
        );
        dispatch(fetchCrewSuccess([...director, ...screenplay]))
        dispatch(fetchCastSuccess(response.data.cast))
      })
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
