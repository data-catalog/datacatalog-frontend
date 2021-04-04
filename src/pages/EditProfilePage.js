import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import useSWR from 'swr';
import UserApi from '../apis/UserApi';
import ProfileForm from '../components/ProfileForm';
import { useNotify, useUser } from '../hooks';

const fetcher = (url) => UserApi.get(url);

export default function EditProfilePage() {
  const history = useHistory();
  const notify = useNotify();
  const user = useUser();

  const { data: response } = useSWR(`/users/${user.userId}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const onSubmit = async (data) => {
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
    <Card className="shadow-sm">
      <Card.Header as="h1">Edit your profile</Card.Header>
      <Card.Body>
        <ProfileForm user={user} onSubmit={onSubmit} setValues={response?.data} />
      </Card.Body>
    </Card>
  );
}
