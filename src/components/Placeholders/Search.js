import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useCallback } from "react";

import * as searchActions from "../../store/search/actions/index";
import { useNavigate } from "react-router-dom";
import Pagination from "../../utility/pagination";
import { Box, LinearProgress } from "@mui/material";
import TabContainerCard from "../Movies/Tabs/TabContainerCard";
import ShortActorCard from "../People/Cards/ShortActorCard";
import { styled } from "@mui/material/styles";

const Search = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isError = useSelector((state) => {
    return state.search.isError;
  });

  const searchData = useSelector((state) => {
    return state.search.search.data;
  });

  const currentPage = useSelector((state) => {
    return state.search.search.currentPage;
  });
  const totalPages = useSelector((state) => {
    return state.search.search.totalPages;
  });

  // const searchValue = useSelector((state)=> {
  //   return state.search.search.value
  // })

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(

    +window.localStorage.getItem("searchPage") || 1
  );
  const pageChanger = (value) => {
    console.log(value, "pageChanger");
    setPage(value);
  };

  
  const onSetSearchCurrentPage = useCallback(
    (page) => dispatch(searchActions.setSearchCurrentPage(page)),
    [dispatch]
    );
    
    useEffect(() => {
      setPage(currentPage);
      //window.localStorage.setItem("searchPage", currentPage);
    //window.localStorage.setItem("searchPage", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (isError) {
      navigate("/error");
    }
    setTimeout(() => setIsLoading(true), 500);
    onSetSearchCurrentPage(page);
    //localStorage.setItem("searchPage", currentPage)
    // onFetchSearchData(searchValue);
    setIsLoading(false);
    window.localStorage.removeItem("peoplePage");
    window.localStorage.removeItem("tvPage");
    //window.localStorage.setItem("searchPage", page);
    // dispatch(peopleActions.cleanupPeopleCurrentPage());
    // dispatch(movieActions.cleanupPopularTvsCurrentPage());

    // return () => {
    //   window.localStorage.removeItem("moviePage");
    // };
  }, [dispatch, isError, onSetSearchCurrentPage, navigate, page,]);

  const SearchBox = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    marginTop: "120px",
    padding: "30px ",
    justifyContent: "space-between",
  });
  return (
    <Box>
      {searchData.length > 0 && isLoading === true ? (
        <SearchBox className="Wrapper" sx={{ display: "flex" }}>
          {searchData.map((item) => {
            if (item.media_type === "person") {
              return (
                <ShortActorCard
                  key={item.id}
                  data={item}
                  cardType="actorCard"
                  to={`/actor/${item.id}`}
                  linkState={"movie"}
                />
              );
            } else {
              return (
                <TabContainerCard
                  key={item.id}
                  data={item}
                  cardType="movieCard"
                  to={`/${item.media_type}/${item.id}`}
                  linkState={item.media_type}
                />
              );
            }
          })}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageChanger={pageChanger}
          />
        </SearchBox>
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

export default Search;
