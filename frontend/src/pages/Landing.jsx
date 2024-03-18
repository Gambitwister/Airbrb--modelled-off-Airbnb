import React from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import LandingListCard from '../components/LandingListCard';

const Landing = (props) => {
  const [listings, setListings] = React.useState([]);
  const publishedListings = [];

  const fetchListing = async (listId) => {
    const response = await fetch(`http://localhost:5005/listings/${listId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      return data.listing.published;
    }
  };

  const fetchListings = async () => {
    const response = await fetch('http://localhost:5005/listings', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    setListings(data.listings);
  };

  React.useEffect(() => {
    fetchListings();
  }, []);

  React.useEffect(async () => {
    console.log('hihii');
    for (let i = 0; i < listings.length; i++) {
      const curList = listings[i];
      const published = await fetchListing(curList.id);
      console.log(published);
      if (published) {
        const info = {
          id: curList.id,
          title: curList.title,
          thumbnail: curList.thumbnail,
          reviews: curList.reviews.length,
        };
        publishedListings.push(info);
      }
    }
  }, [listings]);

  const divStyle = {
    margin: '20px',
  };

  return (
    <div style={divStyle}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={5}>
          <Typography variant='h5' color='textSecondary'>
            All Listings:
          </Typography>
        </Grid>
      </Grid>
      {publishedListings.length === 0 && (
        <>
          <Typography
            variant='h6'
            color='textSecondary'
            sx={{ fontStyle: 'italic' }}
          >
            There are not any published listings!
          </Typography>
        </>
      )}
      {publishedListings.length > 0 &&
        publishedListings.map((info, index) => {
          // setEditId(listing.id);
          return (
            <>
              <LandingListCard info={info}></LandingListCard>
            </>
          );
        })}
    </div>
  );
};

export default Landing;

Landing.propTypes = {
  token: PropTypes.string,
  children: PropTypes.string,
};
