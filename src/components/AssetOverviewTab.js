import React from 'react';
import dayjs from 'dayjs';
import { Container, Card, Badge } from 'react-bootstrap';
import { MdContentCopy } from 'react-icons/md';
import useSWR from 'swr';
import CopyToClipboardButton from './CopyToClipboardButton';
import MetadataEntry from './MetadataEntry';
import UserApi from '../apis/UserApi';

const userFetcher = (url) => UserApi.get(url);

export default function AssetOverviewTab({ asset }) {
  const { data } = useSWR(`/users/${asset.ownerId}`, userFetcher);
  const user = data?.data;
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
        <MetadataEntry name="Owner">{user?.username || '-'}</MetadataEntry>
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

      <Container className="mt-3 bg-light rounded px-5 py-4">
        <Card.Text dangerouslySetInnerHTML={{ __html: asset.description }} />
      </Container>
    </>
  );
}
