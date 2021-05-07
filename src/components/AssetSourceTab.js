import React from 'react';
import { Button, Card, Form, InputGroup, Table } from 'react-bootstrap';
import { MdContentCopy } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CopyToClipboardButton from './CopyToClipboardButton';
import VersionApi from '../apis/VersionApi';
import AddForm from './AddForm';
import SubmitButton from './SubmitButton';

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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Version name is required.'),
});

// eslint-disable-next-line max-lines-per-function
export default function AssetSourceTab({ asset, onCreateVersion }) {
  const { data, error, mutate } = useSWR(`/assets/${asset.id}/versions`, versionFetcher);
  const versions = data?.data;

  const {
    register,
    errors,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ name }) => {
    try {
      await onCreateVersion(name);
      reset();
    } catch (err) {
      let message;
      if (err.response.status === 404) {
        message = 'User not found.';
      } else if ([401, 403].includes(err.response.status)) {
        message = 'You do not have permission to add members.';
      } else {
        message = 'Could not add the user to the asset. Please try again later.';
      }

      setError('username', { message });
    }
  };

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

      <AddForm onSubmit={handleSubmit(onSubmit)}>
        <Form.Label as="h6" className="mb-3">
          Create a new version
        </Form.Label>

        <InputGroup>
          <Form.Control type="text" name="name" placeholder="Version name" ref={register} isInvalid={!!errors.name} />
          <InputGroup.Append>
            <SubmitButton type="submit" variant="success" className="rounded-right" isSubmitting={isSubmitting}>
              Create
            </SubmitButton>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">{errors?.name?.message}</Form.Control.Feedback>
        </InputGroup>
      </AddForm>

      <em>
        You can download an older version of the asset through the python library (see the Usage tab), or you can list
        the contents of the version through the API (<Link to="/docs">see API documentation</Link>).
      </em>
    </>
  );
}
