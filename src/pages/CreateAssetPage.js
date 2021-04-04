import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import AssetApi from '../apis/AssetApi';
import AssetForm from '../components/AssetForm';
import useNotify from '../hooks/useNotify';

export default function CreateAssetPage() {
  const notify = useNotify();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const asset = {
        ...data,
        location: {
          ...data.location,
          parameters: data.location.parameters.filter((param) => param.value.length > 0),
        },
      };
      await AssetApi.post('/assets', asset);
      notify('Asset created successfully!', 'success');
      history.push('/assets/search');
    } catch (err) {
      if (err.response?.status === 401) {
        notify('You are not allowed to create an asset.', 'error');
      } else if (err.response?.status === 422) {
        notify(err.response?.data.message, 'error');
      } else {
        notify('Something went wrong, please try again.', 'error');
      }
    } finally {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Header as="h1">Create a new asset</Card.Header>
      <Card.Body>
        <AssetForm type="create" onSubmit={onSubmit} />
      </Card.Body>
    </Card>
  );
}
