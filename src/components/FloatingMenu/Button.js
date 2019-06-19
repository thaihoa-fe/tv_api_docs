import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.li`
  background: ${props => props.background};
  display: flex;
  border: none;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 6px 0px, rgba(0, 0, 0, 0.16) 0px 2px 32px 0px;
  cursor: pointer;
  outline: none;
  padding: 0;
  -webkit-user-drag: none;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transition: all ${props => props.slideSpeed}ms;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: ${props => props.spacing}px;
  color: ${props => props.iconColor};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
`;

function Button({ icon, index, size, spacing, tooltip, isOpen, onClick, ...props }) {
  const offsetX = (size + spacing) * index * -1;
  const offsetY = 0;

  return (
    <Wrapper
      {...props}
      size={size}
      spacing={spacing}
      isOpen={isOpen}
      onClick={isOpen ? onClick : null}
      style={{
        transform: `translate(${isOpen ? 0 : -offsetX}px, ${isOpen ? 0 : -offsetY}px)`,
      }}
      data-tip={tooltip}
    >
      {icon}
    </Wrapper>
  );
}

Button.propTypes = {
  icon: PropTypes.node.isRequired,
  iconColor: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  size: PropTypes.number,
  spacing: PropTypes.number,
  tooltip: PropTypes.string,
};

Button.defaultProps = {
  index: 1,
  iconColor: 'black',
  size: 40,
  spacing: 0,
  tooltip: '',
  isOpen: false,
  onClick: null,
};

export default Button;
