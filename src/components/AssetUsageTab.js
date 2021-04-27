import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import highlightStyle from 'react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-light';
import { useUser } from '../hooks';

SyntaxHighlighter.registerLanguage('python', python);

export default function AssetUsageTab({ asset }) {
  const user = useUser();

  return (
    <>
      <Card.Title className="mb-4">Integration with the python library</Card.Title>

      <h6>Example of downloading the asset content through the python library:</h6>
      <SyntaxHighlighter language="python" style={highlightStyle} className="rounded shadow-sm">
        {`
            from data_catalog.assets import AssetService

            with AssetService(username=${user.username}, password=<your_password>) as asset_service:
              asset = asset_service.get_asset('${asset?.id}')
              dataframe = asset.get_data() # returns a Pandas dataframe

              print(dataframe)
          `}
      </SyntaxHighlighter>

      <h6>Example of downloading an older version of the asset through the python library:</h6>
      <SyntaxHighlighter language="python" style={highlightStyle} className="rounded shadow-sm">
        {`
            # TODO
          `}
      </SyntaxHighlighter>

      <em>
        For details about how to retrieve the asset with API calls, see the <Link to="/docs">API documentation</Link>.
      </em>
    </>
  );
}
