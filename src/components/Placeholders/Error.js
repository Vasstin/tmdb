import React from "react";
import Alert from '@mui/material/Alert';

const Error = props => {
  return(
    <Alert sx={{marginTop: '120px',marginBottom: '1200px'}} severity="error">Something went wrong! Please try again later.</Alert>
  )
};

export default Error;
