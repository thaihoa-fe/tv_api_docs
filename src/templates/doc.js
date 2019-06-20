import '../styles/prism-duotone-light.css';
import '../styles/custom.css';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import TOC from '../components/TOC';
import { LARGE_SCREEN, LAPTOP_SCREEN, SMALL_SCREEN } from '../constants/screens';

const Sidebar = styled.div`
  background: #f5f7fa;
  position: fixed;
  top: ${Layout.HEADER_HEIGHT}px;
  padding-top: 10px;
  padding-bottom: 38px;
  left: 0px;
  width: 24rem;
  height: calc(100vh - ${Layout.HEADER_HEIGHT}px);
  overflow-x: hidden;
  overflow-y: auto;
  transition: left 0.5s ease;
  z-index: 1;

  @media (max-width: ${LARGE_SCREEN}) {
    width: 22%;
  }

  @media (max-width: ${LAPTOP_SCREEN}) {
    box-sizing: content-box;
    width: 300px;
    left: ${props => (props.open ? 0 : -300)}px;
    box-shadow: ${props => (props.open ? '0 1px 8px #999' : 'none')};
  }
`;

const PageWrapper = styled.div`
  position: relative;
  margin-left: 18%;
  background: #ffffff;

  @media (max-width: ${LARGE_SCREEN}) {
    margin-left: 22%;
  }

  @media (max-width: ${LAPTOP_SCREEN}) {
    margin-left: 0;
  }
`;



const Content = styled.div`
  position: relative;
  padding: 3rem 1.5rem;
  max-width: 42rem;
  box-sizing: border-box;
  min-height: 100vh;
  margin: 0 auto;

  > table {
    width: calc(62% - 60px);
    margin-left: 30px;

    @media (max-width: ${LARGE_SCREEN}) {
      width: calc(65% - 60px);
    }

    @media (max-width: ${LAPTOP_SCREEN}) {
      width: calc(60% - 60px);
    }

    @media (max-width: ${SMALL_SCREEN}) {
      width: calc(100% - 60px);
    }
  }

  blockquote {
    border-left: 0.125em solid #dfe2e5;
    color: #6a737d;
    margin-bottom: 1em;
    margin-left: 30px;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 1em;

    > :last-child {
      margin-bottom: 0;
    }

    > :first-child {
      margin-top: 0;
    }
  }

  code:before, code:after, tt:before, tt:after {
    letter-spacing: -0.2em;
    content: " ";
  }

  .gatsby-highlight {
    margin-bottom: 1.5rem;
    margin-right: 0;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const ToggleButton = styled.div`
  padding: 8px 8px 8px 0;
  transition: all 0.5s ease;
  display: none;
  position: fixed;
  top: 80px;
  z-index: 11;
  overflow: hidden;
  box-sizing: content-box;
  a {
    display: flex;
    width: 22px;
    height: 38px;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: ${props => (props.open ? '0 1px 8px #999' : 'none')};
    border: ${props => (props.open ? 'none' : '1px solid #e4e4e4')};
    cursor: pointer;
    outline: none;
    color: #58666e;
    background: #f5f7fa;
    box-sizing: inherit;
  }
  @media (max-width: ${LAPTOP_SCREEN}) {
    display: block;
    left: ${props => (props.open ? 300 : 0)}px;
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

    document.documentElement.addEventListener('click', closeSidebar);

    return () => {
      document.documentElement.removeEventListener('click', closeSidebar);
    };
  }, []);

  return (
    <Layout docsVersion="v1.0.0">
      <SEO />
      <ToggleButton open={showSidebar}>
        <a href="#" onClick={handleToggle}>
          <FiChevronsLeft style={{ display: showSidebar ? 'block' : 'none' }} />
          <FiChevronsRight style={{ display: !showSidebar ? 'block' : 'none' }} />
        </a>
      </ToggleButton>
      <Sidebar open={showSidebar}>
        <TOC />
      </Sidebar>
      <PageWrapper>
        <Content dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </PageWrapper>
    </Layout>
  );
}

export default DocumentPage;

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            fields {
                slug
            }
            frontmatter {
                title
            }
            timeToRead
            html
        }
    }
`;