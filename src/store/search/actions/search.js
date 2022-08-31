import * as actionTypes from "./actionTypes";
import apiKey from "../../../utility/apiKey";
import tmdbUrl from "../../../utility/tmdbUrl";

const fetchSearchDataStart = () => {
  return {
    type: actionTypes.FETCH_SEARCH_DATA_START,
  };
};
const fetchSearchDataSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_SEARCH_DATA_SUCCESS,
    payload: payload,
  };
};
const fetchSearchDataFail = (error) => {
  return {
    type: actionTypes.FETCH_SEARCH_DATA_FAIL,
    error: error,
  };
};
const setSearchTotalPages = (payload) => {
  return {
    type: actionTypes.SET_SEARCH_TOTAL_PAGES,
    payload: payload,
  };
};

export const fetchSearchData = (searchValue) => {
  return (dispatch) => {
    dispatch(fetchSearchDataStart());
    tmdbUrl
      .get(`search/multi?api_key=${apiKey}&language=en-US&query=${searchValue}&page=1&include_adult=false`)
      .then((response) => {
        dispatch(fetchSearchDataSuccess(response.data.results))
        dispatch(setSearchTotalPages(response.data.total_pages))

      })
      .catch((error) => {
        dispatch(fetchSearchDataFail(true));
        setTimeout(() => dispatch(fetchSearchDataFail(false)), 2000);
      });
  };
};