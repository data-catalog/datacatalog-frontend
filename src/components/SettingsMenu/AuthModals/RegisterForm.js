import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Form, FormGroup, Input, Button } from '../../styles/Form';
import Api from '../../../apis/api';
import { useAuth } from '../../../context/AuthContext';

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

const RegisterForm = ({ toggleMenu, toggleModal }) => {
  const { login } = useAuth();

  const { register, handleSubmit, errors, setError, clearErrors, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      await Api.post('users', data);
      await login({ username: data.username, password: data.password });

      await toggleModal(false);
      setTimeout(() => {
        toggleMenu(false);
      }, 500);
    } catch (err) {
      if (err.response?.status === 422) {
        setError('auth', { type: 'manual', message: 'The provided input is not valid.' });
      } else {
        setError('auth', { type: 'manual', message: 'Something went wrong, please try again.' });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} onChange={() => clearErrors('submit')} noValidate>
      <FormGroup>
        <Input placeholder="Username" type="text" name="username" ref={register} />
        {errors.username && errors.username.message}

        <Input placeholder="E-mail address" type="email" name="email" ref={register} />
        {errors.email && errors.email.message}

        <Input placeholder="First name" type="text" name="firstName" ref={register} />

        <Input placeholder="Last name" type="text" name="lastName" ref={register} />

        <Input type="password" name="password" placeholder="Password" ref={register} />
        {errors.password && errors.password.message}
      </FormGroup>

      {errors.submit && errors.submit.message}
      <Button type="submit" disabled={isSubmitting}>
        Register!
      </Button>
    </Form>
  );
};

export default RegisterForm;
