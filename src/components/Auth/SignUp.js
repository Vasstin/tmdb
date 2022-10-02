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
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUp = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const AuthSwitcher = styled(Typography)({
    marginLeft: "5px",
    "&:hover": {
      color: "#01b4e4",
    },
  });
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
        sx={{ marginBottom: "25px" }}
        variant="contained"
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
