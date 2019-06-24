import '../styles/prism-duotone-light.css';
import '../styles/custom.css';
import '../styles/gitbook-markdown.css';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { FaBars } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TOC from '../components/TOC';
import { LAPTOP_SCREEN } from '../constants/screens';

export const CONTENT_WIDTH = '1448px';

const Sidebar = styled.div`
  background: #f5f7f9;
  align-items: stretch;
  border-right: 1px solid #e6ecf1;
  overflow-x: hidden;
  transition: left 0.5s ease;
  z-index: 2;
  position: fixed;
  top: ${Layout.HEADER_HEIGHT}px;

  width: calc((100% - ${CONTENT_WIDTH}) / 2 + ${Layout.SIDEBAR_WIDTH}px);
  padding-left: calc((100% - ${CONTENT_WIDTH}) / 2);
  height: calc(100vh - 80px);

  @media (max-width: ${LAPTOP_SCREEN}) {
    overflow-y: auto;
    box-sizing: content-box;
    width: 300px;
    left: ${props => (props.open ? 0 : -300)}px;
    box-shadow: ${props => (props.open ? '0 1px 8px #999' : 'none')};
    position: fixed;
    top: ${Layout.MOBILE_HEADER_HEIGHT}px;
    height: 100vh;
    z-index: 103;
    top: 0;
  }
`;

const PageBody = styled.div`
  display: flex;
  background: #fff;
`;

const DocContainer = styled.main`
  position: relative;
  background: #ffffff;
  margin-left: calc((100% - ${CONTENT_WIDTH}) / 2 + ${Layout.SIDEBAR_WIDTH}px);

  @media (max-width: ${LAPTOP_SCREEN}) {
    width: 100%;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
  }
`;
const DocHeader = styled.header`
  border-bottom: 2px solid #e6ecf1;
  margin-bottom: 40px;
`;
const DocTitle = styled.h1`
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 500;
  margin-bottom: 0;
`;
const DocSummary = styled.p`
  font-size: 1rem;
  line-height: 1.625;
  font-weight: 400;
  color: #74818d;
`;
const Markdown = styled.div``;
const Content = styled.div`
  position: relative;
  padding: 40px 0 3rem;
  margin: 0 88px;
  max-width: 750px;
  min-height: 100vh;
  line-height: 1.625;
  overflow: scroll;

  @media (max-width: ${LAPTOP_SCREEN}) {
    padding-left: 0;
    padding-right: 0;
    padding-top: 20px;
    margin: 0 auto;
  }
`;

const SidebarHeader = styled.div`
  display: none;
  @media (max-width: ${LAPTOP_SCREEN}) {
    display: flex;
    height: ${Layout.MOBILE_HEADER_HEIGHT}px;
    background: #fff;
    align-items: center;
    padding-left: 17px;
    box-shadow: 0 3px 8px 0 rgba(116, 129, 141, 0.1);
    border-bottom: 1px solid #d4dadf;
  }
`;

const CloseSideBarIcon = styled(MdArrowBack)`
  font-size: 20px;
  display: block;
  color: #242a31;
`;

const ToggleButtonIcon = styled(FaBars)`
  display: block;
  font-size: 16px;
  color: #242a31;
`;

const ToggleButton = styled.div`
  transition: all 0.5s ease;
  padding: 8px;
  display: none;
  position: fixed;
  top: 30px;
  left: 8px;
  transform: translateY(-50%);
  z-index: 102;
  overflow: hidden;
  box-sizing: content-box;
  a {
    display: flex;
    width: 22px;
    height: 38px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    color: #58666e;
    background: #f5f7fa;
    box-sizing: inherit;
  }
  @media (max-width: ${LAPTOP_SCREEN}) {
    display: block;
  }
`;

const SidebarOverlay = styled.div`
  display: none;
  @media (max-width: ${LAPTOP_SCREEN}) {
    background: rgba(24, 48, 85, 0.3);
    display: block;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 102;
    top: 0;
    left: 0;
    transition: all 0.2s linear;
    opacity: ${props => (props.open ? 1 : 0)};
    visibility: ${props => (props.open ? 'visible' : 'hidden')};
  }
`;

function DocumentPage({ data }) {
  const { markdownRemark } = data;
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const handleToggle = evt => {
    evt.stopPropagation();
    evt.preventDefault();

    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const hash = window.location.hash.substr(1);
    if (hash) {
      const el = document.querySelector(`a[href="#${hash}"]`);
      if (el) {
        el.click();
      }
    }
  }, []);

  return (
    <Layout docsVersion="v1.0.0">
      <SEO />
      <ToggleButton open={showSidebar} onClick={handleToggle}>
        <ToggleButtonIcon />
      </ToggleButton>
      <PageBody>
        <Sidebar open={showSidebar}>
          <SidebarHeader>
            <CloseSideBarIcon onClick={closeSidebar} />
          </SidebarHeader>
          <TOC onClick={closeSidebar} />
        </Sidebar>
        <SidebarOverlay open={showSidebar} onClick={closeSidebar} />
        <DocContainer>
          <Content>
            <DocHeader>
              <DocTitle>{markdownRemark.frontmatter.title}</DocTitle>
              <DocSummary>{markdownRemark.fields.readingTime.text}</DocSummary>
            </DocHeader>

            <Markdown
              className="gitbook-markdown-body"
              dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
            />
          </Content>
        </DocContainer>
      </PageBody>
    </Layout>
  );
}

DocumentPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string,
    }),
  }).isRequired,
};

export default DocumentPage;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        title
      }
      html
    }
  }
`;
