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
  InputAdornment,
  Alert,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignOut = (props) => {
  const [showPassword, setShowPassword] = useState(false);

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
      <TextField
        sx={{
          width: "270px",
          marginBottom: "25px",
        }}
        onChange={(event) => props.handleOnChange(event.target.value, "email")}
        // error={isLogin}
        id="email"
        // label={isLogin ? "Error" : "Email"}
        variant="outlined"
        type="email"
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
        // label={isLogin ? "Error" : "Password"}
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
        variant="contained"
        onClick={() => props.onAuth(props.email, props.password)}
      >
        Sign-in
      </Button>
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

export default SignOut;
