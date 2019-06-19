import React from 'react';
import PropTypes from 'prop-types';

import KeyValueGrid from './KeyValueGrid';

function Params({ params, onChange }) {
  return <KeyValueGrid items={params} onChange={onChange} />;
}

Params.propTypes = {
  params: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
};

Params.defaultProps = {
  params: [],
  onChange: () => {},
};

export default Params;
