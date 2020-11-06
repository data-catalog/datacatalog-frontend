import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Form, FormGroup, Input, Button } from '../../styles/Form';
import Api from '../../../apis/api';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = ({ toggleMenu, toggleModal }) => {
  const { register, handleSubmit, errors, setError, clearErrors, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    return Api.post('users/login', JSON.stringify(data))
      .then((res) => {
        console.log(res);
        toggleModal(false);

        setTimeout(() => {
          toggleMenu(false);
        }, 500);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError('auth', { type: 'manual', message: 'Username or password is incorrect.' });
        }
      });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Input type="text" name="username" placeholder="Username" ref={register} onChange={() => clearErrors('auth')} />
        {errors.username && errors.username.message}

        <Input
          type="password"
          name="password"
          placeholder="Password"
          ref={register}
          onChange={() => clearErrors('auth')}
        />
        {errors.password && errors.password.message}
      </FormGroup>

      {errors.auth && errors.auth.message}
      <Button type="submit" disabled={isSubmitting}>
        Log in!
      </Button>
    </Form>
  );
};

export default LoginForm;
