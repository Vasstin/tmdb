import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/movies/actions/index";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  IconButton,
  LinearProgress,
} from "@mui/material";
import MovieScore from "../../../utility/MovieScore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ModalTrailer from "./ModalTrailer";
import ShortActorCard from "../../People/Cards/ShortActorCard";
import { useHorizontalScroll } from "../../../utility/horizontalScroll";
// import tmdbUrl from "../../../utility/tmdbUrl";
// import apiKey from "../../../utility/apiKey";
import TabsContainer from "../Tabs/TabsContainer";
import MediaTabsContainer from "../Tabs/MediaTabsContainer";

const MovieCard = (props) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const locationState = useLocation();
  const scrollTab = useHorizontalScroll();
  const navigate = useNavigate();

  const toggleModal = () => {
    setOpen(!open);
  };
  // const [isContentLoaded, setIsContentLoaded] = useState(false);
  const isError = useSelector((state) => {
    return state.movies.isError;
  });

  function coreCrewFilter(item) {
    return item.job === "Director" || item.job === "Screenplay";
  }

  const dispatch = useDispatch();

  const cardData = useSelector((state) => {
    return state.movies.cardData.data;
  });

  const recommendations = useSelector((state) => {
    return state.movies.advicedMovies.recommendations;
  });
  const similar = useSelector((state) => {
    return state.movies.advicedMovies.similar;
  });

  const trailers = useSelector((state) => {
    return state.movies.cardData.trailers;
  });

  const crew = useSelector((state) => {
    return state.movies.cardData.crew;
  });

  const cast = useSelector((state) => {
    return state.movies.cardData.cast;
  });
  const topCast = useSelector((state) => {
    return state.movies.cardData.topCast;
  });
  const backdrops = useSelector((state) => {
    return state.movies.cardData.media.backdrops;
  });
  const logos = useSelector((state) => {
    return state.movies.cardData.media.logos;
  });
  const posters = useSelector((state) => {
    return state.movies.cardData.media.posters;
  });

  // useEffect(() => {
  //   if (
  //     recommendations.length > 0 &&
  //     similar.length > 0 &&
  //     trailers.length > 0 &&
  //     crew.length > 0 &&
  //     cast.length > 0 &&
  //     topCast.length > 0
  //   ) {
  //     setTimeout(()=> {
  //       setIsContentLoaded(true);

  //     }, 1000)
  //   }
  //   return () => {
  //     setIsContentLoaded(false);
  //   };
  // }, [cardData, recommendations, similar, trailers, crew, cast, topCast]);
  // console.log(isContentLoaded);
  let credits =
    locationState.state === "movie" ? "credits" : "aggregate_credits";

  const onFetchCardData = useCallback(
    () => dispatch(actions.fetchCardData(id, locationState.state)),
    [dispatch, id, locationState.state]
  );
  const onFetchTrailers = useCallback(
    () => dispatch(actions.fetchTrailers(id, locationState.state)),
    [dispatch, id, locationState.state]
  );
  const onFetchMedia = useCallback(
    () => dispatch(actions.fetchMedia(id, locationState.state)),
    [dispatch, id, locationState.state]
  );
  const onFetchCrewAndCast = useCallback(
    () => dispatch(actions.fetchCrewAndCast(id, locationState.state, credits)),
    [dispatch, id, locationState.state, credits]
  );
  const onFetchRecommendAndSimilarMovies = useCallback(
    () =>
      dispatch(
        actions.fetchRecommendAndSimilarMovies(id, locationState.state, [
          "recommendations",
          "similar",
        ])
      ),
    [dispatch, id, locationState.state]
  );

  useEffect(() => {
    if (isError) {
      navigate("/error");
    }
    onFetchCardData(id, locationState.state);
    onFetchTrailers(id, locationState.state);
    onFetchMedia(id, locationState.state);
    onFetchCrewAndCast(id, locationState.state, credits);
    onFetchRecommendAndSimilarMovies(id, locationState.state);

    return () => {
      dispatch(actions.cleanupCardData());
      dispatch(actions.cleanupTopCast());
    };
  }, [
    onFetchCardData,
    onFetchTrailers,
    onFetchCrewAndCast,
    onFetchRecommendAndSimilarMovies,
    onFetchMedia,
    dispatch,
    id,
    locationState.state,
    credits,
    isError,
    navigate,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(()=> {
  //   tmdbUrl
  //     .get(`tv/${id}/aggregate_credits?api_key=${apiKey}&language=en-US`)
  //     .then(res => console.log(res.data))
  // },[])

  const date = new Date(cardData.release_date ?? cardData.first_air_date);
  const fullYear = date.getFullYear();
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
    padding: "30px ",
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
    // minHeight: "800px",
  });

  const BackgroundBlur = styled(Box)({
    background:
      "linear-gradient(to bottom right, rgba(10.5, 31.5, 31.5, 1), rgba(10.5, 31.5, 31.5, 0.84))",
  });

  const MovieOverviewSection = styled(Box)({
    backgroundImage: `url("https://image.tmdb.org/t/p/original/${cardData.backdrop_path}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    marginBottom: "30px",
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

  const FactsItem = styled(Box)({
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

  const MovieInformSection = styled(Box)({
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    // padding: "0 30px ",
    marginBottom: "30px",
  });

  const CastWrapper = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    width: "80%",
  });

  const ScrollWrapper = styled(Box)({
    display: "flex",
    flexWrap: "nowrap",
    padding: "0 30px ",
    overflow: "scroll",
    "::-webkit-scrollbar": {
      height: "10px",
    },
    "::-webkit-scrollbar-thumb": {
      height: "5px",
      backgroundColor: "#032541",
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-corner": {
      background: "rgba(0,0,0,0)",
    },
  });

  const BaseInfornation = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    width: "20%",
    paddingLeft: "20px",
    alignContent: "center",
    boxSizing: "border-box",
  });

  const BaseInfornationItem = styled(Box)({
    display: "flex",
    width: "100%",
    flexDirection: "column",
  });
  
  return (
    <div /*hidden={!isContentLoaded}*/>
      <CustomizedBox>
        {cardData.id && cast.length > 0 ? (
          <div>
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
                        {cardData.title ?? cardData.name} ({fullYear})
                      </Typography>
                      <Facts>
                        <FactsItem>
                          <Typography>
                            {date.toLocaleDateString("en-US")}
                          </Typography>
                        </FactsItem>
                        <FactsItem>
                          {cardData.genres.map((item, index) => (
                            <Typography
                              sx={{ display: "flex" }}
                              key={item.id + 1}
                            >
                              {(index ? ", " : "") + item.name}
                            </Typography>
                          ))}
                        </FactsItem>
                        <FactsItem>
                          <Typography>
                            {getTimeFromMins(
                              cardData.runtime ?? cardData.episode_run_time[0]
                            )}
                          </Typography>
                        </FactsItem>
                      </Facts>
                    </TitleInform>
                    <Actions>
                      <VoteRate>
                        <Typography>
                          {Math.floor(cardData.vote_average * 10)}
                        </Typography>
                        <sup>%</sup>
                        <CustomizedMovieScore rate={cardData.vote_average} />
                      </VoteRate>
                      <Typography
                        sx={{
                          width: "15px",
                          marginRight: "40px",
                          color: "white",
                        }}
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
                      <Typography variant="body3">
                        {cardData.overview}
                      </Typography>
                    </Overview>
                    <CoreCrew>
                      {crew
                        .filter((item) => coreCrewFilter(item))
                        .map((item) => (
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
            <MovieInformSection className="Wrapper">
              <CastWrapper>
                <Typography
                  variant="h5"
                  sx={{
                    width: "100%",
                    marginBottom: "15px",
                    paddingLeft: "30px",
                  }}
                >
                  Top Cast
                </Typography>
                {topCast.length > 0 ? (
                  <ScrollWrapper ref={scrollTab}>
                    {topCast.map((item) => (
                      <ShortActorCard
                        to={`/actor/${item.id}`}
                        key={item.id}
                        data={item}
                      />
                    ))}
                    <Link
                      style={{ display: "flex", alignItems: "center" }}
                      to={`/${locationState.state}/${cardData.id}/cast`}
                      state={{
                        poster: cardData.poster_path,
                        title: cardData.title ?? cardData.name,
                        year: fullYear,
                        credits: credits,
                        mediaType: locationState.state,
                      }}
                    >
                      <Typography sx={{ width: "100px", textAlign: "center" }}>
                        View more
                      </Typography>
                    </Link>
                  </ScrollWrapper>
                ) : (
                  <Skeleton
                    sx={{ borderRadius: "10px", bgcolor: "transparent" }}
                    variant="rectangular"
                    width={"100%"}
                    height={370}
                  />
                )}
              </CastWrapper>
              <BaseInfornation>
                <BaseInfornationItem>
                  <Typography variant="h6">Status:</Typography>
                  <Typography variant="body2">{cardData.status}</Typography>
                </BaseInfornationItem>
                <BaseInfornationItem>
                  <Typography variant="h6">Original Language:</Typography>
                  <Typography variant="body2">
                    {cardData.original_language === "en"
                      ? "English"
                      : cardData.original_language}
                  </Typography>
                </BaseInfornationItem>
                <BaseInfornationItem>
                  <Typography variant="h6">
                    {locationState.state === "movie" ? "Budget:" : "Network:"}
                  </Typography>
                  <Typography variant="body2">
                    {locationState.state === "movie"
                      ? `$${cardData.budget}`
                      : `${cardData.networks[0].name}`}
                  </Typography>{" "}
                </BaseInfornationItem>
                <BaseInfornationItem>
                  <Typography variant="h6">
                    {locationState.state === "movie" ? "Revenue:" : "Type:"}
                  </Typography>
                  <Typography variant="body2">
                    {locationState.state === "movie"
                      ? `$${cardData.revenue}`
                      : `${cardData.type}`}
                  </Typography>
                </BaseInfornationItem>
              </BaseInfornation>
            </MovieInformSection>
            <MediaTabsContainer
              title={"Media"}
              tabLabelOne={"Backdrops"}
              tabLabelTwo={"Logos"}
              tabLabelThree={"Posters"}
              tabOne={backdrops}
              tabTwo={logos}
              tabThree={posters}

            />
            <TabsContainer
              title={"TMDB Advises"}
              tabLabelOne={"Recommendations"}
              tabLabelTwo={"Similar"}
              tabOne={recommendations}
              tabTwo={similar}
              tvsType={locationState.state}
              moviesType={locationState.state}
            />
          </div>
        ) : (
          <LinearProgress
            sx={{ marginBottom: "1300px", transition: "all 1s" }}
            color={"primary"}
          />
        )}
      </CustomizedBox>
    </div>
  );
};

export default MovieCard;
