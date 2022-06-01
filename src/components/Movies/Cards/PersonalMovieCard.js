import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MovieScore from "../../../utility/MovieScore";
import { Skeleton } from "@mui/material";
//import { useSelector } from "react-redux";
import tmdbUrl from "../../../utility/tmdbUrl";
import apiKey from "../../../utility/apiKey";

const MovieCard = (props) => {
  const { id } = useParams();
  const locationState = useLocation();
  const [dataCard, setDataCard] = useState([]);

  useEffect(() => {
    tmdbUrl
      .get(`${locationState.state}/${id}?api_key=${apiKey}&language=en-US`)
      .then((response) => setDataCard(response.data));
  }, [id, locationState.state]);
  
  // const fullState = useSelector((state) => {
  //   return state.movies;
  // });

  // function getArrayFromState(data, id) {
  //   return Object.keys(data)
  //     .reduce((acc, item) => {
  //       for (let key in data[item]) {
  //         acc.push(...data[item][key]);
  //       }
  //       return acc;
  //     }, [])
  //     .find((item) => item.id === Number(id));
  // }
  //----------------------------------------------------------
  /*THE BEST APPROACH*/
  // function getArrayFromState(entity, id) {
  //   let result = null;

  //   if (Array.isArray(entity)) {
  //     result = entity.find((item) => item.id == id);

  //   } else if (typeof entity === "object") {
  //     for (let key in entity) {
  //       result = getArrayFromState(entity[key], id);
  //       if (result) {
  //         break
  //       }
  //     }
  //   }
  //   return result;
  // }

  //const dataCard = getArrayFromState(fullState, id);

  const ImgWrapper = styled(CardMedia)({
    minHeight: "200px",
    borderRadius: "10px",
    width: "300px",
    height: "450px",
  });

  const TitleInform = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    fontSize: "13px",
    color: "white",
    padding: "0",
  });

  const VoteRate = styled(Box)({
    position: "relative",
    display: "flex",
    height: "40px",
    width: "40px",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: "1px",
    backgroundColor: "#081c22",
    borderRadius: "50%",
    boxShadow: "0 0 15px #000",
    boxSizing: "border-box",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontSize: "14px",
  });

  const CustomizedCard = styled(Card)({
    display: "flex",
    padding: "50px 0 50px 0",
    background: "transparent",
    boxShadow: "none",
  });

  const CustomizedMovieScore = styled(MovieScore)({
    position: "absolute",
    top: "0",
    left: "0",
  });
  const CustomizedBox = styled(Box)({
    marginTop: "120px",
    minHeight: "800px",
  });

  const BackgroundBlur = styled(Box)({
    background:
      "linear-gradient(to bottom right, rgba(10.5, 31.5, 31.5, 1), rgba(10.5, 31.5, 31.5, 0.84))",
  });

  const MovieOverviewSection = styled(Box)({
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${dataCard.backdrop_path}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  });

  const ContentWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    paddingLeft: "15px",
  });

  const date = new Date(dataCard.release_date ?? dataCard.first_air_date)
  
  return (
    <CustomizedBox>
      <MovieOverviewSection>
        <BackgroundBlur>
          <CustomizedCard className="Wrapper">
            {!dataCard.poster_path ? (
              <Skeleton
                sx={{ borderRadius: "10px" }}
                variant="rectangular"
                width={300}
                height={450}
              />
            ) : (
              <ImgWrapper
                component="img"
                image={`https://image.tmdb.org/t/p/w500/${dataCard.poster_path}`}
                alt={dataCard.title}
              />
            )}
            <ContentWrapper>
              <TitleInform>
                <Typography variant="h5">
                  {dataCard.title ?? dataCard.name} ({date.getFullYear()})
                </Typography>
                <Typography variant="body2">{date.toLocaleDateString("en-US")}</Typography>
              </TitleInform>
              <VoteRate>
                <Typography>{dataCard.vote_average * 10}</Typography>
                <sup>%</sup>
                <CustomizedMovieScore rate={dataCard.vote_average} />
              </VoteRate>
            </ContentWrapper>
          </CustomizedCard>
        </BackgroundBlur>
      </MovieOverviewSection>
    </CustomizedBox>
  );
};

export default MovieCard;
