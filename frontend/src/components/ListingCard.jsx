import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
} from '@mui/material';

const ListingCard = (props) => {
  const [title, setTitle] = React.useState('');
  const [propertyType, setPropertyType] = React.useState('');
  const [bedNumb, setBedNumb] = React.useState('');
  const [bathNumb, setBathNumb] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState(['']);
  const [rating, setRating] = React.useState('');
  const [reviews, setReviews] = React.useState('');
  const [price, setPrice] = React.useState('');

  React.useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    const response = await fetch(`http://localhost:5005/listings/${props.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      const listing = data.listing;
      setTitle(listing.title);
      setPropertyType(listing.metadata.propertyType);
      setBedNumb(
        listing.metadata.bedNumb.reduce((a, b) => Number(a) + Number(b))
      );
      setBathNumb(listing.metadata.bathNumb);
      // note that 'thumbnail' is an array
      setThumbnail(listing.thumbnail);
      //   initialize rating as ZERO
      setRating(0);
      setReviews(listing.reviews);
      setPrice(listing.price);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, mt: 2, mb: 2 }}>
        <CardMedia
          component='img'
          alt='thumbnail'
          height='140'
          image={thumbnail[0]}
        />
        <CardContent>
          <Rating name='read-only' value={rating} readOnly />
          <Typography
            gutterBottom
            variant='h4'
            component='div'
            color='textSecondary'
            sx={{ fontStyle: 'italic' }}
          >
            {title}
          </Typography>
          <Typography gutterBottom variant='h7' component='div'>
            Property-Type: {propertyType}
          </Typography>
          <Typography gutterBottom variant='h7' component='div'>
            Bed-Number: {bedNumb}
          </Typography>
          <Typography gutterBottom variant='h7' component='div'>
            Bath-Number: {bathNumb}
          </Typography>
          <Typography gutterBottom variant='h7' component='div'>
            Reviews: {reviews}
          </Typography>
          <Typography gutterBottom variant='h7' component='div'>
            Price: {price}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ListingCard;

ListingCard.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
  children: PropTypes.string,
};
