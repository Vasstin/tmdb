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
    email: email
  };
};
const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
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
        console.log(userCredential)
        const user = userCredential.user;
        dispatch(authSuccess(user.accessToken, user.uid, user.email));
        dispatch(isLogin(true));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
};
