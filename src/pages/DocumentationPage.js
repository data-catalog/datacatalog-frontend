import React from 'react';
import { RedocStandalone } from 'redoc';
import Page from '../components/Page';

const docPaths = {
  user: '/docs/user-api/dist.yaml',
  asset: '/docs/asset-api/dist.yaml',
  versioning: '/docs/versioning-api/dist.yaml',
};

export default function DocumentationPage({ api }) {
  return (
    <Page variant="docs">
      <RedocStandalone
        specUrl={docPaths[api]}
        options={{
          nativeScrollbars: true,
          theme: { colors: { primary: { main: '#03445e' } } },
        }}
      />
    </Page>
  );
}
