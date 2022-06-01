import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import footerLogo from "../assets/img/footer-logo.svg";

const Footer = (props) => {
  const CustomStack = styled(Stack)`
    display: flex;
    flex-direction: column;
    color: white;
  `;

  const Wrapper = styled(Box)`
    display: flex;
    width: 700px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  `;

  const CustomLink = styled(Link)(({ theme }) => ({
    color: "white",
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: "none",
  }));
  return (
    <Box height={150} sx={{ backgroundColor: "primary.main" }}>
      <Wrapper>
        <Link to="/">
          <img width={150} height={150} src={footerLogo} alt='footer-logo'/>
        </Link>
        <CustomStack>
          <CustomLink to="/">About us</CustomLink>
          <CustomLink to="/">About us</CustomLink>
          <CustomLink to="/">About us</CustomLink>
        </CustomStack>
        <CustomStack>
          <CustomLink to="/">Help</CustomLink>
          <CustomLink to="/">Help</CustomLink>
          <CustomLink to="/">Help</CustomLink>
        </CustomStack>
        <CustomStack>
          <CustomLink to="/">Contact</CustomLink>
          <CustomLink to="/">Contact</CustomLink>
          <CustomLink to="/">Contact</CustomLink>
        </CustomStack>
      </Wrapper>
    </Box>
  );
};

export default Footer;
