// import Navigation from "../src/components/Navigation/Navigation";
// import MoviesTabs from "./components/Movies/MoviesTabs";
// import WelcomeSection from "./components/WelcomeSection";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import { styled } from "@mui/material/styles";
// import { purple } from "@mui/material/colors";
// import Footer from "./components/Footer";
// import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
// import IconButton from "@mui/material/IconButton";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/MainPages/Layout";
import MainPage from "./components/MainPages/MainPage";
import Actors from "./components/Placeholders/Actors";
import ActorCard from "./components/People/Cards/ActorCard";
import Movies from "./components/Placeholders/Movies";
import MovieCard from "./components/Movies/Cards/MovieCard";
import CastAndCrew from "./components/People/CastAndCrew";
import NotFoundPage from "./components/Placeholders/NotFoundPage";
// import Content from './utility/routingPagination';
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#032541",
//     },
//     secondary: {
//       main: "#ffffff",
//     },
//     background: purple,
//   },
//   typography: {
//     fontFamily: "Source Sans Pro",
//     fontWeightLight: 400,
//     fontWeightRegular: 600,
//     fontWeightMedium: 700,
//     fontWeightBold: 900,
//   },
// });

function App() {
  // const Wrapper = styled("div")({
  //   margin: "0 auto",
  //   maxWidth: "1300px",
  //   overflow: "hidden",
  // });

  // function anchor(event) {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }

  // const Anchor = styled(IconButton)`
  //   position: fixed;
  //   bottom: 50px;
  //   right: 50px;
  //   width: 50px;
  //   height: 50px;
  //   border-radius: 50%;
  //   background: linear-gradient(to left, #032541 0%, #01b4e4 100%);
  //   &:hover {
  //     background: linear-gradient(to right, #032541 0%, #01b4e4 100%);
  //   }
  // `;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="actor" element={<Actors />} />
        <Route path="actor/:id" element={<ActorCard />} />
        <Route path="movie" element={<Movies />} />
        <Route path="movie/:id" element={<MovieCard />} />
        <Route path="movie/:id/cast" element={<CastAndCrew />} />
        <Route path="tv/:id" element={<MovieCard />} />
        <Route path="tv/:id/cast" element={<CastAndCrew />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
  // return (
  //   <div className="App">
  //     <ThemeProvider theme={theme}>
  //       <Navigation />
  //       <Wrapper>
  //         <WelcomeSection />
  //         <MoviesTabs />
  //       </Wrapper>
  //       <Footer />
  //       <Anchor onClick={(event) => anchor(event)}>
  //         <RocketLaunchIcon fontSize="large" color="secondary" />
  //       </Anchor>
  //     </ThemeProvider>
  //   </div>
  // );
}

export default App;
