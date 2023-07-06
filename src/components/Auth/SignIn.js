import React, { useState } from "react";
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
  AlertTitle,
  InputAdornment,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignIn = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const AuthSwitcher = styled("span")({
    marginLeft: "5px",
    "&:hover": {
      color: "#01b4e4",
    },
  });
  const emailValidation = (value) => {
    const regexp = /^[\w-]+@[\w]+\.[a-z]{2,}$/g;
    if (regexp.test(value)) {
      setIsValid(true);
      return props.handleOnChange(value, "email");
    } else {
      return setIsValid(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
    >
      <Alert
        sx={{display: props.errorMessage === "" ? 'none' : 'flex' , marginBottom: "25px" }}
        variant="filled"
        severity="error"
        color="error"
      >
        <AlertTitle>Error</AlertTitle>
        {`${props.errorMessage}`}
      </Alert>
      <TextField
        sx={{
          width: "270px",
          marginBottom: "25px",
        }}
        //onChange={(event) => props.handleOnChange(event.target.value, "email")}
        onChange={(event) => emailValidation(event.target.value)}
        error={isValid ? false : true}
        id="email"
        label={"Email"}
        variant="outlined"
        type="email"
        helperText={isValid ? null : "Invalid Email"}
      />
      <TextField
        sx={{
          width: "270px",
          marginBottom: "25px",
        }}
        onChange={(event) =>
          props.handleOnChange(event.target.value, "password")
        }
        // error={isLogin}
        id="password"
        label={"Password"}
        variant="outlined"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                aria-label="toggle password visibility"
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={{ marginBottom: "25px" }}
        variant="contained"
        onClick={() => props.onAuth(props.email, props.password)}
        disabled={isValid === false ? true : false}
      >
        Sign in
      </Button>
      <Typography color={"primary"} sx={{ display: "flex" }}>
        {"Don`t have an account?"}
        <AuthSwitcher
          onClick={() => props.handleAuthSwitcher()}
          color={"primary"}
        >
          {"Sign Up"}
        </AuthSwitcher>
      </Typography>
      {/* <Button variant="contained" onClick={() => setIsLogin(!isLogin)}>
                switcher
              </Button> */}
      {/* <FormControl >
                <InputLabel htmlFor="component-simple">Email</InputLabel>
                <FilledInput id="component-simple" placeholder="Email"   />
              </FormControl> */}
    </Box>
  );
};

export default SignIn;
