import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
} from '@mui/material';
import WhiteLink from './WhiteLink';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function HeadBar(props) {
  const history = useHistory();

  const logout = async () => {
    await fetch('http://localhost:5005/user/auth/logout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    });
    localStorage.removeItem('token');
    props.setTokenFn(null);
    history.push('/');
  };

  return (
    <div>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='relative'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <WhiteLink to={''}>AirBrB</WhiteLink>
            </Typography>
            {!props.token && (
              <>
                <Button color='inherit'>
                  <WhiteLink to={'login'}>Login</WhiteLink>
                </Button>
                <Button color='inherit'>
                  <WhiteLink to={'register'}>Register</WhiteLink>
                </Button>
              </>
            )}
            {props.token && (
              <>
                <Button color='inherit' onClick={logout}>
                  Logout
                </Button>
                <Button color='inherit'>
                  <WhiteLink to={'all-listings'}>All listings</WhiteLink>
                </Button>
                <Button color='inherit'>
                  <WhiteLink to={'my-listings'}>My listings</WhiteLink>
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default HeadBar;

HeadBar.propTypes = {
  token: PropTypes.string,
  setTokenFn: PropTypes.func,
  children: PropTypes.string,
};
