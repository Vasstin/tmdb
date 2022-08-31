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
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      return navigate("/search");
    }
  };
  // useEffect(()=>{
  //   fetch(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${searchValue}&page=1&include_adult=false`)
  //     .then(res=>res.json())

  // },[searchValue])

  const isError = useSelector((state) => {
    return state.search.isError;
  });

  const dispatch = useDispatch();

  const searchData = useSelector((state) => {
    return state.search.search.data;
  });
  const onFetchSearchData = useCallback(
    () => dispatch(searchActions.fetchSearchData(searchValue)),
    [dispatch, searchValue]
  );

  useEffect(() => {
    onFetchSearchData(searchValue);
  }, [onFetchSearchData, searchValue]);

  return (
    <Box>
      <AppBar
        id="test"
        ref={hideHeader}
        position="fixed"
        sx={{ top: "0", transition: "all 0.5s" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </NavWrapper>
          <Button color="primary" variant="contained">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
