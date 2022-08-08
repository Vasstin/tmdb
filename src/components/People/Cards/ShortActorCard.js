import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
    /* transition: all 1s;
    &:hover {
      transform: scale(1.1);
      transition: all 1s;
    } */
  `;

  return (
    <CustomizedCard /*onClick={() => handleClick()}*/>
      {!props.data.profile_path ? (
        <Skeleton
          variant="rectangular"
          width={150}
          height={225}
        />
        ) : (
        <LazyLoadImage effect="blur" width={150}
        height={225} src={`https://image.tmdb.org/t/p/w500/${props.data.profile_path}`} alt={props.data.name} />
        //<ImgWrapper component="img" image={`https://image.tmdb.org/t/p/w500/${props.data.profile_path}`} alt={props.data.name} />
      )}
      <Content>
        <Typography>{props.data.name}</Typography>
        <Typography sx={{ fontWeight: "fontWeightLight" }} variant="body2">
          {props.data.character}
        </Typography>
      </Content>
    </CustomizedCard>
  );
};

export default ShortActorCard;
