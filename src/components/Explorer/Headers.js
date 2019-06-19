import React from 'react';
import PropTypes from 'prop-types';

import KeyValueGrid from './KeyValueGrid';

function Headers({ headers, onChange }) {
  return <KeyValueGrid items={headers} onChange={onChange} />;
}

Headers.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
};

Headers.defaultProps = {
  headers: [],
  onChange: () => {},
};

export default Headers;
