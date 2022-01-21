import React from "react";
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const NavigationItem = props => {
  const NavItem = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    marginRight: '15px',
    fontWeight: 'bold'
  })

  return (
    <NavItem to={props.link}>{props.children}</NavItem>
  )
};

export default NavigationItem;
