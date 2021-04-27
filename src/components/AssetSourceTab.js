import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { MdContentCopy } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import CopyToClipboardButton from './CopyToClipboardButton';
import VersionApi from '../apis/VersionApi';

function UrlLocationDetails({ parameters }) {
  return (
    <div>
      Direct download URL:{' '}
      <a target="_blank" rel="noopener noreferrer" href={parameters.url}>
        Click here
      </a>
      .
      <CopyToClipboardButton textToCopy={parameters.url}>
        <MdContentCopy /> Copy URL
      </CopyToClipboardButton>
    </div>
  );
}

function AzureBlobLocationDetails({ parameters }) {
  return <p>Container name: {parameters.container}</p>;
}

const versionFetcher = (url) => VersionApi.get(url);

export default function AssetSourceTab({ asset }) {
  const { data, error, mutate } = useSWR(`/assets/${asset.id}/versions`, versionFetcher);
  const versions = data?.data;

  const parameters = asset.location.parameters.reduce((params, { key, value }) => ({ ...params, [key]: value }), {});

  return (
    <>
      <Card.Title className="mb-4">Asset Source</Card.Title>

      <p>Source type: {asset.location.type}</p>
      {asset.location.type === 'url' && <UrlLocationDetails parameters={parameters} />}
      {asset.location.type === 'azureblob' && <AzureBlobLocationDetails parameters={parameters} />}

      <Card.Title className="my-4">Available versions</Card.Title>

      <Table responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Version name</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>Current</td>
            <td>Latest version</td>
          </tr>
          {versions?.map((version) => (
            <tr key={version.id}>
              <td>{version.id}</td>
              <td>{version.name}</td>
              <td>{version.createdAt}</td>
            </tr>
          ))}
          {versions?.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-muted">
                There are no older versions of this asset.
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={3} className="text-center text-danger">
                <div className="d-flex align-items-baseline justify-content-center">
                  Could not retrieve the older versions.
                  <Button variant="link" onClick={mutate}>
                    Click to retry...
                  </Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <em>
        You can download an older version of the asset through the python library (see the Usage tab), or you can list
        the contents of the version through the API (<Link to="/docs">see API documentation</Link>).
      </em>
    </>
  );
}
