import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import GlobalStyle from './GlobalStyle';
import { LAPTOP_SCREEN } from '../../constants/screens';
import logoIcon from '../../assets/logo.svg';

export const HEIGHT = 80;
export const MOBILE_HEIGHT = 60;
export const SIDEBAR_WIDTH = 273;

const Wrapper = styled.header`
  align-items: center;
  display: block;
  position: fixed;
  top: 0;
  transition: all 0.15s ease-out;
  width: 100%;
  z-index: 100;
  color: #4c555a;
  height: ${HEIGHT}px;
  box-shadow: 0 3px 8px 0 rgba(116, 129, 141, 0.1);
  border-bottom: 1px solid #d4dadf;
  background-color: #fff;

  @media (max-width: ${LAPTOP_SCREEN}) {
    display: flex;
    align-items: center;
    height: auto;
  }
`;

const Main = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
  box-sizing: border-box;
  width: 1448px;
  margin: 0 auto;

  @media (max-width: ${LAPTOP_SCREEN}) {
    width: 100%;
    justify-content: center;
    flex-direction: column;
    height: 60px;
  }
`;

const LogoWrap = styled.div`
  width: calc((100vw - 1448px) / 2 + ${SIDEBAR_WIDTH}px);
  max-width: 273px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: ${LAPTOP_SCREEN}) {
    width: auto;
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  padding-left: 16px;
`;

const Logo = styled.img`
  height: 37px;
  margin: 0;
  display: block;
`;

const SiteTitle = styled.div`
  border-left: 1px solid #d4dadf;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #1e2021;
  padding-left: 88px;
  @media (max-width: ${LAPTOP_SCREEN}) {
    display: none;
  }
`;

const VersionLabel = styled.label`
  margin-top: 2px;
  margin-left: 20px;
  font-family: Arial;
`;

function Header({ siteTitle, docsVersion }) {
  return (
    <Wrapper>
      <GlobalStyle bodyBgColor="#F5F7F9" />
      <Main>
        <LogoWrap>
          <LogoLink to="/" title="Trusting Social">
            <Logo src={logoIcon} alt="Trusting Social" />
          </LogoLink>
        </LogoWrap>
        <SiteTitle>
          {siteTitle}
          <VersionLabel>{docsVersion}</VersionLabel>
        </SiteTitle>
      </Main>
    </Wrapper>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  docsVersion: PropTypes.string.isRequired,
};

export default Header;
