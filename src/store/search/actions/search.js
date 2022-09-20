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
export const setSearchCurrentPage = (payload) => {
  return {
    type: actionTypes.SET_SEARCH_CURRENT_PAGE,
    payload: payload,
  };
};
export const setSearchValue = (payload) => {
  return {
    type: actionTypes.SET_SEARCH_VALUE,
    payload: payload,
  };
};
export const setLastSearch = (payload) => {
  return {
    type: actionTypes.SET_LAST_SEARCH,
    payload: payload,
  };
};

export const fetchSearchData = (searchValue, page) => {
  return (dispatch) => {
    dispatch(fetchSearchDataStart());
    //console.log(searchValue, page)
    tmdbUrl
      .get(`search/multi?api_key=${apiKey}&language=en-US&query=${searchValue}&page=${page}&include_adult=false`)
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
// export const test = (searchValue) => {
//   return (dispatch) => {
//     dispatch(setSearchValue(searchValue));
//     dispatch(setSearchCurrentPage(1))

//   };
// };