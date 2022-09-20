import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as movieActions from "../../store/movies/actions/index";
import * as peopleActions from "../../store/peoples/actions/index";
import { styled } from "@mui/material/styles";
import Pagination from "../../utility/pagination";
import { Box, LinearProgress } from "@mui/material";
import ShortActorCard from "../People/Cards/ShortActorCard";
import { useNavigate } from "react-router-dom";

const Actors = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentPage = useSelector((state) => {
    return state.peoples.popular.currentPage;
  });

  const isError = useSelector((state) => {
    return state.peoples.isError;
  });

  const [page, setPage] = useState(
    +window.localStorage.getItem("peoplePage") || currentPage
  );

  const pageChanger = (value) => {
    setPage(value);
  };

  const onFetchPeoplePopular = useCallback(
    (page) => dispatch(peopleActions.fetchPeoplePopular(page)),
    [dispatch]
  );
  const onSetPeopleCurrentPage = useCallback(
    (page) => dispatch(peopleActions.setPeopleCurrentPage(page)),
    [dispatch]
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      navigate("/error");
    }
    setTimeout(() => setIsLoading(true), 500);
    window.localStorage.setItem("peoplePage", page);
    onFetchPeoplePopular(page);
    onSetPeopleCurrentPage(page);
    setIsLoading(false);
    window.localStorage.removeItem("moviePage");
    window.localStorage.removeItem("tvPage");
    dispatch(movieActions.cleanupPopularMoviesCurrentPage());
    dispatch(movieActions.cleanupPopularTvsCurrentPage());
    // return () => {
    //   window.localStorage.removeItem("peoplePage");
    // };
  }, [
    onFetchPeoplePopular,
    onSetPeopleCurrentPage,
    dispatch,
    page,
    isError,
    navigate,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, currentPage]);

  const people = useSelector((state) => {
    return state.peoples.popular.people;
  });

  const totalPages = useSelector((state) => {
    return state.peoples.popular.totalPages;
  });

  const ActorsBox = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    marginTop: "120px",
    padding: "30px ",
    justifyContent: "space-between",
  });

  return (
    <Box>
      {people.length > 0 && isLoading === true ? (
        <ActorsBox className="Wrapper">
          {people.map((people) => (
            <ShortActorCard
              key={people.id}
              data={people}
              cardType="actorCard"
              to={`/actor/${people.id}`}
              linkState={"movie"}
            />
          ))}
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            pageChanger={pageChanger}
          />
        </ActorsBox>
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

export default Actors;
