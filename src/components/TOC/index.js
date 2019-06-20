import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { normalizeHeading } from './utils';
import MenuItem from './MenuItem';

const Menu = styled.div`
  width: 100%;
  font-size: 14px;
  overflow-x: scroll;
`;

export function drawListItem(categories, onClick) {
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
        onClick={onClick}
      />
    );
  });
}

function TOC({ onClick }) {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort:  { fields: frontmatter___priority, order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
            htmlAst
          }
        }
      }
    }
  `);

  const categories = allMarkdownRemark.edges
    .reduce((result, edge) => {
      return result.concat(normalizeHeading(edge.node));
    }, []);
  return <Menu>{drawListItem(categories, onClick)}</Menu>;
}

TOC.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

TOC.defaultProps = {
  className: null,
  onClick: () => {},
};

export default TOC;
