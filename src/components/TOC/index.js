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

export function drawListItem(categories, onClick, activePath) {
  return categories.map(c => {
    const actualPath = c.depth === 1 ? c.path : `${c.path}#${c.id}`;
    const isActive = c.path === activePath;

    if (!isActive && c.depth !== 1) {
      return null;
    }

    return (
      <MenuItem
        onClick={onClick}
        key={actualPath}
        path={actualPath}
        text={c.value}
        level={c.depth}
        selected={c.selected}
      />
    );
  });
}

export function PureTOC({ categories, className, onClick, history }) {
  if (!categories) {
    return null;
  }
  return (
    <Menu className={className}>
      {drawListItem(categories, onClick, history.location.pathname)}
    </Menu>
  );
}

PureTOC.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  onClick: PropTypes.func,
  history: PropTypes.shape({}).isRequired,
};

PureTOC.defaultProps = {
  categories: null,
  className: null,
  onClick: () => {},
};

export default withCategories(PureTOC);
