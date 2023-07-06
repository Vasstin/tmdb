import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
//   const dispatch = useDispatch();
import * as authActions from "../../store/auth/actions/index";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
//import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Modal, Alert } from "@mui/material";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserProfile from "./UserProfile";

const ModalLogin = (props) => {

  const isLoadingLocalStorage = localStorage.getItem("isLogin") 

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 640,
    height: 640,
    bgcolor: "background.paper",
    border: "6px solid #032541",
    boxShadow: 24,
    padding: "50px",
    margin: "0 auto",
  };

  const dispatch = useDispatch();

  const [userAuthData, setUserAuthData] = useState({
    email: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);

  const isLogin = useSelector((state) => {
    return state.auth.user.isLogin;
  });

  const errorMessage = useSelector((state) => {
    return state.auth.user.errorMessage;
  });
  const currentUserData = useSelector((state) => {
    return state.auth.user;
  });

  const onAuth = useCallback(
    () => dispatch(authActions.auth(userAuthData.email, userAuthData.password)),
    [dispatch, userAuthData.email, userAuthData.password]
  );

  const onCreateNewUser = useCallback(
    () =>
      dispatch(
        authActions.createNewUser(userAuthData.email, userAuthData.password)
      ),
    [dispatch, userAuthData.email, userAuthData.password]
  );

  const onSignOutUser = useCallback(
    () => dispatch(authActions.signOutUser()),
    [dispatch]
  );
  const onGetAuthedUser = useCallback(
    () => dispatch(authActions.getAuthedUser()),
    [dispatch]
  );

  useEffect(() => {
    onGetAuthedUser();
  }, [onGetAuthedUser]);

  const handleLogout = () => {
    // window.location.reload();
    onSignOutUser();
    //onLogout();
  };

  const handleAuthSwitcher = () => {
    setIsSignUp(!isSignUp);
  };

  const handleOnChange = (value, type) => {
    switch (type) {
      case "email":
        return setUserAuthData({
          ...userAuthData,
          email: value,
        });
      case "password":
        return setUserAuthData({
          ...userAuthData,
          password: value,
        });
      default:
        return;
    }
  };

  return (
    <div>
      <Modal
        open={props.toggle}
        onClose={props.toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoadingLocalStorage ? (
            <UserProfile
              isLogin={isLogin}
              email={currentUserData.email}
              handleLogout={handleLogout}
            />
          ) : (
            <Box>
              {isSignUp ? (
                <SignUp
                  errorMessage={errorMessage}
                  onCreateNewUser={onCreateNewUser}
                  handleOnChange={handleOnChange}
                  email={userAuthData.email}
                  password={userAuthData.password}
                  handleAuthSwitcher={handleAuthSwitcher}
                />
              ) : (
                <SignIn
                  errorMessage={errorMessage}
                  onAuth={onAuth}
                  handleOnChange={handleOnChange}
                  email={userAuthData.email}
                  password={userAuthData.password}
                  handleAuthSwitcher={handleAuthSwitcher}
                />
              )}
            </Box>
          )}

          {/* {isLogin ? (
            <Alert display="none" sx={{ margin: "50px 50px" }} severity="error">
              Incorect password
            </Alert>
          ) : null} */}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLogin;
