import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { MdBookmarkBorder } from 'react-icons/md';
import { Link as GatsbyLink } from 'gatsby';

const topLinkStyles = css`
  margin-top: 12px;
  span {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
  }
`;

const Link = styled(GatsbyLink)`
  display: block;
  height: 38px;
  line-height: 38px;
  width: 100%;
  align-items: center;
  color: ${props => (props.selected ? '#0099e5' : '#4c555a')};
  background: ${props => (props.selected ? 'rgba(219, 239, 249, 0.6)' : 'transparent')};
  font-weight: ${props => (props.selected ? '600' : '500')};
  text-decoration: none;
  padding: ${props => `0 8px 0 ${props.level * 15}px`};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => (props.level === 1 ? topLinkStyles : null)}
  span {
    height: 28px;
    line-height: 28px;
    text-align: left;
  }
  svg {
    display: ${props => (props.level === 3 ? 'inline' : 'none')};
    margin-right: 8px;
    vertical-align: middle;
  }
  strong {
    font-size: 14px;
    display: ${props => (props.level === 2 ? 'inline' : 'none')};
    margin-right: 8px;
  }
  &:hover {
    color: #0099e5;
    background: rgba(219, 239, 249, 0.6);
  }
`;

function MenuItem({ index, level, onClick, text, path, selected }) {
  return (
    <Link
      level={level}
      to={path}
      title={text}
      selected={selected}
    >
      <MdBookmarkBorder />
      {index > 0 && <strong>{`${index}. `}</strong>}
      <span>{text}</span>
    </Link>
  );
}

MenuItem.propTypes = {
  index: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  selected: PropTypes.bool,
};

MenuItem.defaultProps = {
  selected: false,
  index: null,
};

export default MenuItem;
