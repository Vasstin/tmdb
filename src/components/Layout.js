import Navigation from "./Navigation/Navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Footer from "./Footer";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import IconButton from "@mui/material/IconButton";
import {  Outlet } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#032541",
    },
    secondary: {
      main: "#ffffff",
    },
    background: purple,
  },
  typography: {
    fontFamily: "Source Sans Pro",
    fontWeightLight: 400,
    fontWeightRegular: 600,
    fontWeightMedium: 700,
    fontWeightBold: 900,
  },
  // zIndex: {
  //   modal: 1300,
  // },
});

function Layout() {
  const Wrapper = styled("div")({
    //margin: "0 auto",
    // maxWidth: "1300px",
    overflow: "hidden",
  });

  function anchor(event) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const Anchor = styled(IconButton)`
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(to left, #032541 0%, #01b4e4 100%);
    &:hover {
      background: linear-gradient(to right, #032541 0%, #01b4e4 100%);
    }
  `;

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navigation />
        <Wrapper>
          <Outlet/>
        </Wrapper>
        <Footer />
        <Anchor onClick={(event) => anchor(event)}>
          <RocketLaunchIcon fontSize="large" color="secondary" />
        </Anchor>
      </ThemeProvider>
    </div>
  );
}

export default Layout;
