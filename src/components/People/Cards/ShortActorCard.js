import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const ShortActorCard = (props) => {
  // const [showSkeleton, setShowSkeleton] = useState(true);

  // useEffect(() => {
  //   fetch(`https://image.tmdb.org/t/p/w500/${props.data.profile_path}`).then(
  //     (res) => {
  //       setImgLink(res.url);
  //       setShowSkeleton(false);
  //     }
  //   );
  //   return () => {
  //     setImgLink("");
  //     setShowSkeleton(true);
  //   };
  // }, []);

  const Content = styled(CardContent)({
    display: "flex",
    paddingTop: "10px",
    paddingBottom: "0px",
    flexDirection: "column",
    fontSize: "13px",
  });

  const CustomizedCard = styled(Card)`
    /* flex: 0 0 auto; */
    width: 150px;
    //min-height: 330px;
    margin-right: 15px;
    background: transparent;
    box-shadow: 1px solid lightgray;
    margin-bottom: 10px;
    border-radius: 10px;
    /* padding-bottom: 10px; */
    /* transition: all 1s;
    &:hover {
      transform: scale(1.1);
      transition: all 1s;
    } */
  `;
  const CustomLink = styled(Link)({
    display: "flex",
  });

  const CustomLazyLoadImage = styled(LazyLoadImage)({
    width: "150px",
    height: "225px",
  });

  console.log();
  return (
    <CustomLink to={props.to}>
      <CustomizedCard
        /*onClick={() => handleClick()}*/ sx={
          props.cardType === "actorCard"
            ? { width: "200px", minHeight: "430px" }
            : null
        }
      >
        {!props.data.profile_path ? (
          <Skeleton variant="rectangular" width={200} height={300} />
        ) : (
          <CustomLazyLoadImage
            effect="blur"
            sx={
              props.cardType === "actorCard"
                ? { width: "200px", height: "300px" }
                : null
            }
            src={`https://image.tmdb.org/t/p/w500/${props.data.profile_path}`}
            alt={props.data.name}
          />
          //<ImgWrapper component="img" image={`https://image.tmdb.org/t/p/w500/${props.data.profile_path}`} alt={props.data.name} />
        )}
        <Content>
          <Typography>{props.data.name}</Typography>
          <Typography sx={{ fontWeight: "fontWeightLight" }} variant="body2">
            {props.data.character}
          </Typography>
          {props.cardType === "actorCard" ? (
            <Box>
              {props.data.known_for.map((item, index) => (
                <Typography
                  key={index}
                  sx={{ fontWeight: "fontWeightLight", fontSize: "small" }}
                >
                  {item.title ?? item.name}
                </Typography>
              ))}
            </Box>
          ) : null}
        </Content>
      </CustomizedCard>
    </CustomLink>
  );
};

export default ShortActorCard;
