import React, { useEffect, useState, useCallback } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import NavigationItem from "./NavigationItem";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import navLogo from "../../../assets/img/nav-logo.svg";
import { useHideHeader } from "../../../utility/hideHeader";
import { useSelector, useDispatch } from "react-redux";
import * as searchActions from "../../../store/search/actions/index";
import ModalAuth from "../../Auth/ModalAuth";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavList = styled(Stack)({
  marginLeft: "30px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const LogoLink = styled(Link)({
  paddingTop: "5px",
  textDecoration: "none",
  color: "inherit",
});

const NavWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "800px",
});

export default function SearchAppBar(props) {
  const hideHeader = useHideHeader();
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      return navigate("/search" /*{state: {value: searchValue}}*/);
    }
  };
  // useEffect(()=>{
  //   fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchValue}&page=1&include_adult=false`)
  //     .then(res=>res.json())

  // },[searchValue])

  // const isError = useSelector((state) => {
  //   return state.search.isError;
  // });

  const dispatch = useDispatch();

  // const searchData = useSelector((state) => {
  //   return state.search.search.data;
  // });
  const currentPage = useSelector((state) => {
    return state.search.search.currentPage;
  });
  const searchValue = useSelector((state) => {
    return state.search.search.value;
  });
  const lastSearch = useSelector((state) => {
    return state.search.search.lastSearch;
  });
  const [navSearchValue, setNavSearchValue] = useState(
    window.localStorage.getItem("searchValue") || searchValue
  );

  const onFetchSearchData = useCallback(
    () => dispatch(searchActions.fetchSearchData(navSearchValue, currentPage)),
    [dispatch, navSearchValue, currentPage]
  );
  const onSetSearchValue = useCallback(
    () => dispatch(searchActions.setSearchValue(navSearchValue)),
    [dispatch, navSearchValue]
  );

  useEffect(() => {
    window.localStorage.setItem("searchValue", navSearchValue);
    if (lastSearch === searchValue) {
      onSetSearchValue(navSearchValue);
    } else {
      //window.localStorage.setItem("searchPage", 1);
      dispatch(searchActions.setSearchCurrentPage(1));
      dispatch(searchActions.setLastSearch(searchValue));
    }
    onFetchSearchData(navSearchValue, currentPage);
  }, [
    onFetchSearchData,
    onSetSearchValue,
    navSearchValue,
    searchValue,
    currentPage,
    lastSearch,
    dispatch,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <Box>
      <ModalAuth toggle={open} toggleModal={toggleModal} idMovies={props.id} />

      <AppBar
        id="test"
        ref={hideHeader}
        position="fixed"
        sx={{ top: "0", transition: "all 0.5s" }}
      >
        {/* <Box  className="Wrapper" sx={{   width: '100%'}}> */}
          <Toolbar  className="Wrapper" sx={{ width: '100%',  display: "flex", justifyContent: "space-between",  }}>
            <NavWrapper>
              <LogoLink to="/">
                <img width={150} src={navLogo} alt="nav-logo" />
              </LogoLink>
              <NavList>
                <NavigationItem link="/movie">Movies</NavigationItem>
                <NavigationItem link="/tv">Tvs</NavigationItem>
                <NavigationItem link="/actor">Actors</NavigationItem>
              </NavList>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onKeyPress={handleKeyPress}
                  onChange={(event) => setNavSearchValue(event.target.value)}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </NavWrapper>
            <Button
              onClick={() => toggleModal()}
              color="primary"
              variant="contained"
            >
              Login
            </Button>
          </Toolbar>
        {/* </Box> */}
      </AppBar>
    </Box>
  );
}
