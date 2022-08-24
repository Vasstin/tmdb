import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ModalImage = (props) => {
  const CustomBox = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "800px",
    bgcolor: "background.paper",
    boxShadow: 24,
  });

  const CustomImage = styled(LazyLoadImage)({
    width: "500px",
    height: "800px",
  });

  // const ImgWrapper = styled(LazyLoadImage)({
  //   // borderRadius: "10px",
  //   //background: "#032541",
  //   width: "450px",
  //   height: "300px",
  // });
  
  return (
    <div>
      <Modal
        open={props.toggle}
        onClose={props.toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomBox sx={
                props.typeTab === "backdrops"
                  ? { width: "800px", height: "500px" }
                  : null
              }>
          {props.image.length === 0 ? (
            <Skeleton variant="rectangular" width={640} height={360} />
          ) : (
            // <CardMedia
            //   sx={mediaStyle}
            //   width={props.image.width}
            //   height={props.image.height}
            //   image={`https://image.tmdb.org/t/p/w1280/${props.image.file_path}`}
            // />
            <CustomImage
            effect="blur"
              sx={
                props.typeTab === "backdrops"
                  ? { width: "800px", height: "500px" }
                  : null
              }
              src={`https://image.tmdb.org/t/p/w1280/${props.image.file_path}`}
            />
          )}
        </CustomBox>
      </Modal>
    </div>
  );
};

export default ModalImage;
