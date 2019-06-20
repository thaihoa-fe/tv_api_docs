import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Textfield from '@atlaskit/textfield';
import {
  FiSearch as MagnifyingIcon,
  FiExternalLink as ExternalIcon,
} from 'react-icons/fi';

import GlobalStyle from './GlobalStyle';
import logoIcon from '../../assets/logo.svg';

export const HEIGHT = 60;

const Wrapper = styled.header`
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  display: block;
  position: fixed;
  top: 0;
  transition: all 0.15s ease-out;
  width: 100%;
  z-index: 100;
  color: #4c555a;
  height: ${HEIGHT}px;
`;

const Main = styled.div`
  margin: 0 15px;
  display: flex;
  align-items: center;
  height: inherit;
  box-sizing: border-box;
`;

const LogoLink = styled(Link)`
  line-height: 30px;
  height: 30px;
`;

const SiteTitle = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  height: 30px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding-left: 20px;
  font-size: 18px;
  color: #1e2021;
`;

const RightPanel = styled.div`
  margin-left: auto;
  display: flex;
  flex-flow: row-reverse nowrap;
  align-items: center;
  a {
    text-decoration: none;
    color: inherit;
  }
  > * + * {
    margin-right: 28px;
  }
`;

const IconLink = styled.a`
  display: flex;
  flex-basis: auto;
  flex-shrink: 0;
  font-size: 1em;
  cursor: pointer;
  align-items: center;
  svg {
    margin-left: 8px;
    margin-bottom: 3px;
  }
  &:hover {
    color: #0099e5;
  }
`;

const SearchIcon = styled(MagnifyingIcon)`
  margin: 0 6px 0 0;
  padding: 0;
`;

const VersionLabel = styled.label`
  margin-top: 2px;
  margin-left: 20px;
  font-family: Arial;
`;

function Header({ siteTitle, docsVersion, hasDocLink, hasTextSearching, hasAPIExplorerLink }) {
  return (
    <Wrapper>
      <GlobalStyle bodyBgColor="#f5f7fa" />
      <Main>
        <LogoLink to="/" title="Trusting Social">
          <img src={logoIcon} alt="Trusting Social" />
        </LogoLink>
        <SiteTitle>{siteTitle}</SiteTitle>
        <VersionLabel>{docsVersion}</VersionLabel>
        <RightPanel>
          {hasAPIExplorerLink && (
            <IconLink
              href="/explorer"
              target="_blank"
              rel="noopener noreferrer"
              title="Open API explorer"
            >
              <span>API Explorer</span>
              <ExternalIcon />
            </IconLink>
          )}
          {hasDocLink && (
            <IconLink
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              title="Open API documentation"
            >
              <span>API Documentation</span>
              <ExternalIcon />
            </IconLink>
          )}
          {hasTextSearching && (
            <Textfield
              placeholder="Search..."
              elemAfterInput={<SearchIcon />}
              theme={(defaultThemeFn, themeProps) => {
                const { input, container } = defaultThemeFn(themeProps);
                return {
                  input: {
                    ...input,
                    boxSizing: 'content-box',
                    fontSize: '14px',
                  },
                  container,
                };
              }}
            />
          )}
        </RightPanel>
      </Main>
    </Wrapper>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  hasTextSearching: PropTypes.bool.isRequired,
  hasAPIExplorerLink: PropTypes.bool.isRequired,
  hasDocLink: PropTypes.bool.isRequired,
  docsVersion: PropTypes.string.isRequired,
};

export default Header;
