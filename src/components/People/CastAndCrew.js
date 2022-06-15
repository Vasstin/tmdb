import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Skeleton,
  IconButton,
  LinearProgress,
  Button,
} from "@mui/material";
import CastAndCrewCard from "./Cards/CastAndCrewCard";

const CastAndCrew = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const crew = useSelector((state) => {
    return state.movies.cardData.crew;
  });

  const cast = useSelector((state) => {
    return state.movies.cardData.cast;
  });

  const CastomBox = styled(Box)({
    marginTop: "120px",
  });

  const BackgroundBlur = styled(Box)({
    background:
      "linear-gradient(to bottom right, rgba(10.5, 31.5, 31.5, 1), rgba(10.5, 31.5, 31.5, 0.84))",
    marginBottom: "30px",
  });

  const MovieOverviewSection = styled(CardMedia)({
    // backgroundImage: `url("https://image.tmdb.org/t/p/original/${location.state}")`,
    // minHeight: "200px",
    borderRadius: "10px",
    width: "60px",
    height: "90px",
  });

  const MoviePanel = styled(Box)({
    display: "flex",
    padding: "15px 30px",
    color: "white",
  });

  const MovieInform = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    // flexDirection: 'column',
    // alignItems: 'start',
    alignContent: "center",
    marginLeft: "30px",
  });

  const MovieTitle = styled(Box)({
    display: "flex",
    width: "100%",
    alignItems: "top",
  });

  const CastomButton = styled(Button)({
    color: "white",
    height: "25px",
  });

  const CastAndCrew = styled("section")({
    display: 'flex',
  });

  const Cast = styled(Box)({
    width: '500px',
    paddingLeft: "30px",
  });
  const Crew = styled(Box)({
    width: '500px',
    paddingLeft: "30px",
  });
  function filterCrew(crew){
    let department = []
    crew.map(item => {
      if(!department.includes(item.department)){
        department.push(item.department)
      }
    })
    return department.sort()
  }
  let departmentArray = filterCrew(crew)

  return (
    <CastomBox>
      <BackgroundBlur>
        <MoviePanel className="Wrapper">
          <MovieOverviewSection
            component="img"
            image={`https://image.tmdb.org/t/p/original/${location.state.poster}`}
          />
          <MovieInform>
            <MovieTitle>
              <Typography
                onClick={goBack}
                sx={{ cursor: "pointer" }}
                variant="h4"
              >
                {location.state.title} ({location.state.year})
              </Typography>
              
            </MovieTitle>
            <CastomButton onClick={goBack}>Back to main</CastomButton>
          </MovieInform>
        </MoviePanel>
      </BackgroundBlur>
      <CastAndCrew className="Wrapper">
        <Cast>
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            Cast{" "}
            <Typography sx={{ color: "lightgray" }} component="span">
              ({cast.length})
            </Typography>
          </Typography>
          {cast.map((item) => (
            <CastAndCrewCard
              profile_path={item.profile_path}
              name={item.name}
              character={item.character}
            />
          ))}
        </Cast>
        <Crew>
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            Crew{" "}
            <Typography sx={{ color: "lightgray" }} component="span">
              ({crew.length})
            </Typography>
          </Typography>
          {departmentArray.map((item) => {
            return(
              <div>

                <Typography variant="h6">{item}</Typography>
                {crew.filter(filterItem => filterItem.department === item).map(crewItem => (
                  <CastAndCrewCard
                  profile_path={crewItem.profile_path}
                  name={crewItem.name}
                  job={crewItem.job}
                />
                ))}
              </div>
              
              
            )
          }
            
          )}
        </Crew>
      </CastAndCrew>
    </CastomBox>
  );
};
/*
.map(crewItem => (
                  <CastAndCrewCard
                  profile_path={crewItem.profile_path}
                  name={crewItem.name}
                  character={crewItem.character}
                />
                ))
                */
export default CastAndCrew;
