import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import MovieScore from "../../../utility/MovieScore";
import { Box } from "@mui/system";

const ImgWrapper = styled(CardMedia)({
  minHeight: "200px",
  borderRadius: "10px",
  background: "#032541",
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
  min-width: 150px;
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

const CustomizedMovieScore = styled(MovieScore)`
  position: absolute;
  top: 0;
  left: 0;
`;

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
    <CustomizedCard /*onClick={() => handleClick()}*/>
      {!props.data.poster_path ? (
        <Skeleton
          sx={{ borderRadius: "10px" }}
          variant="rectangular"
          width={150}
          height={225}
        />
      ) : (
        <ImgWrapper
          component="img"
          image={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
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
          {getReleaseDate(props.data.release_date ?? props.data.first_air_date)}
        </Typography>
      </Content>
    </CustomizedCard>
  );
}
