import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import { MdChevronRight } from 'react-icons/md';

const topLinkStyles = css`
  &.active {
    background: #fff;
    border-color: #e6ecf1;
  }
`;
const childLinkStyles = css`
  border-left: 1px solid #e6ecf1;
`;

const topTextStyles = css`
  color: #5c6975;

  .active > & {
    color: #3884ff;
  }
`;

const ExpandIcon = styled(MdChevronRight)`
  color: #9daab6;
  font-size: 18px;
  transition: all 0.2s linear;
  .active & {
    transform: rotate(90deg);
  }
  :hover & {
    color: #5c6975;
  }
`;

const Link = styled(GatsbyLink)`
  padding: 7px 24px 7px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  border: 1px solid transparent;
  border-width: 1px 0px 1px 1px;
  border-style: solid solid solid;
  border-color: transparent transparent transparent;
  margin-left: ${props => (props.level - 1) * 16}px;
  ${props => (props.level === 1 ? topLinkStyles : null)}
  ${props => (props.level !== 1 ? childLinkStyles : null)}
  &:hover {
    background-color: rgb(230, 236, 241);
    border-color: rgb(230, 236, 241) rgb(230, 236, 241) rgb(230, 236, 241);
  }
`;

const Text = styled.span`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  color: #9daab6;

  ${props => (props.level === 1 ? topTextStyles : null)}
`;

function MenuItem({ level, text, path, onClick }) {
  return (
    <Link onClick={onClick} level={level} to={path} title={text} activeClassName="active">
      <Text level={level}>{text}</Text>
      {level === 1 && <ExpandIcon />}
    </Link>
  );
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

MenuItem.defaultProps = {
  onClick: () => {},
};

export default MenuItem;
