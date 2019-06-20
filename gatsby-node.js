/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /(react-data-grid|react-ace|brace)/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'contents' })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}


exports.createPages = async function ({ actions, graphql }) {
  try {
    const { data } = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                index
              }
            }
          }
        }
      }
    `);
    data.allMarkdownRemark.edges.forEach(edge => {
      const slug = edge.node.fields.slug;

      actions.createPage({
        path: slug,
        component: require.resolve('./src/templates/doc.js'),
        context: {
          slug,
        }
      });

      if (edge.node.frontmatter.index) {
        /* redirect from home page to doc page which has `index` field is true */
        actions.createRedirect({
          fromPath: '/',
          toPath: slug,
          isPermanent: true
        });
      }
    });
  } catch(e) {
    console.error(`Error when creating pages: ${e.toString()}`);
  }
}