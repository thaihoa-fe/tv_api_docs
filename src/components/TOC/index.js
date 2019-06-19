import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MenuItem from './MenuItem';

const StyledUL = styled.ul`
  margin: 0;
  padding: 0 8px;
  list-style: none;
`;

const StyledOL = styled.ol`
  margin: 0;
  padding: 0 8px;
  list-style: none;
  counter-reset: c-counter;
  > li {
    display: list-item;
    position: relative;
    counter-increment: c-counter;
    &::before {
      position: absolute;
      top: 3px;
      left: 20px;
      content: counter(c-counter) '.';
      font-family: Arial;
      font-size: 15px;
      color: #4c555a;
    }
    &:hover::before {
      color: #0099e5;
    }

    a {
      margin-left: 42px;
    }
  }
`;

const Menu = ({ level, children }) => {
  if (level === 2) {
    return <StyledOL>{children}</StyledOL>;
  }
  return <StyledUL>{children}</StyledUL>;
};

Menu.propTypes = {
  level: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

function drawListItem(categories, onClick, level) {
  return (
    <Menu level={level}>
      {categories.map(c => {
        if (c.children && c.children.length) {
          return (
            <MenuItem key={c.path} text={c.text} isOpen={c.isOpen} level={level} onClick={onClick}>
              {drawListItem(c.children, onClick, level + 1, true)}
            </MenuItem>
          );
        }

        return (
          <MenuItem key={c.path} text={c.text} isOpen={c.isOpen} level={level} onClick={onClick} />
        );
      })}
    </Menu>
  );
}

function Sidebar({ categories, onClick }) {
  return drawListItem(categories, onClick, 1);
}

Sidebar.propTypes = {
  categories: PropTypes.arrayOf({}),
  onClick: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  categories: [],
};

export default Sidebar;
