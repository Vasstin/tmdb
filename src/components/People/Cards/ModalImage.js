import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CardMedia from "@mui/material/CardMedia";
// import tmdbUrl from "../../../utility/tmdbUrl";
// import apiKey from "../../../utility/apiKey";
import Skeleton from "@mui/material/Skeleton";

const ModalImage = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '600px',
    height: '800px',
    bgcolor: "background.paper",
    // border: "6px solid #032541",
    boxShadow: 24,
  };

  const mediaStyle={
    width: '100%', 
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%'
  }
  
  return (
    <div>
      <Modal
        open={props.toggle}
        onClose={props.toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {props.image.length === 0 ? (
            <Skeleton variant="rectangular" width={640} height={360} />
          ) : (
            <CardMedia
              sx={mediaStyle}
              width={props.image.width}
              height={props.image.height}
              image={`https://image.tmdb.org/t/p/w500/${props.image.file_path}`}
            />
          )} 
        </Box>
      </Modal>
    </div>
  );
};

export default ModalImage;
