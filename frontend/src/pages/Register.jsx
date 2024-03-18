import React from 'react';
import { TextField, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import ValidTextField from '../components/ValidTextField';

const Register = (props) => {
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [confirmPwd, setConfirmPwd] = React.useState('');
  const [name, setName] = React.useState('');
  const [allCorrect, setAllCorrect] = React.useState(false);

  React.useEffect(() => {
    if (email !== '' && pwd !== '' && pwd === confirmPwd && name !== '') {
      setAllCorrect(true);
      return;
    }
    setAllCorrect(false);
  }, [email, pwd, confirmPwd, name]);

  const loginBtn = async () => {
    const response = await fetch('http://localhost:5005/user/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
        name: name,
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
      <ValidTextField
        label='Name'
        setFn={setName}
        state={name}
      ></ValidTextField>
      <ValidTextField
        label='Email'
        setFn={setEmail}
        state={email}
      ></ValidTextField>
      <ValidTextField
        label='Password'
        type='password'
        setFn={setPwd}
        state={pwd}
      ></ValidTextField>
      <div>
        <TextField
          id='outlined-basic'
          label='Confirm-Password'
          variant='outlined'
          type={'password'}
          required={true}
          onBlur={(e) => {
            setConfirmPwd(e.target.value);
          }}
          error={confirmPwd === '' || confirmPwd !== pwd}
          helperText={confirmPwd !== pwd ? 'Password not same' : ' '}
        />
      </div>
      <br />
      <Button
        color='primary'
        sx={{ mt: 2 }}
        disabled={!allCorrect}
        onClick={loginBtn}
      >
        Register
      </Button>
    </div>
  );
};

export default Register;

Register.propTypes = {
  setTokenFn: PropTypes.func,
  children: PropTypes.string,
};
