import * as actionTypes from "./actionTypes";
import apiKey from "../../../utility/apiKey";
import tmdbUrl from "../../../utility/tmdbUrl";

export const fetchPeopleCardDataStart = () => {
  return {
    type: actionTypes.FETCH_PEOPLE_CARD_DATA_START,
  };
};
export const fetchPeopleCardDataSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CARD_DATA_SUCCESS,
    payload: payload,
  };
};
export const fetchPeopleCardDataFail = (error) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CARD_DATA_FAIL,
    error: error,
  };
};
export const fetchPeoplePopularStart = () => {
  return {
    type: actionTypes.FETCH_PEOPLE_POPULAR_START,
  };
};
export const fetchPeoplePopularSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PEOPLE_POPULAR_SUCCESS,
    payload: payload,
  };
};
export const fetchPeoplePopularFail = (error) => {
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
export const cleanupPeopleCurrentPage = (payload) => {
  return {
    type: actionTypes.CLEANUP_PEOPLE_CURRENT_PAGE,
    payload: payload,
  };
};
export const fetchPeopleCreditsStart = () => {
  return {
    type: actionTypes.FETCH_PEOPLE_CREDITS_START,
  };
};
export const fetchPeopleCreditsCrewSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CREDITS_CREW_SUCCESS,
    payload: payload,
  };
};
export const fetchPeopleCreditsCastSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CREDITS_CAST_SUCCESS,
    payload: payload,
  };
};
export const fetchPeopleCreditsFail = (error) => {
  return {
    type: actionTypes.FETCH_PEOPLE_CREDITS_FAIL,
    error: error,
  };
};

export const cleanupCardData = (payload) => {
  return {
    type: actionTypes.CLEANUP_CARD_DATA,
    payload: payload
  }
}

export const fetchPeopleCardData = (id) => {
  return (dispatch) => {
    dispatch(fetchPeopleCardDataStart());
    tmdbUrl
      .get(`person/${id}?api_key=${apiKey}&language=en-US`)
      .then((response) => dispatch(fetchPeopleCardDataSuccess(response.data)));
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
      });
  };
};