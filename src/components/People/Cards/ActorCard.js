import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/peoples/actions/peoples";
import { styled } from "@mui/material/styles";
import {
  Box,
  CardMedia,
  Typography,
  Skeleton,
  IconButton,
  LinearProgress,
  Popover,
  Button,
} from "@mui/material";
import { useHorizontalScroll } from "../../../utility/horizontalScroll";
import TabContainerCard from "../../Movies/Tabs/TabContainerCard";

const ActorCard = (props) => {
  const cardData = useSelector((state) => {
    return state.peoples.cardData.data;
  });
  const cast = useSelector((state) => {
    return state.peoples.cardData.cast;
  });
  const crew = useSelector((state) => {
    return state.peoples.cardData.crew;
  });

  const sortedCast = cast
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);

  const { id } = useParams();
  const locationState = useLocation();
  const scrollTab = useHorizontalScroll();

  const [isReadMore, setIsReadMore] = useState(true);
  const biography = cardData.biography ?? "";
  const genderType = { 1: "Female", 2: "Male" };
  const date = new Date(cardData.birthday);

  function getAge(date) {
    return new Date().getFullYear() - date.getFullYear();
  }

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  function getFilteredDepartment(crew) {
    let department = [];
    crew.forEach((item) => {
      if (!department.includes(item.department)) {
        department.push(item.department);
      }
    });
    return department.sort();
  }

  let departmentArray = getFilteredDepartment(crew);

  function getFilteredCastAndCrew(array) {
    const uniqueId = [];
    const newArray = [];
    array.forEach((item) => {
      if (!uniqueId.includes(item.id)) {
        uniqueId.push(item.id);
        newArray.push(item);
      }
    });
    return newArray;
  }
  const filteredCast = getFilteredCastAndCrew(cast);
  const filteredCrew = getFilteredCastAndCrew(crew);

  // getFilteredCastAndCrew(cast)
  //console.log(cast)
  //getFilteredCastAndCrew(cast)

  function getFullYear(date) {
    if (!date) {
      return "—";
    }
    return new Date(date).getFullYear();
  }

  const dispatch = useDispatch();

  const onFetchPeopleCardData = useCallback(
    () => dispatch(actions.fetchPeopleCardData(id)),
    [dispatch, id]
  );
  const onFetchPeopleCredits = useCallback(
    () => dispatch(actions.fetchPeopleCredits(id)),
    [dispatch, id]
  );

  useEffect(() => {
    onFetchPeopleCardData(id);
    onFetchPeopleCredits(id);
    return () => {
      dispatch(actions.cleanupCardData());
      //dispatch(actions.cleanupCast());
    };
  }, [onFetchPeopleCardData, onFetchPeopleCredits, id]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const ImgWrapper = styled(CardMedia)({
    minHeight: "200px",
    borderRadius: "10px",
    width: "300px",
    height: "450px",
  });

  const CustomizedBox = styled(Box)({
    marginTop: "120px",
    padding: "0 30px",
  });

  const ActorCardMain = styled(Box)({
    display: "flex",
    marginBottom: "30px",
  });

  const BasicInform = styled(Box)({
    marginLeft: "30px",
  });

  const ReadMoreSpan = styled("span")({
    color: "#01b4e4",
    fontWeight: "bold",
    "&:hover": {
      color: "#032541",
    },
  });

  const InformSection = styled(Box)({
    display: "flex",
    // flexDirection: 'column',
  });

  const PersonalInform = styled(Box)({
    display: "flex",
    flexDirection: "column",
    //marginRight: '30px',
    width: "20%",
  });

  const PersonalInformItem = styled(Box)({
    marginBottom: "20px",
  });
  const PersonalInformTitle = styled(Typography)({
    fontWeight: "bold",
  });

  const KnownFor = styled(Box)({
    paddingLeft: "80px",
    width: "80%",
  });

  const ScrollWrapper = styled(Box)({
    display: "flex",
    flexWrap: "nowrap",
    padding: "30px",
    marginBottom: "30px",
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
  const CustomLink = styled(Link)({
    display: "flex",
    color: "inherit",
    "&:hover": {
      color: "#01b4e4",
    },
  });

  const CastAndCrew = styled(Box)({});

  const CastAndCrewWrapper = styled(Box)({
    boxShadow: "0 2px 8px rgb(0 0 0 / 10%)",
    border: "1px solid #e3e3e3",
  });

  const CastAndCrewItem = styled(Box)({
    marginBottom: "30px",
  });

  const CastAndCrewInfo = styled(Box)({
    display: "flex",
    flexWrap: 'wrap',
    alignItems: "center",
    textAlign: "middle",
    padding: "10px",
    borderBottom: "1px solid #e3e3e3"
  });

  const CastAndCrewInfoDate = styled(Typography)({
    width: "60px",
    textAlign: "center",
    padding: "0 15px",
  });
  const CastAndCrewInfoTitle = styled(Typography)({
    padding: "0 0 0 15px",
    display: "flex",
    alignItems: "center",
  });
  const CastAndCrewInfoJob = styled(Typography)({
    padding: "0 0 0 5px",
    // color: "lightgray",
    display: "flex",
    alignItems: "center",
  });

  const UnreleasedBox = styled(Box)({
    borderBottom: "1px solid #e3e3e3",
  });
  console.log(filteredCast)
  return (
    <Box sx={{ marginTop: "120px" }}>
      {cardData.id ? (
        <CustomizedBox className="Wrapper">
          <ActorCardMain>
            <ImgWrapper
              component="img"
              image={`https://image.tmdb.org/t/p/w500/${cardData.profile_path}`}
              alt={cardData.name}
            />
            <BasicInform>
              <Typography variant="h4" sx={{ marginBottom: "30px" }}>
                {cardData.name}
              </Typography>
              <Typography variant="h6">Biography</Typography>
              <Typography sx={{ fontWeight: "fontWeightLight" }}>
                {isReadMore ? biography.slice(0, 350) : biography}
                <ReadMoreSpan onClick={toggleReadMore}>
                  {isReadMore ? "...Read More" : "Show Less"}
                </ReadMoreSpan>
              </Typography>
            </BasicInform>
          </ActorCardMain>
          <InformSection>
            <PersonalInform>
              <Typography sx={{ marginBottom: "20px" }} variant="h6">
                Personal Info
              </Typography>
              <PersonalInformItem>
                <PersonalInformTitle>Known For</PersonalInformTitle>
                <Typography sx={{ fontWeight: "fontWeightLight" }}>
                  {cardData.known_for_department}
                </Typography>
              </PersonalInformItem>
              <PersonalInformItem>
                <PersonalInformTitle>Gender</PersonalInformTitle>
                <Typography sx={{ fontWeight: "fontWeightLight" }}>
                  {genderType[cardData.gender]}
                </Typography>
              </PersonalInformItem>
              <PersonalInformItem>
                <PersonalInformTitle>Birthday</PersonalInformTitle>
                <Typography sx={{ fontWeight: "fontWeightLight" }}>
                  {`${date.toLocaleDateString("en-US")} (${getAge(
                    date
                  )} years old)`}
                </Typography>
              </PersonalInformItem>
              <PersonalInformItem>
                <PersonalInformTitle>Place of Birth</PersonalInformTitle>
                <Typography sx={{ fontWeight: "fontWeightLight" }}>
                  {cardData.place_of_birth}
                </Typography>
              </PersonalInformItem>
              <PersonalInformItem>
                <PersonalInformTitle>Also Known As</PersonalInformTitle>
                {cardData.also_known_as.map((item, index) => (
                  <Typography
                    key={index}
                    sx={{ fontWeight: "fontWeightLight" }}
                  >
                    {item}
                  </Typography>
                ))}
              </PersonalInformItem>
            </PersonalInform>
            <KnownFor>
              <Typography sx={{ marginBottom: "20px" }} variant="h6">
                Known For
              </Typography>
              <ScrollWrapper ref={scrollTab}>
                {sortedCast.map((item) => (
                  <CustomLink
                    key={item.id}
                    to={`/${item.media_type ?? props.moviesType}/${item.id}`}
                    state={item.media_type ?? props.moviesType}
                  >
                    <TabContainerCard data={item} />
                  </CustomLink>
                ))}
              </ScrollWrapper>
              <CastAndCrew>
                <CastAndCrewItem>
                  <Typography variant="h6">Acting</Typography>
                  <CastAndCrewWrapper>
                    <UnreleasedBox>
                      {filteredCast
                        .filter(
                          (item) => !item.first_air_date && !item.release_date
                        )
                        .map((item) => (
                          <CastAndCrewInfo>
                            <CastAndCrewInfoDate>{"—"}</CastAndCrewInfoDate>
                            <CustomLink
                              key={item.id}
                              to={`/${item.media_type ?? props.moviesType}/${
                                item.id
                              }`}
                              state={item.media_type ?? props.moviesType}
                            >
                              <CastAndCrewInfoTitle>
                                {item.title ?? item.name}
                              </CastAndCrewInfoTitle>
                            </CustomLink>
                            <CastAndCrewInfoJob
                              sx={{ fontWeight: "fontWeightLight" }}
                            >
                              <Typography
                                component={"span"}
                                sx={{ color: "lightgray", paddingRight: "5px" }}
                              >
                                {item.episode_count
                                  ? `(${item.episode_count} episodes)`
                                  : null}
                              </Typography>
                              {(item.character ?? item.job) !== '' ? `as ${item.character ?? item.job}` : 'unknown'}
                            </CastAndCrewInfoJob>
                          </CastAndCrewInfo>
                        ))}
                    </UnreleasedBox>
                    {filteredCast
                      .filter(
                        (item) => item.release_date ?? item.first_air_date
                      )
                      .sort(
                        (a, b) =>
                          new Date(b.release_date ?? b.first_air_date) -
                          new Date(a.release_date ?? a.first_air_date)
                      )
                      .map((item) => (
                        <CastAndCrewInfo>
                          <CastAndCrewInfoDate>
                            {getFullYear(
                              item.release_date ?? item.first_air_date
                            )}
                          </CastAndCrewInfoDate>
                          <CustomLink
                            key={item.id}
                            to={`/${item.media_type ?? props.moviesType}/${
                              item.id
                            }`}
                            state={item.media_type ?? props.moviesType}
                          >
                            <CastAndCrewInfoTitle>
                              {item.title ?? item.name}
                            </CastAndCrewInfoTitle>
                          </CustomLink>
                            <CastAndCrewInfoJob
                              sx={{ fontWeight: "fontWeightLight" }}
                            >
                              <Typography
                                component={"span"}
                                sx={{ color: "lightgray", paddingRight: "5px" }}
                              >
                                {item.episode_count
                                  ? `(${item.episode_count} episodes)`
                                  : null}
                              </Typography>
                              {(item.character ?? item.job) !== '' ? `as ${item.character ?? item.job}` : 'unknown'}
                            </CastAndCrewInfoJob>
                        </CastAndCrewInfo>
                      ))}
                  </CastAndCrewWrapper>
                </CastAndCrewItem>
                <CastAndCrewItem>
                  {departmentArray.map((item) => {
                    return (
                      <CastAndCrewItem>
                        <Typography variant="h6">{item}</Typography>
                        <CastAndCrewWrapper>
                          <UnreleasedBox>
                            {filteredCrew
                              .filter(
                                (item) =>
                                  !item.first_air_date && !item.release_date
                              )
                              .map((item) => (
                                <CastAndCrewInfo>
                                  <CastAndCrewInfoDate>
                                    {"—"}
                                  </CastAndCrewInfoDate>
                                  <CustomLink
                                    key={item.id}
                                    to={`/${
                                      item.media_type ?? props.moviesType
                                    }/${item.id}`}
                                    state={item.media_type ?? props.moviesType}
                                  >
                                    <CastAndCrewInfoTitle>
                                      {item.title ?? item.name}
                                    </CastAndCrewInfoTitle>
                                  </CustomLink>
                                    <CastAndCrewInfoJob
                                      sx={{ fontWeight: "fontWeightLight" }}
                                    >
                                      <Typography
                                        component={"span"}
                                        sx={{
                                          color: "lightgray",
                                          paddingRight: "5px",
                                        }}
                                      >
                                        {item.episode_count
                                          ? `(${item.episode_count} episodes)`
                                          : null}
                                      </Typography>
                                      {(item.character ?? item.job) !== '' ? `as ${item.character ?? item.job}` : 'unknown'}
                                    </CastAndCrewInfoJob>
                                </CastAndCrewInfo>
                              ))}
                          </UnreleasedBox>
                          {filteredCrew
                            .filter(
                              (item) => item.release_date ?? item.first_air_date
                            )
                            .sort(
                              (a, b) =>
                                new Date(b.release_date ?? b.first_air_date) -
                                new Date(a.release_date ?? a.first_air_date)
                            )
                            .filter(
                              (filterItem) => filterItem.department === item
                            )
                            .map((item) => (
                              <CastAndCrewInfo>
                                <CastAndCrewInfoDate>
                                  {getFullYear(
                                    item.release_date ??
                                      item.first_air_date
                                  )}
                                </CastAndCrewInfoDate>
                                <CustomLink
                                  key={item.id}
                                  to={`/${
                                    item.media_type ?? props.moviesType
                                  }/${item.id}`}
                                  state={
                                    item.media_type ?? props.moviesType
                                  }
                                >
                                  <CastAndCrewInfoTitle>
                                    {item.title ?? item.name}
                                  </CastAndCrewInfoTitle>
                                </CustomLink>
                                  <CastAndCrewInfoJob
                                    sx={{ fontWeight: "fontWeightLight" }}
                                  >
                                    <Typography
                                      component={"span"}
                                      sx={{
                                        color: "lightgray",
                                        paddingRight: "5px",
                                      }}
                                    >
                                      {item.episode_count
                                        ? `(${item.episode_count} episodes)`
                                        : null}
                                    </Typography>
                                    {(item.character ?? item.job) !== '' ? `as ${item.character ?? item.job}` : 'unknown'}
                                  </CastAndCrewInfoJob>
                              </CastAndCrewInfo>
                            ))}
                        </CastAndCrewWrapper>
                      </CastAndCrewItem>
                    );
                  })}
                </CastAndCrewItem>
              </CastAndCrew>
            </KnownFor>
          </InformSection>
        </CustomizedBox>
      ) : (
        <LinearProgress
          sx={{ marginBottom: "800px", transition: "all 1s", color: "red" }}
          color={"primary"}
        />
      )}
    </Box>
  );
};

export default ActorCard;
