import * as React from "react";
import { styled } from "@mui/material/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImgWrapper = styled(LazyLoadImage)({
  width: "450px",
  height: "300px",
});

export default function MediaCard(props) {
  return (
    
    <ImgWrapper
      onClick={() => props.toggleModalImage(props.index, props.cardType)}
      sx={
        props.cardType === "posters" || props.cardType === 'photo'
          ? { width: "300px", height: "450px" }
          : null
      }
      effect="blur"
      src={`https://image.tmdb.org/t/p/w780${props.path}`}
    />
  );
}
