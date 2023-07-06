import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, Skeleton, Alert, CircularProgress } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";

const UserProfile = (props) => {
  const isLogin = useSelector((state) => {
    return state.auth.user.isLogin;
  });

  return (
    <Box sx={{ height: "100%" }}>
      {isLogin ? (
        <Box>
          {props.isSignUp ? (
            <Alert variant="filled" severity="success" color="primary">
              {`Congratulations, ${props.email}, you have successfully registered`}
            </Alert>
          ) : (
            <Alert variant="filled" severity="success" color="primary">
              {`Welcome Back ${props.email}`}
            </Alert>
          )}
          <Button
            onClick={() => props.handleLogout()}
            variant="contained"
            endIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <CircularProgress sx={{ margin: "0 auto" }} color="primary" />
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
