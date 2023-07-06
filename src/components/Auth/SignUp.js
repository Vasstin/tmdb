import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  AlertTitle,
  // FilledInput,
  // FormControl,
  // FormHelperText,
  // Input,
  // InputLabel,
  InputAdornment,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUp = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const AuthSwitcher = styled('span')({
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
        onChange={(event) => emailValidation(event.target.value)}
        error={isValid ? false : true}
        // error={isLogin}
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
        // variant="outlined"
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
        disabled={isValid === false ? true : false}
        onClick={() => props.onCreateNewUser(props.email, props.password)}
      >
        Sign up
      </Button>
      <Typography color={"primary"} sx={{ display: "flex" }}>
        {"Do you have an account?"}
        <AuthSwitcher
          onClick={() => props.handleAuthSwitcher()}
          color={"primary"}
        >
          {"Sign In"}
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

export default SignUp;
