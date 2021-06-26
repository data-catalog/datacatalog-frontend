import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'bootstrap';
import React from 'react';
import { Card, Form, InputGroup, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import * as Yup from 'yup';
import { MdDelete } from 'react-icons/md';
import { notify } from 'reapop';
import dayjs from 'dayjs';
import VersionApi from '../apis/VersionApi';
import AddForm from './AddForm';
import SubmitButton from './SubmitButton';
import useUser from '../hooks/useUser';
import RemoveButton from './RemoveButton';

const versionFetcher = (url) => VersionApi.get(url);

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Version name is required.'),
});

// eslint-disable-next-line max-lines-per-function
export default function VersionManagementSection({ asset, onCreateVersion }) {
  const { data, error, mutate } = useSWR(`/assets/${asset.id}/versions`, versionFetcher);
  const versions = data?.data.sort((a, b) => dayjs(b.createdAt) - dayjs(a.createdAt));

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

  const onDeleteVersion = async (name) => {
    try {
      await VersionApi.delete(`/assets/${asset.id}/versions/${name}`);
      mutate();
    } catch (err) {
      if (err.response.status === 404) {
        notify('Asset not found.');
      } else if ([401, 403].includes(err?.response.status)) {
        notify('You do not have permission to delete asset versions.');
      } else {
        notify('Could not delete asset version. Please try again later.');
      }
    }
  };

  const onSubmit = async ({ name }) => {
    try {
      await onCreateVersion(name);
      mutate();
      reset();
    } catch (err) {
      let message;
      if (err.response.status === 404) {
        message = 'Asset not found.';
      } else if ([401, 403].includes(err?.response.status)) {
        message = 'You do not have permission to create a version.';
      } else {
        message = 'Could not create the asset version. Please try again later.';
      }

      setError('name', { message });
    }
  };

  const user = useUser();

  const canDelete = asset.ownerId === user?.userId || asset.members.includes(user?.userId);

  return (
    <>
      <Card.Title className="my-4">Available versions</Card.Title>

      <Table responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Version name</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>Current</td>
            <td>Latest version</td>
            <td>
              <em className="text-muted">No actions.</em>
            </td>
          </tr>
          {versions?.map((version) => (
            <tr key={version.name}>
              <td>-</td>
              <td>{version.name}</td>
              <td>{dayjs(version.createdAt).format('MMMM DD, YYYY h:mm A')}</td>
              <td>
                {canDelete ? (
                  <RemoveButton
                    variant="light"
                    data-tip
                    data-for={`${user.id}-tip`}
                    onClick={() => onDeleteVersion(version.name)}
                  >
                    <MdDelete size={20} />
                  </RemoveButton>
                ) : (
                  <em className="text-muted">No actions.</em>
                )}
              </td>
            </tr>
          ))}
          {versions?.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                There are no older versions of this asset.
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={4} className="text-center text-danger">
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
