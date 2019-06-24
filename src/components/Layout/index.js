import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import Header, { HEIGHT, MOBILE_HEIGHT, SIDEBAR_WIDTH } from './Header';
import GlobalStyle from './GlobalStyle';
import { LAPTOP_SCREEN } from '../../constants/screens';

const Wrapper = styled.div`
  margin: 0;
  padding-top: ${HEIGHT}px;
  min-height: 100vh;
  box-sizing: border-box;
  @media (max-width: ${LAPTOP_SCREEN}) {
    padding-top: ${MOBILE_HEIGHT}px;
  }
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
Layout.MOBILE_HEADER_HEIGHT = MOBILE_HEIGHT;
Layout.SIDEBAR_WIDTH = SIDEBAR_WIDTH;

export default Layout;
