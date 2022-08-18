import * as actionTypes from "./actionTypes";
import apiKey from "../../../utility/apiKey";
import tmdbUrl from "../../../utility/tmdbUrl";

const fetchPeopleCardDataStart = () => {
  return {
    type: actionTypes.FETCH_PEOPLE_CARD_DATA_START,
  };
};
const fetchPeopleCardDataSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CARD_DATA_SUCCESS,
    payload: payload,
  };
};
const fetchPeopleCardDataFail = (error) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CARD_DATA_FAIL,
    error: error,
  };
};
const fetchPeoplePopularStart = () => {
  return {
    type: actionTypes.FETCH_PEOPLE_POPULAR_START,
  };
};
const fetchPeoplePopularSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PEOPLE_POPULAR_SUCCESS,
    payload: payload,
  };
};
const fetchPeoplePopularFail = (error) => {
  return {
    type: actionTypes.FETCH_PEOPLE_POPULAR_FAIL,
    error: error,
  };
};
export const setPeopleCurrentPage = (payload) => {
  return {
    type: actionTypes.SET_PEOPLE_CURRENT_PAGE,
    payload: payload,
  };
};
const setPeopleTotalPages = (payload) => {
  return {
    type: actionTypes.SET_PEOPLE_TOTAL_PAGES,
    payload: payload,
  };
};
export const cleanupPeopleCurrentPage = (payload) => {
  return {
    type: actionTypes.CLEANUP_PEOPLE_CURRENT_PAGE,
    payload: payload,
  };
};
const fetchPeopleCreditsStart = () => {
  return {
    type: actionTypes.FETCH_PEOPLE_CREDITS_START,
  };
};
const fetchPeopleCreditsCrewSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CREDITS_CREW_SUCCESS,
    payload: payload,
  };
};
const fetchPeopleCreditsCastSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CREDITS_CAST_SUCCESS,
    payload: payload,
  };
};
const fetchPeopleCreditsFail = (error) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CREDITS_FAIL,
    error: error,
  };
};

export const cleanupCardData = (payload) => {
  return {
    type: actionTypes.CLEANUP_CARD_DATA,
    payload: payload,
  };
};

export const fetchPeopleCardData = (id) => {
  return (dispatch) => {
    dispatch(fetchPeopleCardDataStart());
    tmdbUrl
      .get(`person/${id}?api_key=${apiKey}&language=en-US`)
      .then((response) => dispatch(fetchPeopleCardDataSuccess(response.data)))
      .catch((error) => {
        dispatch(fetchPeopleCardDataFail(true));
        setTimeout(() => dispatch(fetchPeopleCardDataFail(false)), 2000);
      });
  };
};
export const fetchPeopleCredits = (id) => {
  return (dispatch) => {
    dispatch(fetchPeopleCreditsStart());
    tmdbUrl
      .get(`person/${id}/combined_credits?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        dispatch(fetchPeopleCreditsCastSuccess(response.data.cast));
        dispatch(fetchPeopleCreditsCrewSuccess(response.data.crew));
      })
      .catch((error) => {
        dispatch(fetchPeopleCreditsFail(true));
        setTimeout(() => dispatch(fetchPeopleCreditsFail(false)), 2000);
      });
      
  };
};

export const fetchPeoplePopular = (page) => {
  return (dispatch) => {
    dispatch(fetchPeoplePopularStart());
    tmdbUrl
      .get(`person/popular?api_key=${apiKey}&language=en-US&page=${page}`)
      .then((response) => {
        dispatch(fetchPeoplePopularSuccess(response.data.results));
        dispatch(setPeopleTotalPages(response.data.total_pages));
      })
      // .catch((error) => dispatch(fetchPeoplePopularFail(true)));
      .catch((error) => {
        dispatch(fetchPeoplePopularFail(true));
        setTimeout(() => dispatch(fetchPeoplePopularFail(false)), 2000);
      });
  };
};
