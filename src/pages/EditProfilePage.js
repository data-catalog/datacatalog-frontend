import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Button, Card, Form, InputGroup, Modal, Table, Alert, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdContentCopy, MdDelete } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { styled } from 'redoc';
import useSWR from 'swr';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import UserApi from '../apis/UserApi';
import AddForm from '../components/AddForm';
import Page from '../components/Page';
import ProfileForm from '../components/ProfileForm';
import SubmitButton from '../components/SubmitButton';
import { useNotify, useUser } from '../hooks';
import CopyToClipboardButton from '../components/CopyToClipboardButton';

const fetcher = (url) => UserApi.get(url);

const RemoveButton = styled(Button)`
  display: inline-flex;
  align-items: baseline;
  background: none;
  border: none;
  color: var(--dark);

  &:hover {
    background: none;
    border: none;
    color: var(--danger);
  }
`;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('The API key name is required.'),
});

function ApiKeyModal({ show, onHide, apiKey }) {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>API key created</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Use this key in the application to authenticate yourself.</p>

        <InputGroup className="mb-3">
          <FormControl value={apiKey?.key} className="cursor-auto" disabled />
          <InputGroup.Append>
            <CopyToClipboardButton textToCopy={apiKey?.key} className="text-nowrap">
              <MdContentCopy /> Copy
            </CopyToClipboardButton>
          </InputGroup.Append>
        </InputGroup>

        <Alert variant="warning">
          Store the key in a safe place. After you close this dialog, you <strong>cannot</strong> view the key again.
        </Alert>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// eslint-disable-next-line max-lines-per-function
function ApiKeySection() {
  const {
    register,
    errors,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const notify = useNotify();
  const [showModal, setShowModal] = useState(false);
  const [apiKey, setApiKey] = useState();

  const { data: response, mutate } = useSWR('/user/keys', fetcher);
  const keys = response?.data;

  const onCreateKey = async ({ title }) => {
    try {
      const apiKeyResponse = await UserApi.post('/user/keys', { title });
      mutate();
      reset();

      setApiKey(apiKeyResponse.data);
      setShowModal(true);
    } catch (err) {
      let message;

      if ([401, 403].includes(err.response.status)) {
        message = 'You do not have permission to create an API key.';
      } else if (err.response.status === 422) {
        message = err.response.data.message;
      } else {
        message = 'Could not create the API key. Please try again later.';
      }

      setError('title', { message });
    }
  };

  const onDeleteKey = async (keyId) => {
    try {
      await UserApi.delete(`/user/keys/${keyId}`);
      mutate();
      reset();
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        notify('You do not have permission to create an API key.');
      } else {
        notify('Could not create the API key. Please try again later.');
      }
    }
  };

  return (
    <>
      <ApiKeyModal apiKey={apiKey} show={showModal} onHide={() => setShowModal(false)} />
      <Table responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>API key name</th>
            <th>Created at</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {keys?.map((key, i) => (
            <tr key={key.id}>
              <td>{i + 1}</td>
              <td>{key.title}</td>
              <td>{dayjs(key.updatedAt).format('MMMM DD, YYYY h:mm A')}</td>
              <td className="text-center">
                <RemoveButton variant="light" data-tip data-for={`${key.id}-tip`} onClick={() => onDeleteKey(key.id)}>
                  <MdDelete size={20} />
                </RemoveButton>

                <ReactTooltip id={`${key.id}-tip`} place="top" effect="solid" delayShow={200}>
                  Delete API key.
                </ReactTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddForm onSubmit={handleSubmit(onCreateKey)}>
        <Form.Label as="h6" className="mb-3">
          Create new API key
        </Form.Label>

        <InputGroup>
          <Form.Control type="text" name="title" placeholder="API key name" ref={register} isInvalid={!!errors.title} />
          <InputGroup.Append>
            <SubmitButton type="submit" variant="success" className="rounded-right" isSubmitting={isSubmitting}>
              Create
            </SubmitButton>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">{errors?.title?.message}</Form.Control.Feedback>
        </InputGroup>
      </AddForm>
    </>
  );
}

export default function EditProfilePage() {
  const history = useHistory();
  const notify = useNotify();
  const user = useUser();

  const { data: response } = useSWR(`/users/${user.userId}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const onUpdateProfile = async (data) => {
    try {
      await UserApi.patch(`/users/${user.userId}`, data);
      notify('Profile updated successfully!', 'success');
      history.push('/assets/search');
    } catch (err) {
      if (err.response?.status === 401) {
        notify('You are not allowed to edit the profile of this user.', 'error');
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
    <Page>
      <Card className="shadow-sm">
        <Card.Header as="h3">Edit your profile</Card.Header>
        <Card.Body>
          <ProfileForm user={user} onSubmit={onUpdateProfile} setValues={response?.data} />
        </Card.Body>
      </Card>

      <Card className="shadow-sm mt-4">
        <Card.Header as="h3">Manage API keys</Card.Header>
        <Card.Body>
          <ApiKeySection />
        </Card.Body>
      </Card>
    </Page>
  );
}
