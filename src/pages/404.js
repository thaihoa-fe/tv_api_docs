import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Content>
        <h1>404</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Content>
    </Layout>
  );
}

export default NotFoundPage;
