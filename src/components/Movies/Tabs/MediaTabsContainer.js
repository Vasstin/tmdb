import React, { useState, useEffect } from "react";
import MediaCard from "./MediaCard";
import { useHorizontalScroll } from "../../../utility/horizontalScroll";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import "./MediaTabsContainer.css";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import ModalImage from "../../People/Cards/ModalImage";

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
const MediaTabsContainer = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openImage, setOpenImage] = useState(false);
  const [imageIndex, setImageIndex] = useState();
  const [tabsType, setTabsType] = useState("backdrops");

  const toggleModalImage = (index, type) => {
    setImageIndex(index);
    setOpenImage(!openImage);
    setTabsType(type);
  };
  
  function imgSwitcher(cardtype) {
    if (cardtype === "backdrops") {
      return props.tabOne;
    } else if (cardtype === "logos") {
      return props.tabTwo;
    } else if (cardtype === "posters") {
      return props.tabThree;
    }
    return props.tabOne;
  }
  /*style={{background: `linear-gradient(rgba(3, 37, 65, 0.5) 0%, rgba(1, 180, 228, 0.5)100%), url(https://image.tmdb.org/t/p/original/${props.trandingImage})`}}*/
  return (
    <Box
      className="Wrapper"
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
      <Wrapper sx={props.cardType === "photo" ? {margin: 0}: null}>
        <Heading sx={props.cardType === "photo" ? {marginLeft: 0}: null}>{props.title}</Heading>
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
            {props.cardType === "photo" ? null : ( <Tab
              sx={{ color: `${props.color}` }}
              label={props.tabLabelTwo}
              {...a11yProps(1)}
            />)}
            {props.cardType === "photo" ? null : (<Tab
              sx={{ color: `${props.color}` }}
              label={props.tabLabelThree}
              {...a11yProps(2)}
            />)}
           
            
          </Tabs>
        </Box>
      </Wrapper>
      <TabPanel value={value} index={0}>
        {props.tabOne.length > 0 ? (
          props.tabOne.map((item, index) => (
            <MediaCard
              toggleModalImage={toggleModalImage}
              path={item.file_path}
              index={index}
              cardType={props.cardType ?? "backdrops"}
              key={index}
            />
          ))
        ) : (
          <Skeleton
            sx={{ borderRadius: "10px" }}
            variant="rectangular"
            width={"100%"}
            height={380}
          />
        )}
      </TabPanel>
      {props.cardType === "photo" ? null : (
        <Box>
          <TabPanel value={value} index={1}>
            {props.tabTwo.length > 0 ? (
              props.tabTwo.map((item, index) => (
                <MediaCard
                  toggleModalImage={toggleModalImage}
                  path={item.file_path}
                  index={index}
                  cardType={"logos"}
                  key={index}
                />
              ))
            ) : (
              <Skeleton
                sx={{ borderRadius: "10px" }}
                variant="rectangular"
                width={"100%"}
                height={380}
              />
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {props.tabThree.length > 0 ? (
              props.tabThree.map((item, index) => (
                <MediaCard
                  toggleModalImage={toggleModalImage}
                  path={item.file_path}
                  index={index}
                  cardType={"posters"}
                  key={index}
                />
              ))
            ) : (
              <Skeleton
                sx={{ borderRadius: "10px" }}
                variant="rectangular"
                width={"100%"}
                height={380}
              />
            )}
          </TabPanel>
        </Box>
      )}

      <ModalImage
        image={imgSwitcher(tabsType)[imageIndex] ?? []}
        typeTab={tabsType}
        toggle={openImage}
        toggleModal={toggleModalImage}
        idMovies={props.id}
      />
    </Box>
  );
};
export default MediaTabsContainer;
