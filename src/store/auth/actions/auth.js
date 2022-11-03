import * as actionTypes from "./actionTypes";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
const authSuccess = (token, userID, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userID: userID,
    email: email,
  };
};
const authFail = (errorCode, errorMessage) => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorCode: errorCode,
    errorMessage: errorMessage,
  };
};

const createNewUserStart = () => {
  return {
    type: actionTypes.CREATE_NEW_USER_START,
  };
};
const createNewUserSuccess = (token, userID, email) => {
  return {
    type: actionTypes.CREATE_NEW_USER_SUCCESS,
    token: token,
    userID: userID,
    email: email,
  };
};

// const createNewUserFail = (error) => {
//   return {
//     type: actionTypes.CREATE_NEW_USER_FAIL,
//     error: error,
//   };
// };

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
const isLogin = (boolean) => {
  return {
    type: actionTypes.IS_LOGIN,
    boolean: boolean,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(authSuccess(user.accessToken, user.uid, user.email));
        dispatch(isLogin(true));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(authFail(errorCode, errorMessage));
      });
  };
};

export const createNewUser = (email, password) => {
  return (dispatch) => {
    dispatch(createNewUserStart());
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(createNewUserSuccess(user.accessToken, user.uid, user.email));
        dispatch(isLogin(true));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(authFail(errorCode, errorMessage));
      });
  };
};
