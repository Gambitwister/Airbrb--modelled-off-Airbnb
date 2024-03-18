import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Stack } from '@mui/system';
import NoValidTextField from '../components/NoValidTextField';
import WhiteLink from '../components/BlueLink';

const EditListing = (props) => {
  const [title, setTitle] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [post, setPost] = React.useState('');
  const [country, setCountry] = React.useState('');

  const divStyle = {
    margin: '20px',
  };

  const storeData = () => {
    const listing = JSON.parse(localStorage.getItem('listing'));
    const localAddr = listing.address;
    const address = {
      street: street === '' ? localAddr.street : street,
      city: city === '' ? localAddr.city : city,
      state: state === '' ? localAddr.state : state,
      post: post === '' ? localAddr.post : post,
      country: country === '' ? localAddr.country : country,
    };
    if (title !== '') {
      listing.title = title;
    }
    listing.address = address;
    localStorage.setItem('listing', JSON.stringify(listing));
  };

  return (
    <div style={divStyle}>
      <Typography variant='h5' color='textSecondary' gutterBottom>
        Edit the listing:
      </Typography>
      <Box sx={{ width: '60%' }}>
        <Stack spacing={2}>
          <NoValidTextField
            label='Title'
            setFn={setTitle}
            state={title}
          ></NoValidTextField>
          <Typography variant='h6' color='textSecondary' gutterBottom>
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <NoValidTextField
                label='Street'
                setFn={setStreet}
                state={street}
              ></NoValidTextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <NoValidTextField
                label='City'
                setFn={setCity}
                state={city}
              ></NoValidTextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <NoValidTextField
                label='State'
                state={state}
                setFn={setState}
              ></NoValidTextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <NoValidTextField
                label='Post'
                setFn={setPost}
                state={post}
              ></NoValidTextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <NoValidTextField
                label='Country'
                setFn={setCountry}
                state={country}
              ></NoValidTextField>
            </Grid>
          </Grid>
        </Stack>
        <Button
          sx={{ width: '20px', mt: 2 }}
          color='secondary'
          variant='outlined'
          onClick={storeData}
        >
          <WhiteLink to={'edit-listing-two'}>Next</WhiteLink>
        </Button>
      </Box>
    </div>
  );
};

export default EditListing;

EditListing.propTypes = {
  token: PropTypes.string,
  children: PropTypes.string,
};
