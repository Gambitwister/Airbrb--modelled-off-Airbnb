import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import ValidTextFieldList from '../components/ValidTextFieldList';
import WhiteLink from '../components/BlueLink';
import { useHistory } from 'react-router-dom';

const NewListingThree = (props) => {
  const [bedNumb, setBedNumb] = React.useState(['']);
  const [bedroomType, setBedroomType] = React.useState(['']);
  const [allFilled, setAllFilled] = React.useState(false);

  const history = useHistory();

  const divStyle = {
    margin: '20px',
  };

  const moreRooms = () => {
    setBedNumb([...bedNumb, '']);
    setBedroomType([...bedroomType, '']);
  };

  const newListing = async (args) => {
    const response = await fetch('http://localhost:5005/listings/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify(args),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      history.push('/my-listings');
    }
  };

  React.useEffect(() => {
    if (!bedNumb.includes('') && !bedroomType.includes('')) {
      setAllFilled(true);
    } else {
      setAllFilled(false);
    }
  }, [bedNumb, bedroomType]);

  return (
    <div style={divStyle}>
      <Typography variant='h5' color='textSecondary' gutterBottom>
        Bedroom details:
      </Typography>
      <Box sx={{ width: '60%' }}>
        <Grid container spacing={1}>
          {bedNumb.map((numb, index) => {
            return (
              <>
                <Grid item xs={12} md={6}>
                  <ValidTextFieldList
                    label='bedNumb'
                    setFn={setBedNumb}
                    state={bedNumb}
                    index={index}
                    isNumb={true}
                  ></ValidTextFieldList>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ValidTextFieldList
                    label='bedroomType'
                    setFn={setBedroomType}
                    state={bedroomType}
                    index={index}
                  ></ValidTextFieldList>
                </Grid>
              </>
            );
          })}
        </Grid>
        <Button variant='contained' sx={{ mb: 2 }} onClick={moreRooms}>
          More rooms
        </Button>
        <Button sx={{ mr: 2 }} color='secondary' variant='outlined'>
          <WhiteLink to={'new-listing-two'}>Previous</WhiteLink>
        </Button>
        <Button
          sx={{ width: '20px' }}
          color='secondary'
          variant='outlined'
          disabled={!allFilled}
          onClick={() => {
            const metadata = {
              propertyType: localStorage.getItem('propertyType'),
              bathNumb: localStorage.getItem('bathNumb'),
              amenities: localStorage.getItem('amenities'),
              bedNumb: bedNumb,
              bedroomType: bedroomType,
            };
            newListing({
              title: localStorage.getItem('title'),
              address: JSON.parse(localStorage.getItem('address')),
              price: localStorage.getItem('price'),
              thumbnail: JSON.parse(localStorage.getItem('thumbnail')),
              metadata: metadata,
            });
          }}
        >
          <WhiteLink to={'my-listings'}>Create</WhiteLink>
        </Button>
      </Box>
    </div>
  );
};

export default NewListingThree;

NewListingThree.propTypes = {
  token: PropTypes.string,
  children: PropTypes.string,
};
