import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/peoples/actions/peoples";
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
import { useHorizontalScroll } from "../../../utility/horizontalScroll";
import TabContainerCard from "../../Movies/Tabs/TabContainerCard";

const ActorCard = (props) => {
  const cardData = useSelector((state) => {
    return state.peoples.cardData.data;
  });
  const cast = useSelector((state) => {
    return state.peoples.cardData.cast;
  });

  const filteredCast = cast.filter(item=> item.media_type === 'movie').sort((a, b) => b.popularity - a.popularity).slice(0,10)
  
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  }, [onFetchPeopleCardData, onFetchPeopleCredits, id]);

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
    marginRight: '65px'
  });

  const PersonalInformItem = styled(Box)({
    marginBottom: "20px",
  });
  const PersonalInformTitle = styled(Typography)({
    fontWeight: "bold",
  });

  const KnownFor = styled(Box)({
    width: "100%",
    
  });

  const ScrollWrapper = styled(Box)({
    display: "flex",
    flexWrap: "nowrap",
    padding: "30px",
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
    display: 'flex'
  })
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
                {filteredCast.map(item=>(
                  <CustomLink
                  key={item.id}
                  to={`/${item.media_type ?? props.moviesType}/${item.id}`}
                  state={item.media_type ?? props.moviesType}
                >
                  <TabContainerCard data={item} />
                </CustomLink>
                ))}
              </ScrollWrapper>
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
