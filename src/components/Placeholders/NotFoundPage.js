import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const NotFoundPage = props => {
  return(
    <Box sx={{height: '1500px'}}>
      <Typography sx={{textAlign:'center', paddingTop: '500px'}} variant="h1">{'Page Not Found'}</Typography>
    </Box>
  )
};

export default NotFoundPage;
