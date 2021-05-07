import React from 'react';
import dayjs from 'dayjs';
import { Container, Card, Badge } from 'react-bootstrap';
import { MdContentCopy } from 'react-icons/md';
import CopyToClipboardButton from './CopyToClipboardButton';
import MetadataEntry from './MetadataEntry';

export default function AssetOverviewTab({ asset }) {
  return (
    <>
      <Card.Title>Metadata</Card.Title>
      <Container>
        <MetadataEntry name="ID">
          {asset.id}
          <CopyToClipboardButton textToCopy={asset.id}>
            <MdContentCopy /> Copy
          </CopyToClipboardButton>
        </MetadataEntry>
        <MetadataEntry name="Owner">{asset.ownerId}</MetadataEntry>
        <MetadataEntry name="Visibility">Private</MetadataEntry>
        <MetadataEntry name="File type">{asset.format.toUpperCase()}</MetadataEntry>
        <MetadataEntry name="Source type">{asset.location.type}</MetadataEntry>
        <MetadataEntry name="Created at">{dayjs(asset.createdAt).format('MMMM D, YYYY hh:mm')}</MetadataEntry>
        <MetadataEntry name="Last updated at">{dayjs(asset.updatedAt).format('MMMM D, YYYY hh:mm')}</MetadataEntry>
      </Container>

      <Card.Title className="mt-4">Description</Card.Title>

      <Container>
        {asset.tags.map((tag) => (
          <Badge key={tag} pill variant="dark" className="mr-1">
            {tag}
          </Badge>
        ))}
      </Container>

      <Container className="mt-3 bg-light rounded">
        <Card.Text dangerouslySetInnerHTML={{ __html: asset.description }} />
      </Container>
    </>
  );
}
