import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const WhiteLink = (props) => {
  return (
    <Link
      style={{ color: 'rgb(140, 186, 232)', textDecoration: 'none' }}
      to={'/' + props.to}
      state={{}}
    >
      {props.children}
    </Link>
  );
};

export default WhiteLink;

WhiteLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.string,
};
