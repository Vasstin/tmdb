import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/actions/action";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MovieScore from "../../../utility/MovieScore";
import { Skeleton } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ModalTrailer from "./ModalTrailer";

const MovieCard = (props) => {
  const { id } = useParams();
  const locationState = useLocation();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const cardData = useSelector((state) => {
    return state.movies.cardData.data
  });
  
  const trailers = useSelector((state) => {
    return state.movies.cardData.trailers
  });
  
  const coreCrew = useSelector((state) => {
    return state.movies.cardData.crew
  });

  const onFetchCardData = useCallback(
    () => dispatch(actions.fetchCardData(id, locationState.state)),
    [dispatch, id, locationState.state]
  );
  const onFetchTrailers = useCallback(
    () => dispatch(actions.fetchTrailers(id, locationState.state)),
    [dispatch, id, locationState.state]
  );
  const onFetchCrew = useCallback(
    () => dispatch(actions.fetchCrew(id, locationState.state)),
    [dispatch, id, locationState.state]
  );

  
  useEffect(()=>{
    onFetchCardData(id, locationState.state)
    onFetchTrailers(id, locationState.state)
    onFetchCrew(id, locationState.state)
  }, [onFetchCardData, onFetchTrailers, onFetchCrew,id, locationState.state])
  
  const toggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const date = new Date(cardData.release_date ?? cardData.first_air_date);
  function getTimeFromMins(mins) {
    if (mins < 60) {
      return `${mins}m`;
    } else {
      return `${Math.trunc(mins / 60)}h ${mins % 60}m`;
    }
  }

  // -------------------------------------------------------
  //const fullState = useSelector((state) => {
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

  //const cardData = getArrayFromState(fullState, id);

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
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${cardData.backdrop_path}")`,
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
      {cardData.id ? (
        <MovieOverviewSection>
          {trailers.length === 0 ? null : (
            <ModalTrailer
              trailers={trailers}
              toggle={open}
              toggleModal={toggleModal}
            />
          )}
          <BackgroundBlur>
            <CustomizedCard className="Wrapper">
              {!cardData.poster_path ? (
                <Skeleton
                  sx={{ borderRadius: "10px" }}
                  variant="rectangular"
                  width={300}
                  height={450}
                />
              ) : (
                <ImgWrapper
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500/${cardData.poster_path}`}
                  alt={cardData.title}
                />
              )}
              <ContentWrapper>
                <TitleInform>
                  <Typography variant="h4" width={"100%"}>
                    {cardData.title ?? cardData.name} ({date.getFullYear()})
                  </Typography>
                  <Facts>
                    <FactsItem>{date.toLocaleDateString("en-US")}</FactsItem>
                    <FactsItem>
                      {cardData.genres.map((item) => (
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
                        cardData.runtime ?? cardData.episode_run_time[0]
                      )}
                    </FactsItem>
                  </Facts>
                </TitleInform>
                <Actions>
                  <VoteRate>
                    <Typography>{cardData.vote_average * 10}</Typography>
                    <sup>%</sup>
                    <CustomizedMovieScore rate={cardData.vote_average} />
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
                    {cardData.tagline}
                  </Typography>
                  <Typography variant="h6">Overview</Typography>
                  <Typography variant="body3">{cardData.overview}</Typography>
                </Overview>
                <CoreCrew>
                  {coreCrew.map((item) => (
                    <CoreCrewItem key={item.id}>
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
