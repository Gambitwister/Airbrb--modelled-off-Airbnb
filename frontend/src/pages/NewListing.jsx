import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Stack } from '@mui/system';
import ValidTextField from '../components/ValidTextField';
import WhiteLink from '../components/BlueLink';

const NewListing = (props) => {
  const [title, setTitle] = React.useState('');
  const [street, setStreet] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [post, setPost] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [allFilled, setAllFilled] = React.useState(false);

  const divStyle = {
    margin: '20px',
  };

  const storeData = () => {
    const address = {
      street: street,
      city: city,
      state: state,
      post: post,
      country: country,
    };
    localStorage.setItem('title', title);
    localStorage.setItem('address', JSON.stringify(address));
  };

  React.useEffect(() => {
    if (title && street && city && state && post && country) {
      setAllFilled(true);
    } else {
      setAllFilled(false);
    }
  }, [title, street, city, state, post, country]);

  return (
    <div style={divStyle}>
      <Typography variant='h5' color='textSecondary' gutterBottom>
        Create a new listing:
      </Typography>
      <Box sx={{ width: '60%' }}>
        <Stack spacing={2}>
          <ValidTextField
            label='Title'
            setFn={setTitle}
            state={title}
          ></ValidTextField>
          <Typography variant='h6' color='textSecondary' gutterBottom>
            Address
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ValidTextField
                label='Street'
                setFn={setStreet}
                state={street}
              ></ValidTextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidTextField
                label='City'
                setFn={setCity}
                state={city}
              ></ValidTextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidTextField
                label='State'
                state={state}
                setFn={setState}
              ></ValidTextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidTextField
                label='Post'
                setFn={setPost}
                state={post}
              ></ValidTextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <ValidTextField
                label='Country'
                setFn={setCountry}
                state={country}
              ></ValidTextField>
            </Grid>
          </Grid>
        </Stack>
        <Button
          sx={{ width: '20px' }}
          color='secondary'
          variant='outlined'
          disabled={!allFilled}
          onClick={storeData}
        >
          <WhiteLink to={'new-listing-two'}>Next</WhiteLink>
        </Button>
      </Box>
    </div>
  );
};

export default NewListing;

NewListing.propTypes = {
  token: PropTypes.string,
  children: PropTypes.string,
};
