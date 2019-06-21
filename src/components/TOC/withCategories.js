import React, { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { normalizeHeading } from './utils';

function useCategories(allMarkdownRemark) {
  return useMemo(() => {
    return allMarkdownRemark.edges.reduce(
      (result, edge) => [...result, ...normalizeHeading(edge.node)],
      []
    );
  }, [allMarkdownRemark]);
}

export default function withCategories(WrapedComponent) {
  return props => {
    const { allMarkdownRemark } = useStaticQuery(graphql`
      query {
        allMarkdownRemark(sort: { fields: frontmatter___priority, order: DESC }) {
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
    const categories = useCategories(allMarkdownRemark);
    return <WrapedComponent categories={categories} {...props} />;
  };
}
