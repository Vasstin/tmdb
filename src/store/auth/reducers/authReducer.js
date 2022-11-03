import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: {
    email: "",
    token: "",
    userID: "",
    errorCode: "",
    errorMessage: "",
    isLogin: false,
  },
};

const authSuccess = (state, action) => {
  return {
    ...state,
    user: {
      ...state.user,
      token: action.token,
      userID: action.userID,
      email: action.email,
    },
  };
};
const isLogin = (state, action) => {
  return {
    ...state,
    user: { ...state.user, isLogin: action.boolean },
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    user: {
      email: "",
      token: "",
      userID: "",
      errorCode: "",
      errorMessage: "",
      isLogin: false,
    },
  };
};

const createNewUser = (state, action) => {
  return {
    ...state,
    user: {
      ...state.user,
      token: action.token,
      userID: action.userID,
      email: action.email,
    },
  };
}

const authFail = (state, action) => {
  return {
    ...state,
    user: {
      ...state.user,
      errorCode: action.errorCode,
      errorMessage: action.errorMessage,
    },
  };
}



const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state };
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action)
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.IS_LOGIN:
      return isLogin(state, action);
    case actionTypes.CREATE_NEW_USER_START:
      return { ...state };
    case actionTypes.CREATE_NEW_USER_SUCCESS:
      return createNewUser(state, action);
    case actionTypes.CREATE_NEW_USER_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default authReducer;
