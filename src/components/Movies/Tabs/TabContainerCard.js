import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import MovieScore from "../../../utility/MovieScore";
import { Box } from "@mui/system";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const ImgWrapper = styled(LazyLoadImage)({
  borderRadius: "10px",
  //background: "#032541",
  width: "150px",
  height: "225px",
});

const Content = styled(CardContent)({
  display: "flex",
  paddingTop: "10px",
  paddingBottom: "0px",
  flexDirection: "column",
  fontSize: "13px",
});

const VoteRate = styled(Box)({
  position: "relative",
  display: "flex",
  height: "40px",
  width: "40px",
  alignItems: "center",
  justifyContent: "center",
  margin: "-15px 0 0 15px",
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

const CustomizedCard = styled(Card)`
  width: 150px;
  min-height: 380px;
  margin-right: 15px;
  background: transparent;
  box-shadow: none;
  transition: all 1s;

  &:hover {
    transform: scale(1.1);
    transition: all 1s;
  }
`;

const cardStyle = {
  width: "200px",
  height: "100%",
  marginBottom: "10px",
  borderRadius: "10px",
  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
  "&:hover": {
    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    transform: "none",
  },
};

const CustomizedMovieScore = styled(MovieScore)`
  position: absolute;
  top: 0;
  left: 0;
`;
const CustomLink = styled(Link)({
  display: "flex",
  marginBottom: "10px",
});

const CustomSkeleton = styled(Skeleton)({
  width: "150px",
  height: "225px",
});

export default function TabContainerCard(props) {
  // let navigate = useNavigate();
  // function handleClick() {
  //   navigate(`/movies/${props.data.id}`);
  // }
  const getReleaseDate = (releaseDate) => {
    const date = new Date(`${releaseDate}`).toLocaleString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return date;
  };

  getReleaseDate(props.data.release_date);

  return (
    <CustomLink to={props.to} state={props.linkState}>
      <CustomizedCard sx={props.cardType === "movieCard" ? cardStyle : null}>
        {!props.data.poster_path ? (
          <CustomSkeleton
            sx={
              props.cardType === "movieCard"
                ? { width: "200px", height: "300px", borderRadius: "0" }
                : { borderRadius: "10px" }
            }
            // sx={{ borderRadius: "10px" }}
            variant="rectangular"
          />
        ) : (
          <ImgWrapper
            sx={
              props.cardType === "movieCard"
                ? { width: "200px", height: "300px", borderRadius: "0" }
                : null
            }
            effect="blur"
            src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
            alt={props.data.title}
          />
        )}

        <VoteRate>
          <Typography>{Math.floor(props.data.vote_average * 10)}</Typography>
          <sup>%</sup>
          <CustomizedMovieScore rate={props.data.vote_average} />
        </VoteRate>
        <Content>
          <Typography
          // gutterBottom
          // variant="span"
          // component="div"
          // sx={{ fontWeight: "bold" }}
          >
            {props.data.title ?? props.data.name}
          </Typography>
          <Typography sx={{ fontWeight: "fontWeightLight" }} variant="body2">
            {getReleaseDate(
              props.data.release_date ?? props.data.first_air_date
            )}
          </Typography>
        </Content>
      </CustomizedCard>
    </CustomLink>
  );
}
