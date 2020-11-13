import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { usePopper } from 'react-popper';
import Tippy from '@tippyjs/react/headless';
import { BsExclamationCircle } from 'react-icons/bs';

import styled from 'styled-components';
import { Form, FormGroup, Input, Button } from '../../styles/Form';
import { useAuth } from '../../../context/AuthContext';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  password: Yup.string().required('Password is required'),
});

const PopperContainer = styled.div`
  background: #ed3e3e;
  color: white;
  font-weight: bold;
  padding: 4px 8px;
  font-size: 13px;
  border-radius: 4px;
  z-index: 10;
  max-width: 200px;
`;

const Arrow = styled.div`
  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
  }

  ::before {
    content: '';
    transform: rotate(45deg);
    background: red;
  }
`;

const ExclamationMark = styled.span`
  margin-right: 0.5rem;
  font-size: 150%;
  color: red;
  transform: translateY(10%);
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  border-radius: 8px;
  border: ${(props) => (props.error ? '2px solid red' : null)};
  padding: 0.6rem;
  background-color: white;
  background-size: 50%;
  margin-bottom: 5%;
`;

const UsernameInput = ({ message }) => {
  return (
    <>
      <InputContainer>
        <Input
          type="text"
          name="username"
          placeholder="Username" /* ref={register} onChange={() => clearErrors('auth')} */
        />
        <Tippy
          placement="top-end"
          render={(attrs) => (
            <PopperContainer {...attrs}>
              The username is fucked man!
              <Arrow data-popper-arrow="" />
            </PopperContainer>
          )}
        >
          <ExclamationMark>
            <BsExclamationCircle />
          </ExclamationMark>
        </Tippy>
      </InputContainer>
    </>
  );
};

const PasswordInput = () => {
  return (
    <>
      <InputContainer>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          // ref={register}
          // onChange={() => clearErrors('auth')}
        />
        {/* {errors.password && errors.password.message} */}
        <Tippy
          placement="top-end"
          render={(attrs) => (
            <PopperContainer {...attrs}>
              The username is fucked man!
              <Arrow data-popper-arrow="" />
            </PopperContainer>
          )}
        >
          <ExclamationMark>
            <BsExclamationCircle />
          </ExclamationMark>
        </Tippy>
      </InputContainer>
    </>
  );
};

const LoginForm = ({ toggleMenu, toggleModal }) => {
  const { login } = useAuth();

  const { register, handleSubmit, errors, setError, clearErrors, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      await login(data);

      toggleModal(false);
      setTimeout(() => {
        toggleMenu(false);
      }, 500);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('auth', { type: 'manual', message: 'Username or password is incorrect.' });
      } else {
        setError('auth', { type: 'manual', message: 'Something went wrong, please try again.' });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <InputContainer error={errors.username}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            ref={register}
            onChange={() => clearErrors('auth')}
          />
          {errors.username && (
            <Tippy
              placement="top-end"
              render={(attrs) => (
                <PopperContainer {...attrs}>
                  {errors.username.message}
                  <Arrow data-popper-arrow="" />
                </PopperContainer>
              )}
            >
              <ExclamationMark>
                <BsExclamationCircle />
              </ExclamationMark>
            </Tippy>
          )}
        </InputContainer>
        {/* {errors.username && (
          <ErrorContainer referenceElement={nameFieldReference} errorMessage={errors.username.message} />
        )} */}
        <PasswordInput />
      </FormGroup>
      {}
      <Button type="submit" disabled={isSubmitting}>
        Log in!
      </Button>
    </Form>
  );
};

export default LoginForm;
