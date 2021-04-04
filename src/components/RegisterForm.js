import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useAuthFunctions from '../hooks/useAuthFunctions';
import UserApi from '../apis/UserApi';
import SubmitButton from './SubmitButton';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  email: Yup.string().required('E-mail address is required.').email('Please provide a valid e-mail address'),
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required.'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Password of minimum 6 characters, which contains at least a number and a letter.'
    ),
});

export default function RegisterForm({ onSuccess }) {
  const { login } = useAuthFunctions();
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const [alertText, setAlertText] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const onSubmit = async (data) => {
    try {
      setShowAlert(false);

      await UserApi.post('users', data);
      await login({ username: data.username, password: data.password });

      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setAlertText('The provided input is not valid.');
      } else {
        setAlertText('Something went wrong, please try again.');
      }

      setShowAlert(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
        {alertText}
      </Alert>

      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" placeholder="Username" ref={register} isInvalid={!!errors.username} />
        <Form.Control.Feedback type="invalid">{errors?.username?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>E-mail address</Form.Label>
        <Form.Control type="text" name="email" placeholder="E-mail address" ref={register} isInvalid={!!errors.email} />
        <Form.Control.Feedback type="invalid">{errors?.email?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          placeholder="First name"
          ref={register}
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type="invalid">{errors?.firstName?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          placeholder="Last name"
          ref={register}
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type="invalid">{errors?.lastName?.message}</Form.Control.Feedback>
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
        Register
      </SubmitButton>
    </Form>
  );
}
