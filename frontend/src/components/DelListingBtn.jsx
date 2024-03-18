import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const DelListingBtn = (props) => {
  const del = async () => {
    const response = await fetch(`http://localhost:5005/listings/${props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${props.token}`,
      },
    });
    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      props.setFn(props.state.filter((listing) => listing.id !== props.id));
    }
  };

  return (
    <>
      <IconButton aria-label='delete' color='primary' onClick={del}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default DelListingBtn;

DelListingBtn.propTypes = {
  token: PropTypes.string,
  id: PropTypes.number,
  setFn: PropTypes.func,
  state: PropTypes.array,
  children: PropTypes.string,
};
