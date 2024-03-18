import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Stack } from '@mui/system';
import ValidTextField from '../components/ValidTextField';
import WhiteLink from '../components/BlueLink';
import { handleImgRead } from '../components/handleImgRead';
import { useHistory } from 'react-router-dom';

const NewListingTwo = (props) => {
  const [price, setPrice] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState(['']);
  const [propertyType, setPropertyType] = React.useState('');
  const [bathNumb, setBathNumb] = React.useState('');
  const [amenities, setAmenities] = React.useState('');
  const [allFilled, setAllFilled] = React.useState(false);
  const history = useHistory();

  const divStyle = {
    margin: '20px',
  };

  const storeData = () => {
    localStorage.setItem('price', price);
    // get this array by:
    // JSON.parse(localStorage.getItem('thumbnail'))
    localStorage.setItem('thumbnail', JSON.stringify(thumbnail));
    localStorage.setItem('propertyType', propertyType);
    localStorage.setItem('bathNumb', bathNumb);
    localStorage.setItem('amenities', amenities);
    history.push('/new-listing-three');
  };

  React.useEffect(() => {
    if (
      price &&
      thumbnail.length > 0 &&
      !thumbnail.includes('') &&
      propertyType &&
      bathNumb &&
      amenities
    ) {
      setAllFilled(true);
    } else {
      setAllFilled(false);
    }
  }, [price, thumbnail, propertyType, bathNumb, amenities]);

  return (
    <div style={divStyle}>
      <Typography variant='h5' color='textSecondary' gutterBottom>
        More details:
      </Typography>
      <Box sx={{ width: '60%' }}>
        <Stack spacing={2}>
          <ValidTextField
            label='Price/night'
            setFn={setPrice}
            state={price}
            isNumb={true}
          ></ValidTextField>
          <ValidTextField
            label='Property-Type'
            setFn={setPropertyType}
            state={propertyType}
          ></ValidTextField>
          <ValidTextField
            label='bathNumb'
            setFn={setBathNumb}
            state={bathNumb}
            isNumb={true}
          ></ValidTextField>
          <ValidTextField
            label='amenities'
            setFn={setAmenities}
            state={amenities}
            multiline={true}
          ></ValidTextField>
          <Button
            variant='contained'
            component='label'
            onChange={async (event) => {
              const b64List = await handleImgRead(event);
              // for (let i = 0; i < b64List.length; i++) {
              //   setThumbnail((oldList) => [...oldList, b64List[i]]);
              // }
              setThumbnail(b64List);
            }}
          >
            Upload thumbnail
            <input type='file' multiple hidden accept='image/*' />
          </Button>
        </Stack>
        <Button sx={{ mt: 2, mr: 2 }} color='secondary' variant='outlined'>
          <WhiteLink to={'new-listing'}>Previous</WhiteLink>
        </Button>
        <Button
          sx={{ mt: 2, width: '20px' }}
          color='secondary'
          variant='outlined'
          disabled={!allFilled}
          onClick={storeData}
        >
          Next
          {/* <WhiteLink to={'new-listing-three'}>Next</WhiteLink> */}
        </Button>
      </Box>
    </div>
  );
};

export default NewListingTwo;

NewListingTwo.propTypes = {
  token: PropTypes.string,
  children: PropTypes.string,
};
