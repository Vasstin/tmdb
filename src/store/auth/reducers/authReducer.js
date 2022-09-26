import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: {
    token: '',
    userID: ''
  }
};

const authSuccess = (state, action) => {
  return {
    ...state,
    user: { ...state.user, token: action.token, userID: action.userID },
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state };
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default authReducer;
