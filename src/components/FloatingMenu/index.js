import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import Trigger from './Trigger';
import Button from './Button';

const Menu = styled.ul`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: fit-content;
  list-style: none;
`;

function FloatingMenu({ slideSpeed, className, isOpen, spacing, children }) {
  const childrenWithProps = React.Children.map(children, (child, index) =>
    React.cloneElement(child, {
      isOpen,
      slideSpeed,
      index,
      spacing,
    })
  );

  return (
    <>
      <Menu className={className}>{childrenWithProps}</Menu>
      <ReactTooltip effect="solid" />
    </>
  );
}

FloatingMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  slideSpeed: PropTypes.number,
  spacing: PropTypes.number,
  isOpen: PropTypes.bool,
};

FloatingMenu.defaultProps = {
  className: '',
  slideSpeed: 500,
  isOpen: false,
  spacing: 8,
};

FloatingMenu.Trigger = Trigger;
FloatingMenu.Button = Button;

export default FloatingMenu;
