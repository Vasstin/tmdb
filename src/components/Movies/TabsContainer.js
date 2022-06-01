import React from "react";

import TabPanelCard from "./Cards/TabPanelCard";
import { useHorizontalScroll } from "../../utility/horizontalScroll";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import "./TabsContainer.css";
import Typography from "@mui/material/Typography";
import TrailerCard from "./Cards/TrailerCard";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const scrollTab = useHorizontalScroll();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          ref={scrollTab}
          sx={{
            p: 3,
            display: "flex",
            flexWrap: "nowrap",
            overflow: "scroll",
            "::-webkit-scrollbar": {
              height: "10px",
            },
            "::-webkit-scrollbar-thumb": {
              height: "5px",
              backgroundColor: "#032541",
              borderRadius: "10px",
            },
            "::-webkit-scrollbar-corner": {
              background: "rgba(0,0,0,0)",
            },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Heading = styled(Typography)({
  margin: "20px 20px 0 20px",
  fontWeight: "bold",
  fontSize: "20px",
});

const Wrapper = styled(Box)({
  display: "flex",
  marginLeft: "100px",
});

const TabsContainer = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //console.log(props)
  /*style={{background: `linear-gradient(rgba(3, 37, 65, 0.5) 0%, rgba(1, 180, 228, 0.5)100%), url(https://image.tmdb.org/t/p/original/${props.trandingImage})`}}*/
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
        marginBottom: "50px",
        background: `${props.bgImage}`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${props.bpos}`,
        color: `${props.color}`,
        backgroundSize: `${props.bsize}`,
        transition: "all 0.5s",
      }}
    >
      <Wrapper>
        <Heading>{props.title}</Heading>
        <Box
          sx={{
            marginTop: "13px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ color: `${props.color}` }}
              label={props.tabLabelOne}
              {...a11yProps(0)}
            />
            <Tab
              sx={{ color: `${props.color}` }}
              label={props.tabLabelTwo}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
      </Wrapper>
      <TabPanel value={value} index={0}>
        {props.tabOne.map((item) =>
          props.trailerCard ? (
            <TrailerCard
              type={"movie"}
              key={item.id}
              data={item}
              handleNowPlayingId={props.handleNowPlayingId}
              scale={props.scale}
              toggleModal={props.toggleModal}
            />
          ) : (
            <Link key={item.id} to={`/${item.media_type ?? props.moviesType}/${item.id}`} state={item.media_type ?? props.moviesType}>
              <TabPanelCard data={item} />
            </Link>
          )
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {props.tabTwo.map((item) =>
          props.trailerCard ? (
            <TrailerCard
              type={"tv"}
              key={item.id}
              data={item}
              handleNowPlayingId={props.handleNowPlayingId}
              toggleModal={props.toggleModal}
            />
          ) : (
            <Link key={item.id} to={`/${item.media_type ?? props.tvsType}/${item.id}`} state={item.media_type ?? props.tvsType}>
              <TabPanelCard data={item} />
            </Link>
          )
        )}
      </TabPanel>
    </Box>
  );
};
export default TabsContainer;
