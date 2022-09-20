import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BasicPagination = (props) => {
  //console.log(props)
  return (
    <Stack onClick={(event, value)=> console.log(event.target.innerText)} sx={{ margin: "0 auto", minWidth: "350px" }} spacing={2}>
      <Pagination
        sx={{ margin: "0 auto" }}
        count={props.totalPages}
        page={props.currentPage}
        
        onChange={(event) => props.pageChanger(+event.target.innerText)}
        //onChange={(event, value) => props.pageChanger(event, value)}
        color={"primary"}
      />
    </Stack>
  );
};

export default BasicPagination;
