import React from 'react';
import { Typography } from '@mui/material';
import HeadBar from './HeadBar';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MyListings from '../pages/MyListings';
import NewListing from '../pages/NewListing';
import NewListingTwo from '../pages/NewListingTwo';
import NewListingThree from '../pages/NewListingThree';
import EditListing from '../pages/EditListing';
import EditListingTwo from '../pages/EditListingTwo';
import EditListingThree from '../pages/EditListingThree';
import GoLive from '../pages/GoLive';
import Landing from '../pages/Landing';

import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

function Site() {
  const [token, setToken] = React.useState('');
  const history = useHistory();
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (token !== null) {
      if (pathname === '/login' || pathname === '/register') {
        history.push('/dashboard');
      }
    }
  }, [token]);

  return (
    <div>
      <HeadBar token={token} setTokenFn={setToken} />

      <Switch>
        <Route path='/dashboard'>
          <Typography variant='h4' sx={{ m: 2 }}>
            Hi there!
          </Typography>
          <Typography variant='h5' sx={{ m: 2 }}>
            Welcome to AirBrB!
          </Typography>
        </Route>
        <Route path='/login'>
          <Login setTokenFn={setToken}></Login>
        </Route>
        <Route path='/register'>
          <Register setTokenFn={setToken}></Register>
        </Route>
        <Route path='/all-listings'>All Listings</Route>
        <Route path='/my-listings'>
          <MyListings token={token}></MyListings>
        </Route>
        <Route path='/new-listing'>
          <NewListing token={token}></NewListing>
        </Route>
        <Route path='/new-listing-two'>
          <NewListingTwo token={token}></NewListingTwo>
        </Route>
        <Route path='/new-listing-three'>
          <NewListingThree token={token}></NewListingThree>
        </Route>
        <Route path='/edit-listing'>
          <EditListing token={token}></EditListing>
        </Route>
        <Route path='/edit-listing-two'>
          <EditListingTwo token={token}></EditListingTwo>
        </Route>
        <Route path='/edit-listing-three'>
          <EditListingThree token={token}></EditListingThree>
        </Route>
        <Route path='/go-live'>
          <GoLive token={token}></GoLive>
        </Route>
        <Route path='/'>
          <Landing token={token}></Landing>
        </Route>
      </Switch>
    </div>
  );
}

export default Site;
