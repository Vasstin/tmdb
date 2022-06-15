import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

import Box from "@mui/material/Box";
import tmdbUrl from "../../utility/tmdbUrl";
import apiKey from "../../utility/apiKey";

const WelcomeSection = (props) => {
  const [image, setImage] = useState([]);
  useEffect(() => {
    tmdbUrl
      .get(`movie/now_playing?api_key=${apiKey}`)
      .then((response) =>
        response.data.results.map((item) =>
          setImage((old) => [...old, item.backdrop_path])
        )
      );
  }, []);
  const CustomizedBox = styled(Box)`
    min-height: 400px;
    width: 100%;
    background: linear-gradient(to left, #032541 0%, #01b4e4 100%);
    color: white;
    font-weight: bold;
    margin-bottom: 30px;
    /* margin-top: 60px; */
    .MuiTypography-body1 {
      font-size: 30px;
      padding-left: 60px;
    }
    .MuiTypography-h2 {
      padding: 100px 50px 0 60px;
    }
  `;

  const CustomizedMedia = styled(CardMedia)`
    width: 100%;
    height: 400px;
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
  `;

  return (
    <CustomizedBox className="Wrapper">
      <CustomizedMedia
        image={`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/${
          image[Math.floor(Math.random() * 20)]
        }`}
      >
        <Typography variant="h2">Welcome.</Typography>
        <Typography variant="body1">
          Millions of movies, TV shows and people to discover. Explore now.
        </Typography>
      </CustomizedMedia>
    </CustomizedBox>
  );
};

export default WelcomeSection;
