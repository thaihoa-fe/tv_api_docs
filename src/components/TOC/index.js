import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withCategories from './withCategories';
import MenuItem from './MenuItem';

const Menu = styled.div`
  width: 100%;
  font-size: 14px;
  overflow-x: scroll;
  padding-top: 32px;
  padding-bottom: 38px;
`;

export function drawListItem(categories) {
  let counter = 0;
  let currentDepth;

  return categories.map(c => {
    if (currentDepth !== 2 && c.depth === 2) {
      counter = 0;
      currentDepth = 2;
    }
    if (currentDepth === 2) {
      if (c.depth === 2) {
        counter++;
      } else if (c.depth === 1) {
        currentDepth = null;
      }
    }

    const actualPath = c.depth === 1 ? c.path : `${c.path}#${c.id}`;

    return (
      <MenuItem
        key={actualPath}
        path={actualPath}
        index={counter}
        text={c.value}
        level={c.depth}
        selected={c.selected}
      />
    );
  });
}

export function PureTOC({ categories, className }) {
  if (!categories) {
    return null;
  }
  return <Menu className={className}>{drawListItem(categories)}</Menu>;
}

PureTOC.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
};

PureTOC.defaultProps = {
  categories: null,
  className: null,
};

export default withCategories(PureTOC);
