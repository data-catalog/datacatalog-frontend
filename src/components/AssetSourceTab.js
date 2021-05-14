import React from 'react';
import { Card, Container } from 'react-bootstrap';
import { MdContentCopy } from 'react-icons/md';
import CopyToClipboardButton from './CopyToClipboardButton';
import MetadataEntry from './MetadataEntry';
import VersionManagementSection from './VersionManagementSection';

function UrlLocationDetails({ parameters }) {
  return (
    <MetadataEntry name="Direct download URL">
      <a target="_blank" rel="noopener noreferrer" href={parameters.url}>
        Click here
      </a>
      <CopyToClipboardButton textToCopy={parameters.url}>
        <MdContentCopy /> Copy URL
      </CopyToClipboardButton>
    </MetadataEntry>
  );
}

function AzureBlobLocationDetails({ parameters }) {
  return (
    <>
      <MetadataEntry name="Container name">{parameters.containerName}</MetadataEntry>
      <MetadataEntry name="Account URL">
        {parameters.accountUrl}
        <CopyToClipboardButton textToCopy={parameters.accountUrl}>
          <MdContentCopy /> Copy Account URL
        </CopyToClipboardButton>
      </MetadataEntry>
      {parameters.accountKey && (
        <MetadataEntry name="Account key">
          ••••••••••
          <CopyToClipboardButton textToCopy={parameters.accountKey}>
            <MdContentCopy /> Copy Account Key
          </CopyToClipboardButton>
        </MetadataEntry>
      )}
      {parameters.sasToken && (
        <MetadataEntry name="SAS token">
          ••••••••••
          <CopyToClipboardButton textToCopy={parameters.sasToken}>
            <MdContentCopy /> Copy SAS Token
          </CopyToClipboardButton>
        </MetadataEntry>
      )}
    </>
  );
}

const typeMappings = {
  url: 'URL',
  azureblob: 'Azure Blob Storage',
};

export default function AssetSourceTab({ asset, onCreateVersion }) {
  const parameters = asset.location.parameters.reduce((params, { key, value }) => ({ ...params, [key]: value }), {});

  return (
    <>
      <Card.Title className="mb-4">Asset Source</Card.Title>

      <Container>
        <MetadataEntry name="Source type">{typeMappings[asset.location.type]}</MetadataEntry>
        {asset.location.type === 'url' && <UrlLocationDetails parameters={parameters} />}
        {asset.location.type === 'azureblob' && <AzureBlobLocationDetails parameters={parameters} />}
      </Container>

      {asset.location.type === 'azureblob' ? (
        <VersionManagementSection asset={asset} onCreateVersion={onCreateVersion} />
      ) : (
        <em className="d-block mt-5 text-muted">Versions are not available for URL source types.</em>
      )}
    </>
  );
}
