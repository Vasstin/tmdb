import React from "react";
import MoviesTabs from "./Movies/MoviesTabs";
import WelcomeSection from "./WelcomeSection";

const MainPage = props => {
  return(
    <div>
      <WelcomeSection/>
      <MoviesTabs/>
    </div>
  )
};

export default MainPage;
