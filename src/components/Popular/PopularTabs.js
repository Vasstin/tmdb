import React, { useEffect, useState } from "react";
import ReuseTab from './Tabs/ReuseTab';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          flexWrap: 'nowrap', 
          overflow: 'scroll', 
          '::-webkit-scrollbar': 
            {
              height: '10px',
            },
          '::-webkit-scrollbar-thumb': 
            {
              height: '5px',
              boxShadow: 'inset 0 0 10px #42a5f5',
              borderRadius: '10px'
            }, 
        }}>
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Heading = styled('span')({
  margin: '20px 20px 0 20px',
  fontWeight: 'bold',
  fontSize: '20px'
})

const Wrapper = styled(Box)({
  display: 'flex',
  marginLeft: '100px',

})


export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=1fe2b672392f0b598d63021cfed3b95e&language=en-US&page=1')
      .then(response => response.json())
      .then(data => setMovies(data.results))
  }, [])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=1fe2b672392f0b598d63021cfed3b95e&language=en-US&page=1')
      .then(response => response.json())
      .then(data => setTv(data.results))
  }, [])

  return (
    <Box sx={{ width: '100%', margin: '0 auto', marginBottom: '50px' }}>
      <Wrapper>
        <Heading >What's Popular</Heading>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          marginTop: '13px',
          
        }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Movies" {...a11yProps(0)} />
            <Tab label="On TV" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Wrapper>
      <TabPanel value={value} index={0} >
        {movies.map(item => 
          <ReuseTab 
            key = {item.id}
            data = {item}
          />)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tv.map(item => 
          <ReuseTab
            key = {item.id}
            data = {item}
          />)}
      </TabPanel>
    </Box>
  );
}
