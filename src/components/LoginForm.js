import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import useAuthFunctions from '../hooks/useAuthFunctions';
import SubmitButton from './SubmitButton';
import useNotify from '../hooks/useNotify';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required.'),
});

export default function LoginForm({ onSuccess }) {
  const { login } = useAuthFunctions();
  const notify = useNotify();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data) => {
    try {
      await login(data);

      notify('Successfully logged in!', 'success');
      onSuccess();
    } catch (err) {
      if (err.response?.status === 401) {
        notify('The username or password is incorrect.', 'error');
      } else if (err.response?.status === 422) {
        notify('The provided input is not valid.', 'error');
      } else {
        notify('Something went wrong, please try again.', 'error');
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" placeholder="Username" ref={register} isInvalid={!!errors.username} />
        <Form.Control.Feedback type="invalid">{errors?.username?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          ref={register}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">{errors?.password?.message}</Form.Control.Feedback>
      </Form.Group>

      <SubmitButton variant="success" isSubmitting={isSubmitting}>
        Login
      </SubmitButton>
    </Form>
  );
}
