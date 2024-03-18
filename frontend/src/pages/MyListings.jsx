import React from 'react';
import { Button, Grid, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';
import BlueLink from '../components/BlueLink';
import ListingCard from '../components/ListingCard';
import DelListingBtn from '../components/DelListingBtn';
import { useHistory } from 'react-router-dom';

const MyListings = (props) => {
  const [listings, setListings] = React.useState([]);
  const history = useHistory();

  const jumpToEdit = async (editId) => {
    const response = await fetch(`http://localhost:5005/listings/${editId}`, {
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
      localStorage.setItem('listing', JSON.stringify(listing));
      localStorage.setItem('editId', editId);
    }
    history.push('/edit-listing');
  };

  const jumpToLive = (liveId) => {
    localStorage.setItem('liveId', liveId);
    history.push('/go-live');
  };

  const fetchListings = async () => {
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    });
    const data = await response.json();
    setListings(data.listings);
  };

  React.useEffect(() => {
    fetchListings();
  }, []);

  const divStyle = {
    margin: '20px',
  };

  return (
    <div style={divStyle}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={5}>
          <Typography variant='h5' color='textSecondary'>
            My Listings:
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Button variant='outlined'>
            <BlueLink to={'new-listing'}>New Listing</BlueLink>
          </Button>
        </Grid>
      </Grid>
      {listings.length === 0 && (
        <>
          <Typography
            variant='h6'
            color='textSecondary'
            sx={{ fontStyle: 'italic' }}
          >
            You do not have any listings!
          </Typography>
        </>
      )}
      {listings.length > 0 &&
        listings.map((listing, index) => {
          // setEditId(listing.id);
          return (
            <>
              <ListingCard id={listing.id}></ListingCard>
              <DelListingBtn
                id={listing.id}
                setFn={setListings}
                state={listings}
                token={props.token}
              ></DelListingBtn>
              <IconButton
                aria-label='edit'
                color='primary'
                onClick={() => jumpToEdit(listing.id)}
              >
                <EditIcon />
              </IconButton>
              <Button
                variant='contained'
                onClick={() => jumpToLive(listing.id)}
              >
                Go Live
              </Button>
            </>
          );
        })}
    </div>
  );
};

export default MyListings;

MyListings.propTypes = {
  token: PropTypes.string,
  children: PropTypes.string,
};
