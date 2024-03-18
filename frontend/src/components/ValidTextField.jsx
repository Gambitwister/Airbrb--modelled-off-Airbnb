import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const ValidTextField = (props) => {
  const [clicked, setClicked] = React.useState(false);
  return (
    <div>
      <TextField
        required={true}
        multiline={props.multiline}
        type={props.type === 'password' ? 'password' : 'text'}
        label={props.label}
        onChange={(event) => {
          setClicked(true);
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
        error={props.state === '' && clicked}
        helperText={props.state === '' && clicked ? 'Empty field!' : ' '}
      />
    </div>
  );
};

export default ValidTextField;

ValidTextField.propTypes = {
  isNumb: PropTypes.bool,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  setFn: PropTypes.func,
  label: PropTypes.string,
  state: PropTypes.string,
  children: PropTypes.string,
};
