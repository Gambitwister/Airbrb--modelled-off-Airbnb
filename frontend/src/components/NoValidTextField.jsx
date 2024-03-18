import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const NoValidTextField = (props) => {
  return (
    <div>
      <TextField
        multiline={props.multiline}
        type={props.type === 'password' ? 'password' : 'text'}
        label={props.label}
        onChange={(event) => {
          if (props.isNumb) {
            const regex = /^[0-9\b]+$/;
            if (event.target.value === '' || regex.test(event.target.value)) {
              props.setFn(event.target.value);
            }
          } else {
            props.setFn(event.target.value);
          }
        }}
        value={props.state === null ? '' : props.state}
      />
    </div>
  );
};

export default NoValidTextField;

NoValidTextField.propTypes = {
  isNumb: PropTypes.bool,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  setFn: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  state: PropTypes.string,
  children: PropTypes.string,
};
