import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const ImgWrapper = styled('div')({
  width: '200px',
  maxHeight: '250px'
})

export default function MediaCard(props) {
  console.log(props.data)

  return (
    <Card sx={{ minWidth: 200, maxHeight: 300, marginRight: '15px' }}>
      <ImgWrapper>
        <img src = {`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`} width = "100%" />
      </ImgWrapper>
      {/* <CardMedia
        component="img"
        height="80%"
        width='100%'
        image={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
        alt={props.data.title}
      /> */}
      <CardContent sx={{ marginTop: '-20px'}}>
        <Typography gutterBottom variant="span" component="div" sx  = {{fontWeight: 'bold', color: 'red'}}>
          {props.data.title}
        </Typography>
        {props.data.release_date}
      </CardContent>
    </Card>
  );
}
