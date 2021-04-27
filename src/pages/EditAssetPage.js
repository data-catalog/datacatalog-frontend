import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { Card } from 'react-bootstrap';

import AssetApi from '../apis/AssetApi';
import AssetForm from '../components/AssetForm';
import useNotify from '../hooks/useNotify';
import Page from '../components/Page';

const fetcher = (url) => AssetApi.get(url);

export default function EditAssetPage() {
  const history = useHistory();
  const notify = useNotify();
  const { assetId } = useParams();
  const { data: response } = useSWR(`/assets/${assetId}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const onSubmit = async (data) => {
    try {
      await AssetApi.patch(`/assets/${assetId}`, data);
      notify('Asset updated successfully!', 'success');
      history.push(`/assets/${assetId}`);
    } catch (err) {
      if (err.response?.status === 401) {
        notify('You are not allowed to edit this asset.', 'error');
      } else if (err.response?.status === 422) {
        notify(err.response?.data.message);
      } else {
        notify('Something went wrong, please try again.', 'error');
      }
    } finally {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const onCancel = () => history.push(`/assets/${assetId}`);

  return (
    <Page>
      <Card className="shadow-sm">
        <Card.Header as="h1">Edit asset</Card.Header>
        <Card.Body>
          <AssetForm type="edit" setValues={response?.data} onSubmit={onSubmit} onCancel={onCancel} />
        </Card.Body>
      </Card>
    </Page>
  );
}
