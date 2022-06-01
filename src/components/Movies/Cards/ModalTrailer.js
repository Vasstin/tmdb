import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CardMedia from "@mui/material/CardMedia";
// import tmdbUrl from "../../../utility/tmdbUrl";
// import apiKey from "../../../utility/apiKey";
import Skeleton from "@mui/material/Skeleton";

const ModalTrailer = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 640,
    height: 360,
    bgcolor: "background.paper",
    border: "6px solid #032541",
    boxShadow: 24,
  };
  // const [trailers, setTrailers] = useState([]);

  // useEffect(() => {
  //   tmdbUrl
  //     .get(`${props.typeTab}/${props.idMovies}/videos?api_key=${apiKey}&language=en-US`)
  //     .then((response) =>
  //       setTrailers(
  //         response.data.results.filter((item) => item.name.includes("Trailer"))
  //       )
  //     );
  // }, [props.idMovies, props.typeTab]);

  // `${tmdbUrl}movie/${props.data.id}/videos?api_key=${apiKey}&language=en-US`

  return (
    <div>
      <Modal
        open={props.toggle}
        onClose={props.toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {props.trailers.length === 0 ? (
            <Skeleton variant="rectangular" width={640} height={360} />
          ) : (
            <CardMedia
              component="iframe"
              frameBorder="0"
              width={640}
              height={360}
              image={`https://www.youtube.com/embed/${props.trailers[0].key}?autoplay=1`}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalTrailer;
