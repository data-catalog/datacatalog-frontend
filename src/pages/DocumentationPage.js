import React from 'react';
import { RedocStandalone } from 'redoc';
import Page from '../components/Page';

export default function DocumentationPage() {
  return (
    <Page docs>
      <RedocStandalone
        specUrl="/result.yaml"
        options={{
          nativeScrollbars: true,
          theme: { colors: { primary: { main: '#dd5522' } } },
        }}
      />
    </Page>
  );
}
