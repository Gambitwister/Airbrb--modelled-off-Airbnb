import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Stack } from '@mui/system';
import NoValidTextField from '../components/NoValidTextField';
import WhiteLink from '../components/BlueLink';
import { handleImgRead } from '../components/handleImgRead';

const EditListingTwo = (props) => {
  const [price, setPrice] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState(['']);
  const [propertyType, setPropertyType] = React.useState('');
  const [bathNumb, setBathNumb] = React.useState('');
  const [amenities, setAmenities] = React.useState('');

  const divStyle = {
    margin: '20px',
  };

  const storeData = () => {
    const listing = JSON.parse(localStorage.getItem('listing'));
    if (price !== '') {
      listing.price = price;
    }
    if (!thumbnail.includes('') && thumbnail.length > 0) {
      // get this array by:
      // JSON.parse(localStorage.getItem('thumbnail'))
      listing.thumbnail = thumbnail;
    }
    if (propertyType !== '') {
      listing.metadata.propertyType = propertyType;
    }
    if (bathNumb !== '') {
      listing.metadata.bathNumb = bathNumb;
    }
    if (amenities !== '') {
      listing.metadata.amenities = amenities;
    }
    localStorage.setItem('listing', JSON.stringify(listing));
  };

  return (
    <div style={divStyle}>
      <Typography variant='h5' color='textSecondary' gutterBottom>
        More details:
      </Typography>
      <Box sx={{ width: '60%' }}>
        <Stack spacing={2}>
          <NoValidTextField
            label='Price/night'
            setFn={setPrice}
            state={price}
            isNumb={true}
          ></NoValidTextField>
          <NoValidTextField
            label='Property-Type'
            setFn={setPropertyType}
            state={propertyType}
          ></NoValidTextField>
          <NoValidTextField
            label='bathNumb'
            setFn={setBathNumb}
            state={bathNumb}
            isNumb={true}
          ></NoValidTextField>
          <NoValidTextField
            label='amenities'
            setFn={setAmenities}
            state={amenities}
            multiline={true}
          ></NoValidTextField>
          <Button
            variant='contained'
            component='label'
            onChange={async (event) => {
              const b64List = await handleImgRead(event);
              setThumbnail(b64List);
            }}
          >
            Upload thumbnail
            <input type='file' multiple hidden accept='image/*' />
          </Button>
        </Stack>
        <Button sx={{ mt: 2, mr: 2 }} color='secondary' variant='outlined'>
          <WhiteLink to={'edit-listing'}>Previous</WhiteLink>
        </Button>
        <Button
          sx={{ mt: 2, width: '20px' }}
          color='secondary'
          variant='outlined'
          onClick={storeData}
        >
          <WhiteLink to={'edit-listing-three'}>Next</WhiteLink>
        </Button>
      </Box>
    </div>
  );
};

export default EditListingTwo;

EditListingTwo.propTypes = {
  token: PropTypes.string,
  children: PropTypes.string,
};
