import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import ValidTextFieldList from '../components/ValidTextFieldList';
import WhiteLink from '../components/BlueLink';
import { useHistory } from 'react-router-dom';

const EditListingThree = (props) => {
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

  const edit = async (args) => {
    const response = await fetch(
      `http://localhost:5005/listings/${localStorage.getItem('editId')}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify(args),
      }
    );
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
          <WhiteLink to={'edit-listing-two'}>Previous</WhiteLink>
        </Button>
        <Button
          sx={{ width: '20px' }}
          color='secondary'
          variant='outlined'
          disabled={!allFilled}
          onClick={() => {
            const listing = JSON.parse(localStorage.getItem('listing'));
            const metadata = {
              propertyType: listing.metadata.propertyType,
              bathNumb: listing.metadata.bathNumb,
              amenities: listing.metadata.amenities,
              bedNumb: bedNumb,
              bedroomType: bedroomType,
            };
            const args = {
              title: listing.title,
              address: listing.address,
              price: listing.price,
              thumbnail: listing.thumbnail,
              metadata: metadata,
            };
            edit(args);
          }}
        >
          <WhiteLink to={'my-listings'}>Create</WhiteLink>
        </Button>
      </Box>
    </div>
  );
};

export default EditListingThree;

EditListingThree.propTypes = {
  token: PropTypes.string,
  children: PropTypes.string,
};
