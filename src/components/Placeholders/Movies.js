import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as movieActions from "../../store/movies/actions/index";
import * as peopleActions from "../../store/peoples/actions/index";
import { styled } from "@mui/material/styles";
import Pagination from "../../utility/pagination";
import { Box, LinearProgress } from "@mui/material";
import TabContainerCard from "../Movies/Tabs/TabContainerCard";
import { useNavigate } from "react-router-dom";

const Movies = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isError = useSelector((state) => {
    return state.movies.isError;
  });
  const currentPage = useSelector((state) => {
    return state.movies.popular.movies.currentPage;
  });
  const [page, setPage] = useState(
    +window.localStorage.getItem("moviePage") || currentPage
  );

  const pageChanger = (value) => {
    setPage(value);
  };

  const onFetchAllPopularMovies = useCallback(
    (page) => dispatch(movieActions.fetchAllPopularMovies(page)),
    [dispatch]
  );
  const onSetMoviesCurrentPage = useCallback(
    (page) => dispatch(movieActions.setMoviesCurrentPage(page)),
    [dispatch]
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      navigate("/error");
    }
    setTimeout(() => setIsLoading(true), 500);
    window.localStorage.setItem("moviePage", page);
    onFetchAllPopularMovies(page);
    onSetMoviesCurrentPage(page);
    setIsLoading(false);
    window.localStorage.removeItem("peoplePage");
    window.localStorage.removeItem("tvPage");
    dispatch(peopleActions.cleanupPeopleCurrentPage());
    dispatch(movieActions.cleanupPopularTvsCurrentPage());

    // return () => {
    //   window.localStorage.removeItem("moviePage");
    // };
  }, [
    onFetchAllPopularMovies,
    onSetMoviesCurrentPage,
    dispatch,
    isError,
    navigate,
    page,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, currentPage]);

  const movies = useSelector((state) => {
    return state.movies.popular.movies.allPopularMovies;
  });

  const totalPages = useSelector((state) => {
    return state.movies.popular.movies.totalPages;
  });

  const MoviesBox = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    marginTop: "120px",
    padding: "30px ",
    justifyContent: "space-between",
  });

  return (
    <Box>
      {movies.length > 0 && isLoading === true ? (
        <MoviesBox className="Wrapper">
          {movies.map((movies) => (
            <TabContainerCard
              key={movies.id}
              data={movies}
              cardType="movieCard"
              to={`/movie/${movies.id}`}
              linkState={"movie"}
            />
          ))}
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            pageChanger={pageChanger}
          />
        </MoviesBox>
      ) : (
        <LinearProgress
          sx={{
            marginTop: "120px",
            marginBottom: "1300px",
            transition: "all 1s",
          }}
          color={"primary"}
        />
      )}
    </Box>
  );
};

export default Movies;
