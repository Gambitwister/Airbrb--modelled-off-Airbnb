import React from 'react';
import { Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import ValidTextField from '../components/ValidTextField';

const Login = (props) => {
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [allCorrect, setAllCorrect] = React.useState(false);

  React.useEffect(() => {
    if (email !== '' && pwd !== '') {
      setAllCorrect(true);
      return;
    }
    setAllCorrect(false);
  }, [email, pwd]);

  const loginBtn = async () => {
    const response = await fetch('http://localhost:5005/user/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      props.setTokenFn(data.token);
      localStorage.setItem('token', data.token);
    }
  };

  const divStyle = {
    marginTop: '50px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={divStyle}>
      <Typography variant='h3' color='textSecondary' gutterBottom>
        Welcome
      </Typography>
      {/* <TextField
        id='outlined-basic'
        label='Email'
        variant='outlined'
        required={true}
        onBlur={(e) => {
          if (e.target.value === '') {
            alert('Email cannot be empty!');
            return;
          }
          setEmail(e.target.value);
        }}
      /> */}
      <ValidTextField
        label='Email'
        setFn={setEmail}
        state={email}
        // value='email'
      ></ValidTextField>
      {/* <TextField
        id='outlined-basic'
        label='Password'
        variant='outlined'
        type={'password'}
        required={true}
        onBlur={(e) => {
          if (e.target.value === '') {
            alert('Password cannot be empty!');
            return;
          }
          setPwd(e.target.value);
        }}
      /> */}
      <ValidTextField
        label='Password'
        setFn={setPwd}
        state={pwd}
        // value='pwd'
      ></ValidTextField>
      <br />
      <Button
        color='primary'
        sx={{ mt: 2 }}
        disabled={!allCorrect}
        onClick={loginBtn}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;

Login.propTypes = {
  setTokenFn: PropTypes.func,
  children: PropTypes.string,
};
