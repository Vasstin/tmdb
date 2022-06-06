import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import * as actions from "../../../store/actions/action";

import tmdbUrl from "../../../utility/tmdbUrl";
import apiKey from "../../../utility/apiKey";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import ModalTrailer from "./ModalTrailer";
import Skeleton from "@mui/material/Skeleton";

const TrailerCard = (props) => {
  const [trailers, setTrailers] = useState([]);
  // const [id, setId] = useState()

  // const dispatch = useDispatch();
  // const trailers = useSelector((state) => {
  //   return state.movies.cardData.trailers
  // });
  // const onFetchTrailers = useCallback(
  //   () => dispatch(actions.fetchTrailers(id, props.type)),
  //   [dispatch, id, props.type]
  // );

  // useEffect(()=>{
  //   onFetchTrailers(id, props.type)
  // }, [onFetchTrailers, id, props.type])
  useEffect(() => {
    let isSubscribed = true;
    tmdbUrl
      .get(
        `${props.type}/${props.data.id}/videos?api_key=${apiKey}&language=en-US`
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
  }, [props.data.id, props.type]);

  const ImgWrapper = styled(CardMedia)({
    minHeight: "200px",
    width: "300px",
    borderRadius: "10px",
  });

  const Content = styled(CardContent)({
    display: "flex",
    paddingTop: "10px",
    paddingBottom: "0px",
    flexDirection: "column",
    fontSize: "13px",
  });

  const CustomizedCard = styled(Card)`
    position: relative;
    min-width: 300px;
    min-height: 350px;
    margin-right: 20px;
    background: transparent;
    box-shadow: none;
    color: white;
    transition: all 1s;
    &:hover {
      transform: scale(1.1);
      transition: all 1s;
    }
  `;

  const Wrapper = styled(Box)`
    position: relative;
  `;
  const CustomizedIconButton = styled(IconButton)`
    position: absolute;
    top: 35%;
    left: 40%;
    width: 70px;
    height: 70px;
    z-index: 1;
    transition: all 1s;
    &:hover {
      transform: scale(1.2);
      background-color: white;
      transition: all 1s;
    }
  `;
  const Icon = styled(PlayArrowIcon)`
    width: 70px;
    height: 70px;
    z-index: 1;
  `;
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  
  return (
    <CustomizedCard
    /*onClick={()=>setId(props.data.id)}*/
      sx={{ transform: `scale(${props.scale})` }}
      onMouseEnter={() =>
        props.handleNowPlayingId(
          props.data.backdrop_path,
          props.data.id,
          props.type
        )
      }
    >
      {trailers.length === 0 ? null : (
        <ModalTrailer
          trailers={trailers}
          typeTab={props.type}
          toggle={open}
          toggleModal={toggleModal}
          idMovies={props.id}
        />
      )}

      <Wrapper>
        {!props.data.backdrop_path ? (
          <Skeleton
            animation={false}
            sx={{ bgcolor: "#032541", borderRadius: "10px" }}
            variant="rectangular"
            width={300}
            height={200}
          />
        ) : (
          <ImgWrapper
            component="img"
            image={`https://image.tmdb.org/t/p/w500/${props.data.backdrop_path}`}
          />
        )}
        <CustomizedIconButton
          onClick={() => toggleModal()}
          color="primary"
          aria-label="play video"
        >
          <Icon />
        </CustomizedIconButton>
      </Wrapper>
      <Content>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {props.data.title ?? props.data.name}
        </Typography>
      </Content>
    </CustomizedCard>
  );
};

export default TrailerCard;
