const proxy = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: 'Credit Insight Service API Documentation',
    description: 'Credit Insight Service API Documentation',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/styles/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
  ],
  developMiddleware: app => {
    app.use(
      '/proxy-api/',
      proxy({
        target: 'http://staging-api.trustingsocial.com',
        pathRewrite: {
          '/proxy-api/': '',
        },
      })
    );
  },
};
