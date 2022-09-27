import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
//   const dispatch = useDispatch();
import * as authActions from "../../store/auth/actions/index";
import SignIn from "./SignIn";
import { styled } from "@mui/material/styles";

import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  // FilledInput,
  // FormControl,
  // FormHelperText,
  // Input,
  // InputLabel,
  InputAdornment,
  Alert,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ModalLogin = (props) => {
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

  // const [trailers, setTrailers] = useState([]);

  // useEffect(() => {
  //   tmdbUrl
  //     .get(`${props.typeTab}/${props.idMovies}/videos?api_key=${apiKey}&language=en-US`)
  //     .then((response) =>
  //       setTrailers(
  //         response.data.results.filter((item) => item.name.includes("Trailer"))
  //       )
  //     );
  // }, [props.idMovies, props.typeTab]);

  // `${tmdbUrl}movie/${props.data.id}/videos?api_key=${apiKey}&language=en-US`
  const dispatch = useDispatch();

  const [userAuthData, setUserAuthData] = useState({
    email: "",
    password: "",
  });

  const isLogin = useSelector((state) => {
    return state.auth.user.isLogin;
  });

  const onAuth = useCallback(
    () => dispatch(authActions.auth(userAuthData.email, userAuthData.password)),
    [dispatch, userAuthData.email, userAuthData.password]
  );

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
          {isLogin ? (
            <Box>
              <Alert variant="filled" severity="success" color="primary">
                {`Welcome Back ${userAuthData.email}`}
              </Alert>
            </Box>
          ) : (
            <SignIn
              onAuth={onAuth}
              handleOnChange={handleOnChange}
              email={userAuthData.email}
              password={userAuthData.password}
            />
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
