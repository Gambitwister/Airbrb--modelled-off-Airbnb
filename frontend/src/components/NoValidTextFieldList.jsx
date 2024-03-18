import React from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const ValidTextFieldList = (props) => {
  return (
    <div>
      <TextField
        multiline={props.multiline}
        label={props.label}
        onChange={(event) => {
          if (props.isNumb) {
            const regex = /^[0-9\b]+$/;
            if (event.target.value === '' || regex.test(event.target.value)) {
              const oldList = [...props.state];
              oldList[props.index] = event.target.value;
              props.setFn(oldList);
            }
          } else {
            const oldList = [...props.state];
            oldList[props.index] = event.target.value;
            props.setFn(oldList);
          }
        }}
        value={props.state[props.index]}
      />
    </div>
  );
};

export default ValidTextFieldList;

ValidTextFieldList.propTypes = {
  isNumb: PropTypes.bool,
  index: PropTypes.number,
  multiline: PropTypes.bool,
  setFn: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  state: PropTypes.array,
  children: PropTypes.string,
};
