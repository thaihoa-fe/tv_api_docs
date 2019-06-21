import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Header, { HEIGHT } from './Header';
import GlobalStyle from './GlobalStyle';

const Wrapper = styled.div`
  margin: 0;
  padding-top: ${HEIGHT}px;
  min-height: 100vh;
  box-sizing: border-box;
`;

function Layout({ children, hasTextSearching, hasAPIExplorerLink, hasDocLink, docsVersion }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <GlobalStyle />
          <Header
            siteTitle={data.site.siteMetadata.title}
            hasAPIExplorerLink={hasAPIExplorerLink}
            hasDocLink={hasDocLink}
            hasTextSearching={hasTextSearching}
            docsVersion={docsVersion}
          />
          <Wrapper>{children}</Wrapper>
        </>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  hasTextSearching: PropTypes.bool,
  hasAPIExplorerLink: PropTypes.bool,
  hasDocLink: PropTypes.bool,
  docsVersion: PropTypes.string.isRequired,
};

Layout.defaultProps = {
  hasTextSearching: false,
  hasAPIExplorerLink: false,
  hasDocLink: false,
};

Layout.HEADER_HEIGHT = HEIGHT;

export default Layout;
