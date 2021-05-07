import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactTooltip from 'react-tooltip';
import useSWR from 'swr';
import * as Yup from 'yup';
import styled from 'styled-components';
import { MdCheck, MdClose, MdRemoveCircleOutline } from 'react-icons/md';
import { Button, Card, Form, InputGroup, Table } from 'react-bootstrap';
import UserApi from '../apis/UserApi';
import AddForm from './AddForm';
import SubmitButton from './SubmitButton';

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

const userFetcher = (url) => UserApi.get(url);

const validationSchema = Yup.object().shape({
  username: Yup.string().required('The username is required.'),
});

export default function MembersTab({ ownerId, members, onRemoveMember, onAddMember }) {
  const { data } = useSWR(`/users/show_many?ids=${[ownerId, ...members].join(',')}`, userFetcher);
  const users = data?.data;

  const {
    register,
    errors,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async ({ username }) => {
    try {
      await onAddMember(username);
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

  return (
    <>
      <Card.Title className="mb-4">Members of this asset</Card.Title>

      <Table responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th className="text-center">Owner</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td className="text-center">
                  {user.id === ownerId ? <MdCheck className="text-success" /> : <MdClose className="text-danger" />}
                </td>
                <td className="text-center">
                  {user.id !== ownerId && (
                    <RemoveButton
                      variant="light"
                      data-tip
                      data-for={`${user.id}-tip`}
                      onClick={() => onRemoveMember(user.id)}
                    >
                      <MdRemoveCircleOutline />
                    </RemoveButton>
                  )}
                  <ReactTooltip id={`${user.id}-tip`} place="top" effect="solid" delayShow={200}>
                    Remove from members.
                  </ReactTooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <AddForm onSubmit={handleSubmit(onSubmit)}>
        <Form.Label as="h6" className="mb-3">
          Add a new member
        </Form.Label>

        <InputGroup>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            ref={register}
            isInvalid={!!errors.username}
          />
          <InputGroup.Append>
            <SubmitButton type="submit" variant="success" className="rounded-right" isSubmitting={isSubmitting}>
              Add
            </SubmitButton>
          </InputGroup.Append>
          <Form.Control.Feedback type="invalid">{errors?.username?.message}</Form.Control.Feedback>
        </InputGroup>
      </AddForm>
    </>
  );
}
