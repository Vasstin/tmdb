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
import LinearProgress from "@mui/material/LinearProgress";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ModalTrailer from "./ModalTrailer";

const MovieCard = (props) => {
  const { id } = useParams();
  const locationState = useLocation();
  const [dataCard, setDataCard] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [open, setOpen] = useState(false);
  const [credits, setCredits] = useState([]);
  const [coreCrew, setCoreCrew] = useState([]);

  const toggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    tmdbUrl
      .get(`${locationState.state}/${id}?api_key=${apiKey}&language=en-US`)
      .then((response) => setDataCard(response.data));
  }, [id, locationState.state]);

  useEffect(() => {
    tmdbUrl
      .get(
        `${locationState.state}/${id}/credits?api_key=${apiKey}&language=en-US`
      )
      .then((response) => {
        setCredits(response.data);
        const director = response.data.crew.filter(
          (item) => item.job === "Director"
        );
        const screenplay = response.data.crew.filter(
          (item) => item.job === "Screenplay"
        );
        setCoreCrew([...director, ...screenplay]);
      });
  }, [id, locationState.state]);

  useEffect(() => {
    let isSubscribed = true;
    tmdbUrl
      .get(
        `${locationState.state}/${dataCard.id}/videos?api_key=${apiKey}&language=en-US`
      )
      .then((response) =>
        isSubscribed
          ? setTrailers(
              response.data.results.filter((item) =>
                item.name.includes("Trailer")
              )
            )
          : null
      );
    return () => (isSubscribed = false);
  }, [locationState.state, dataCard.id]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const date = new Date(dataCard.release_date ?? dataCard.first_air_date);
  function getTimeFromMins(mins) {
    if (mins < 60) {
      return `${mins}m`;
    } else {
      return `${Math.trunc(mins / 60)}h ${mins % 60}m`;
    }
  }

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
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: "13px",
    color: "white",
    padding: "0",
    marginBottom: "30px",
  });

  const VoteRate = styled(Box)({
    position: "relative",
    display: "flex",
    height: "60px",
    width: "60px",
    marginRight: "10px",
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
    transition: "all 1s",
    "&:hover": {
      transform: "scale(1.1)",
      transition: "all 1s",
    },
  });

  const CustomizedCard = styled(Card)({
    display: "flex",
    padding: "50px ",
    background: "transparent",
    boxShadow: "none",
  });

  const CustomizedMovieScore = styled(MovieScore)({
    position: "absolute",
    width: "60px",
    height: "60px",
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
    flexWrap: "wrap",
    alignContent: "center",
    paddingLeft: "40px",
  });

  const Facts = styled(Box)({
    // position: 'relative',
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  });

  const FactsItem = styled(Typography)({
    position: "relative",
    display: "flex",
    paddingLeft: "25px",
    "&::before": {
      content: "''",
      position: "absolute",
      top: "10px",
      left: "15px",
      width: "5px",
      height: "5px",
      borderRadius: "50%",
      background: "white",
    },
  });

  const Actions = styled(Box)({
    display: "flex",
    width: "100%",
    alignItems: "center",
    marginBottom: "30px",
  });
  const CustomizedIconButton = styled(IconButton)(({ theme }) => ({
    transition: "all 1s",
    color: "white",
    fontSize: "15px",
    "&:hover": {
      color: "gray",
      transition: "all 1s",
    },
  }));

  const Icon = styled(PlayArrowIcon)`
    width: 30px;
    height: 30px;
  `;

  const Overview = styled(Box)({
    color: "white",
    marginBottom: "30px",
  });

  const CoreCrew = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    color: "white",
  });

  const CoreCrewItem = styled(Box)({
    flexBasis: "33%",
    paddingBottom: "15px",
  });

  return (
    <CustomizedBox>
      {dataCard.id ? (
        <MovieOverviewSection>
          {trailers.length === 0 ? null : (
            <ModalTrailer
              trailers={trailers}
              typeTab={props.type}
              toggle={open}
              toggleModal={toggleModal}
              idMovies={props.id}
            />
          )}
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
                  <Typography variant="h4" width={"100%"}>
                    {dataCard.title ?? dataCard.name} ({date.getFullYear()})
                  </Typography>
                  <Facts>
                    <FactsItem>{date.toLocaleDateString("en-US")}</FactsItem>
                    <FactsItem>
                      {dataCard.genres.map((item) => (
                        <Typography
                          sx={{ marginRight: "5px", display: "flex" }}
                          key={item.id}
                        >
                          {item.name}
                        </Typography>
                      ))}
                    </FactsItem>
                    <FactsItem>
                      {getTimeFromMins(
                        dataCard.runtime ?? dataCard.episode_run_time[0]
                      )}
                    </FactsItem>
                  </Facts>
                </TitleInform>
                <Actions>
                  <VoteRate>
                    <Typography>{dataCard.vote_average * 10}</Typography>
                    <sup>%</sup>
                    <CustomizedMovieScore rate={dataCard.vote_average} />
                  </VoteRate>
                  <Typography
                    sx={{ width: "15px", marginRight: "40px", color: "white" }}
                  >
                    User Score
                  </Typography>
                  <CustomizedIconButton
                    onClick={() => toggleModal()}
                    aria-label="play video"
                  >
                    <Icon />
                    Play Trailer
                  </CustomizedIconButton>
                </Actions>
                <Overview>
                  <Typography
                    sx={{
                      color: "gray",
                      fontStyle: "italic",
                      marginBottom: "15px",
                    }}
                  >
                    {dataCard.tagline}
                  </Typography>
                  <Typography variant="h6">Overview</Typography>
                  <Typography variant="body3">{dataCard.overview}</Typography>
                </Overview>
                <CoreCrew>
                  {coreCrew.map((item) => (
                    <CoreCrewItem>
                      <Typography>{item.name}</Typography>
                      <Typography variant="body3">{item.job}</Typography>
                    </CoreCrewItem>
                  ))}
                </CoreCrew>
              </ContentWrapper>
            </CustomizedCard>
          </BackgroundBlur>
        </MovieOverviewSection>
      ) : (
        <LinearProgress color={"primary"} />
      )}
    </CustomizedBox>
  );
};

export default MovieCard;
