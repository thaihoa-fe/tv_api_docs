import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/SEO';

function IndexPage() {
  return (
    <Layout docsVersion="v3.8" hasAPIExplorerLink>
      <SEO title="Home" />
    </Layout>
  );
}

export default IndexPage;
