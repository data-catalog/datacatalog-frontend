import React, { useState } from 'react';
import { Button, Form, FormControl, InputGroup, Table } from 'react-bootstrap';
import { MdRemoveCircleOutline, MdSearch } from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import useSWR, { mutate } from 'swr';
import UserApi from '../apis/UserApi';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import SubmitButton from '../components/SubmitButton';
import useNotify from '../hooks/useNotify';

const SearchIcon = styled(InputGroup.Text)`
  background: none;
  border: none;
  margin-left: -3.5rem;
  z-index: 1;
`;

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

function RoleSelector({ id, role, onRoleChange }) {
  const [selectedValue, setSelectedValue] = useState(role);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleRoleChange = async () => {
    setSubmitting(true);
    await onRoleChange(id, selectedValue);
    setSubmitting(false);
  };

  return (
    <>
      <Form.Control
        as="select"
        style={{ width: 'auto' }}
        className="d-inline-block mr-2"
        plaintext
        name={id}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <option value="ADMIN">Administrator</option>
        <option value="USER">User</option>
      </Form.Control>
      <SubmitButton
        size="sm"
        variant="success"
        disabled={role === selectedValue}
        onClick={handleRoleChange}
        isSubmitting={isSubmitting}
      >
        Save
      </SubmitButton>
    </>
  );
}

const fetcher = (url) => UserApi.get(url);

// eslint-disable-next-line max-lines-per-function
export default function SearchUsersPage() {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToBeDeleted, setUserToBeDeleted] = useState();

  const notify = useNotify();
  const history = useHistory();
  const { searchTerm } = useParams();
  const urlPath = searchTerm ? `/users/search/${searchTerm}` : '/users';
  const { data } = useSWR(urlPath, fetcher);
  const users = data?.data;

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/users/search/${e.target.searchTerm.value}`);
    e.target.reset();
  };

  const handleDelete = async () => {
    try {
      await UserApi.delete(`/users/${userToBeDeleted}`);
      mutate(urlPath);
      notify('User successfully deleted!', 'success');
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        notify('You do not have permission to delete this user.', 'error');
      } else {
        notify('The deletion failed. Please try again later.', 'error');
      }
    }
  };

  const handleRoleChange = async (userId, role) => {
    const { username } = users.find((user) => user.id === userId);

    try {
      await UserApi.put(`/users/${userId}/role`, { role });

      notify(`The role of ${username} is changed to ${role === 'USER' ? 'User' : 'Administrator'}.`, 'success');
      mutate(urlPath);
    } catch (err) {
      if ([401, 403].includes(err.response.status)) {
        notify('You do not have permission to do this!', 'error');
      } else {
        notify(`Could not change the role of ${username}. Please try again later.`, 'error');
      }
    }
  };

  return (
    <>
      <DeleteConfirmationModal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
        onDelete={handleDelete}
      >
        Do you really want to delete this user?
      </DeleteConfirmationModal>

      <h1 className="mb-3">Find Users by Username</h1>
      <Form onSubmit={handleSearch}>
        <InputGroup size="lg" className="mb-5">
          <FormControl
            className="rounded-pill"
            name="searchTerm"
            placeholder="Search users..."
            aria-label="Search users"
          />
          <InputGroup.Append className="">
            <SearchIcon>
              <MdSearch />
            </SearchIcon>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <h2 className="mb-4">{searchTerm ? `Search results for ${searchTerm}` : 'All users'}</h2>

      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <RoleSelector id={user.id} role={user.role} onRoleChange={handleRoleChange} />
                </td>
                <td className="text-center">
                  <RemoveButton
                    variant="light"
                    data-tip
                    data-for={`${user.id}-tip`}
                    onClick={() => {
                      setUserToBeDeleted(user.id);
                      setShowDeleteConfirmation(true);
                    }}
                  >
                    <MdRemoveCircleOutline />
                  </RemoveButton>

                  <ReactTooltip id={`${user.id}-tip`} place="top" effect="solid" delayShow={200}>
                    Delete user.
                  </ReactTooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {users?.length === 0 && <div className="text-muted text-center">No results.</div>}
    </>
  );
}
