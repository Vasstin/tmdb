import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as movieActions from "../../store/movies/actions/index";
import * as peopleActions from "../../store/peoples/actions/index";
import { styled } from "@mui/material/styles";
import Pagination from "../../utility/pagination";
import { Box, LinearProgress } from "@mui/material";
import TabContainerCard from "../Movies/Tabs/TabContainerCard";

const Tvs = (props) => {
  const currentPage = useSelector((state) => {
    return state.movies.popular.tvs.currentPage;
  });
  const [page, setPage] = useState(
    +window.localStorage.getItem("tvPage") || currentPage
  );

  const pageChanger = (value) => {
    setPage(value);
  };

  const dispatch = useDispatch();

  const onFetchPopularTvs = useCallback(
    (page) => dispatch(movieActions.fetchPopularTvs(page)),
    [dispatch]
  );
  const onSetTvsCurrentPage = useCallback(
    (page) => dispatch(movieActions.setTvsCurrentPage(page)),
    [dispatch]
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(true), 500);
    window.localStorage.setItem("tvPage", page);
    onFetchPopularTvs(page);
    onSetTvsCurrentPage(page);
    setIsLoading(false);
    window.localStorage.removeItem("peoplePage");
    window.localStorage.removeItem("moviePage");
    dispatch(peopleActions.cleanupPeopleCurrentPage());
    dispatch(movieActions.cleanupPopularMoviesCurrentPage());

    // return () => {
    //   window.localStorage.removeItem("moviePage");
    // };
  }, [onFetchPopularTvs, onSetTvsCurrentPage, dispatch, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, currentPage]);

  const tvs = useSelector((state) => {
    return state.movies.popular.tvs.tvs;
  });

  const totalPages = useSelector((state) => {
    return state.movies.popular.tvs.totalPages;
  });

  const TvsBox = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    marginTop: "120px",
    padding: "30px ",
    justifyContent: "space-between",
  });

  return (
    <Box>
      {tvs.length > 0 && isLoading === true ? (
        <TvsBox className="Wrapper">
          {tvs.map((tvs) => (
            <TabContainerCard
              key={tvs.id}
              data={tvs}
              cardType="movieCard"
              to={`/tv/${tvs.id}`}
              linkState={"tv"}
            />
          ))}
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            pageChanger={pageChanger}
          />
        </TvsBox>
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

export default Tvs;
