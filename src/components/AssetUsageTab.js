import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import highlightStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-light';

SyntaxHighlighter.registerLanguage('python', python);

export default function AssetUsageTab({ asset }) {
  const downloadCode = `
    from data_catalog import DataCatalog

    with DataCatalog(api_key=<your_api_key>) as service:
        asset = service.get_asset('${asset?.id}')
        dataframe = asset.get_data() # returns a Pandas dataframe

        print(dataframe)
    `;

  const versionCode = `
    from data_catalog import DataCatalog

    with DataCatalog(api_key=<your_api_key>) as service:
        asset = service.get_asset('${asset?.id}')
        versions = asset.list_versions(output_format='list')

        print(versions)
    `;

  return (
    <>
      <Card.Title className="mb-4">Integration with the python library</Card.Title>

      <h6>Example of downloading the asset content through the python library:</h6>
      <SyntaxHighlighter language="python" style={highlightStyle} className="rounded shadow-sm">
        {downloadCode}
      </SyntaxHighlighter>

      <h6>Example of listing all the available versions of the asset through the python library:</h6>
      <SyntaxHighlighter language="python" style={highlightStyle} className="rounded shadow-sm">
        {versionCode}
      </SyntaxHighlighter>

      <em>
        For details about how to retrieve the asset with API calls, see the <Link to="/docs">API documentation</Link>.
      </em>
    </>
  );
}
