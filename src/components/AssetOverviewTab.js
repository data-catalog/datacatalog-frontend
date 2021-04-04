import React from 'react';
import dayjs from 'dayjs';
import { Col, Container, Row, Card, Badge } from 'react-bootstrap';
import { MdContentCopy } from 'react-icons/md';
import CopyToClipboardButton from './CopyToClipboardButton';

function MetadataEntry({ name, children }) {
  return (
    <Row>
      <Col xs={4}>{name}</Col>
      <Col className="text-muted">{children}</Col>
    </Row>
  );
}

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
        <MetadataEntry name="Created at">{dayjs.unix(asset.createdAt).format('MMMM D, YYYY hh:mm')}</MetadataEntry>
        <MetadataEntry name="Last updated at">{dayjs.unix(asset.updatedAt).format('MMMM D, YYYY hh:mm')}</MetadataEntry>
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
