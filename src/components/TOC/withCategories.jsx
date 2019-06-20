import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { normalizeHeading } from './utils';

export default function withCategories(WrapedComponent) {
    return (props) => {
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

        return <WrapedComponent categories={categories} {...props}/>
    };
};