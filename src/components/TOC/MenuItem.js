import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GoTriangleRight } from 'react-icons/go';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

const Link = styled.li`
  display: block;
  > a {
    height: 28px;
    line-height: 28px;
    text-align: left;
    color: #4c555a;
    display: flex;
    align-items: center;
    text-decoration: none;
    svg {
      margin-right: 6px;
    }
    &:hover {
      color: #0099e5;
    }
  }
`;

const LevelOneIcon = styled(GoTriangleRight)`
  transform: rotate(${props => (props.isOpen ? '90deg' : '0deg')});
`;

const Icon = ({ level, isOpen }) => {
  if (level === 1) {
    return <LevelOneIcon isOpen={isOpen} />;
  }
  if (level === 3) {
    return isOpen ? <MdBookmark /> : <MdBookmarkBorder />;
  }
  return null;
};

Icon.propTypes = {
  level: PropTypes.number.isRequired,
  isOpen: PropTypes.bool,
};

Icon.defaultProps = {
  isOpen: false,
};

function MenuItem({ children, level, onClick, text, path, isOpen }) {
  return (
    <Link level={level}>
      <a
        href={`#${path}`}
        onClick={evt => {
          onClick(evt, path);
        }}
        title={text}
      >
        <Icon level={level} isOpen={isOpen} />
        <span>{text}</span>
      </a>
      {children}
    </Link>
  );
}

MenuItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  children: PropTypes.node,
  isOpen: PropTypes.bool,
};

MenuItem.defaultProps = {
  isOpen: false,
  children: null,
};

export default MenuItem;
