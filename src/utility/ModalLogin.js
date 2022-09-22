import React, { useState } from "react";

import {
  Box,
  Button,
  Modal,
  Skeleton,
  TextField,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
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

  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userAuthData, setUserAuthData] = useState({
    email: "",
    password: "",
  });

  const handlerOnChange = (value, type) => {
    switch (type) {
      case  "email":
        return setUserAuthData({
          ...userAuthData,
          email: value,
        });
      case  "password":
        return setUserAuthData({
          ...userAuthData,
          password: value,
        });
      default:
        return;
    }
  };
  console.log(userAuthData);
  return (
    <div>
      <Modal
        open={props.toggle}
        onClose={props.toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {false ? (
            <Skeleton variant="rectangular" width={640} height={640} />
          ) : (
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
                onChange={(event) =>
                  handlerOnChange(event.target.value, "email")
                }
                sx={{ width: "270px", marginBottom: "25px" }}
                error={isLogin}
                id="outlined-basic"
                label={isLogin ? "Error" : "Email"}
                variant="outlined"
                type="email"
              />
              <TextField
                onChange={(event) =>
                  handlerOnChange(event.target.value, "password")
                }
                sx={{ width: "270px", marginBottom: "25px" }}
                error={isLogin}
                id="outlined-basic"
                label={isLogin ? "Error" : "Password"}
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
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained">Sign-in</Button>
              <Button variant="contained" onClick={() => setIsLogin(!isLogin)}>
                switcher
              </Button>
              {/* <FormControl >
                <InputLabel htmlFor="component-simple">Email</InputLabel>
                <FilledInput id="component-simple" placeholder="Email"   />
              </FormControl> */}
            </Box>
          )}
          {isLogin ? (
            <Alert display="none" sx={{ margin: "50px 50px" }} severity="error">
              Incorect password
            </Alert>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLogin;
