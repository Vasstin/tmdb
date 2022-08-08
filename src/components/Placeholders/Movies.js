import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/movies/actions/movies";
import { styled } from "@mui/material/styles";

import { Box } from "@mui/material";
import TabContainerCard from "../Movies/Tabs/TabContainerCard";

const Movies = (props) => {
  const dispatch = useDispatch();

  const onFetchPopularMovies = useCallback(
    () => dispatch(actions.fetchPopularMovies()),
    [dispatch]
  );

  useEffect(() => {
    onFetchPopularMovies();
  }, [onFetchPopularMovies]);

  const movies = useSelector((state) => {
    return state.movies.popular.movies;
  });

  const MoviesBox = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: "120px",
    padding: "30px ",
    justifyContent:'space-between'
  })

  return (
    <MoviesBox className="Wrapper">
      {movies.map((movies) => (
        <TabContainerCard data={movies} cardType='movieCard' to={`/movie/${movies.id}`} linkState={'movie'}/>
      ))}
    </MoviesBox>
  );
};

export default Movies;
