import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  color: ${props => props.iconColor};
  background: ${props => props.background};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 6px 0px, rgba(0, 0, 0, 0.16) 0px 2px 32px 0px;
  font-weight: bold;
  outline: none;
  padding: 0;
  cursor: pointer;
  -webkit-user-drag: none;
`;

const IconWrapper = styled.div`
  display: flex;
  position: absolute;
  transition: transform 300ms;
  transform: rotate(${props => (props.isOpen ? 180 : 0)}deg);
`;

function Trigger({ iconResting, iconActive, isOpen, ...props }) {
  return (
    <Wrapper {...props}>
      <IconWrapper isOpen={isOpen}>{isOpen ? iconActive : iconResting}</IconWrapper>
    </Wrapper>
  );
}

Trigger.propTypes = {
  iconResting: PropTypes.node.isRequired,
  iconActive: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  size: PropTypes.number,
};

Trigger.defaultProps = {
  isOpen: false,
  size: 56,
};

export default Trigger;
