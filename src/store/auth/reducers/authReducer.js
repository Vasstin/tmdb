import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: {
    email: '',
    token: '',
    userID: '',
    errorCode: '',
    errorMessage: '',
    isLogin: false
  }
};

const authSuccess = (state, action) => {
  return {
    ...state,
    user: { ...state.user, token: action.token, userID: action.userID, email: action.email },
  };
};
const isLogin = (state, action) => {
  return {
    ...state,
    user: { ...state.user, isLogin: action.boolean },
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
    case actionTypes.IS_LOGIN:
      return isLogin(state, action)
    default:
      return state;
  }
};

export default authReducer;
