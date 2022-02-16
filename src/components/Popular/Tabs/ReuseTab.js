import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const ImgWrapper = styled(CardMedia)({
  
  minHeight: '300px',
  borderRadius: 'inherit',
  
})

const Content = styled(CardContent)({
  display: 'flex', 
  flexDirection: 'column', 
  fontSize: '13px',
//   '&::after': {
//     content: `${props.data.vote_average}`,
//     display: 'inline-block',
//     width: '15px',
//     height: '15px',
//     borderRadius: '7.5px',
//     backgroundColor: '#69b6d5',
// }
})

const VoteRate = styled('div')({
  position: 'relative',
  display: 'block',
  height: '30px',
  width: '30px',
  paddingTop: '3px',
  margin: '-15px 0 0 5px',
  backgroundColor: '#42a5f5',
  borderRadius: '50%',
  boxShadow: '0 0 15px #000',
  boxSizing: 'border-box',
  fontWeight: 'bold',
  textAlign: 'center',
})

export default function MediaCard(props) {
  //console.log(props.data)
  const getReleaseDate = (releaseDate) => {
    const date = new Date(`${releaseDate}`).toLocaleString('en', {month: 'short', day: 'numeric', year: 'numeric'})
    return date
  }

  getReleaseDate(props.data.release_date)

  return (
    <Card sx={{ minWidth: 200, maxHeight: 400, marginRight: '15px' }}>
      <ImgWrapper
        component="img"
        image={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
        alt={props.data.title}
      />
      <VoteRate>{props.data.vote_average}</VoteRate>
      <Content>
        <Typography gutterBottom variant="span" component="div" sx  = {{fontWeight: 'bold'}}>
          {props.data.title ?? props.data.name}
        </Typography>
        {getReleaseDate(props.data.release_date ?? props.data.first_air_date)}
      </Content>
    </Card>
  );
}
