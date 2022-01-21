import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import NavigationItem from './NavigationItem';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const NavList= styled('ul')({
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  listStyle: 'none'
})

const LogoLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit'
})

const NavWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  width: '800px'
})

export default function SearchAppBar(props) {
  
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx = {{ display: 'flex', justifyContent: 'space-between'}}>
          <NavWrapper>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              <LogoLink to = '/'>TMDB</LogoLink>
            </Typography>
            <NavList>
              <NavigationItem link = '/movies'>Movies</NavigationItem>
              <NavigationItem link = '/serials'>Serials</NavigationItem>
              <NavigationItem link = '/actors'>Actors</NavigationItem>
            </NavList>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </NavWrapper>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
