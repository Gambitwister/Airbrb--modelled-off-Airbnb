import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';

const LandingListCard = (props) => {
  const info = props.info;

  return (
    <>
      <Card sx={{ maxWidth: 345, mt: 2, mb: 2 }}>
        <CardMedia
          component='img'
          alt='thumbnail'
          height='140'
          image={info.thumbnail[0]}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h4'
            component='div'
            color='textSecondary'
            sx={{ fontStyle: 'italic' }}
          >
            {info.title}
          </Typography>
          <Typography gutterBottom variant='h7' component='div'>
            Reviews: {info.reviews}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default LandingListCard;

LandingListCard.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
  children: PropTypes.string,
  info: PropTypes.object,
};
