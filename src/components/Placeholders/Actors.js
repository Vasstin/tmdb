import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/peoples/actions/peoples";
import { styled } from "@mui/material/styles";
import Pagination from "../../utility/pagination";
import { Box, LinearProgress } from "@mui/material";
import ShortActorCard from '../People/Cards/ShortActorCard'

const Actors = (props) => {
  const currentPage = useSelector((state) => {
    return state.peoples.popular.currentPage;
  });
  const [page, setPage] = useState(
    +window.localStorage.getItem("peoplePage") || currentPage
  );

  const pageChanger = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();

  const onFetchPeoplePopular = useCallback(
    (page) => dispatch(actions.fetchPeoplePopular(page)),
    [dispatch]
  );
  // const onSetMoviesCurrentPage = useCallback(
  //   (page) => dispatch(actions.setMoviesCurrentPage(page)),
  //   [dispatch]
  // );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(true), 500);
    window.localStorage.setItem("peoplePage", page);
    onFetchPeoplePopular(page);
    // onSetMoviesCurrentPage(page);
    setIsLoading(false);

    // return () => {
    //   window.localStorage.removeItem("moviePage");
    // };
  }, [onFetchPeoplePopular, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, currentPage]);

  const people = useSelector((state) => {
    return state.peoples.popular.people
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
