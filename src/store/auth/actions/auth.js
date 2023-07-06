import * as actionTypes from "./actionTypes";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const clearUserData = () => {
  return {
    type: actionTypes.CLEAR_USER_DATA,
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
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmUyYjY3MjM5MmYwYjU5OGQ2MzAyMWNmZWQzYjk1ZSIsInN1YiI6IjYwYmRmNTEwOWE2NGMxMDA0MDkyYTZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F1Jd52JH6PlgHGfaZeSbyccreQZ0sJkGywS7-yfMXyk'
          }
        };
        
        fetch('https://api.themoviedb.org/3/authentication/token/new', options)
          .then(response => response.json())
          .then(response => console.log(response))
        const user = userCredential.user;
        localStorage.setItem("isLogin", true);
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
        localStorage.setItem("isLogin", true);
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
export const signOutUser = () => {
  return (dispatch) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("isLogin");
        dispatch(isLogin(false));
        dispatch(clearUserData());
      })
      .catch((error) => {
        console.log("not signout");
        // An error happened.
      });
  };
};

export const getAuthedUser = () => {
  return (dispatch) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = auth.currentUser;
        dispatch(
          authSuccess(
            currentUser.accessToken,
            currentUser.uid,
            currentUser.email
          )
        );
        dispatch(isLogin(true));
      } else {
        signOut(auth)
      .then(() => {
        localStorage.removeItem("isLogin");
        dispatch(isLogin(false));
        dispatch(clearUserData());
      })
      }
    });
  };
};
