import React, { useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";

const CastAndCrewCard = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const CustomizedCard = styled(Card)({
    display: "flex",
    boxShadow: "none",
    borderRadius: "0",
    marginBottom: "15px",
  });

  const ImgWrapper = styled(CardMedia)({
    background: "#032541",
    width: "70px",
    height: "70px",
  });

  const Content = styled(CardContent)({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "top",
  });

  return (
    <CustomizedCard /*onClick={() => handleClick()}*/>
      {!props.profile_path ? (
        <Skeleton variant="rectangular" width={70} height={70} />
      ) : (
        <ImgWrapper
          component="img"
          image={`https://image.tmdb.org/t/p/w500/${props.profile_path}`}
          alt={props.name}
        />
      )}
      <Content>
        <Typography variant="body2">{props.name}</Typography>
        <Typography variant="body2" sx={{ color: "lightgray" }}>
          {props.character ?? props.job}
        </Typography>
      </Content>
    </CustomizedCard>
  );
};

export default CastAndCrewCard;
