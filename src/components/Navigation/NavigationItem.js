import React from "react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const NavigationItem = (props) => {
  const NavItem = styled(Link)({
    textDecoration: "none",
    color: "inherit",
    marginRight: "15px",
    fontWeight: "bold",
  });

  return (
    <NavItem typography="inherit" to={props.link}>
      <Typography>{props.children}</Typography>
    </NavItem>
  );
};

export default NavigationItem;
