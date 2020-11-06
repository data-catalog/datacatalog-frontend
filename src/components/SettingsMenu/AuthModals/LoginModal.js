import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled, { ThemeProvider } from 'styled-components';

import { Colors } from '../../Global/Colors';

const LoginButton = styled.button`
  background: ${(props) => props.theme.lightblue};
  padding: 10px 12px;
  font-size: 150%;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${(props) => props.theme.button_darker};
    color: black;
  }
`;

const UsernameField = styled.input.attrs(() => ({
  type: 'text',
}))`
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  margin-bottom: -1px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  margin-top: 5px;

  &:focus {
    z-index: 2;
  }
`;

const PasswordField = styled(UsernameField).attrs({
  type: 'password',
})`
  margin-bottom: 20px;
  margin-top: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const FormHeader = styled.h2`
  margin-bottom: 30px;
  color: white;
`;

const LoginContainer = styled.div`
  overflow: hidden;
  position: absolute;
  display: flex;
  align-items: center;
  transition: height 300ms ease;
  background-color: ${(props) => props.theme.back_color};
`;

const LoginForm = styled.form`
  width: 15em;
  padding: 15px 35px 40px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: ${(props) => props.theme.back_color};
  text-align: center;
`;

const RegisterInfo = styled.p`
  color: white;
`;

const RegisterLink = styled.a`
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: gray;
  }
`;

export const ModalAnimator = styled.div`
  &.modalanimator-primary-enter {
    position: absolute;
    transform: translateX(-110%);
  }
  &.modalanimator-primary-enter-active {
    transform: translateX(0%);
    transition: all 500ms ease;
  }
  &.modalanimator-primary-exit {
    position: absolute;
  }
  &.modalanimator-primary-exit-active {
    transform: translateX(-110%);
    transition: all 500ms ease;
  }
  &.modalanimator-secondary-enter {
    transform: translateX(110%);
  }
  &.modalanimator-secondary-enter-active {
    transform: translateX(0%);
    transition: all 500ms ease;
  }
  &.modalanimator-secondary-exit {
  }
  &.modalanimator-secondary-exit-active {
    transform: translateX(110%);
    transition: all 500ms ease;
  }
`;

// eslint-disable-next-line max-lines-per-function
const LoginModal = () => {
  const [activeModal, setActiveModal] = useState('login');
  const [modalHeight, setModalHeight] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [modalWidth, setModalWidth] = useState(null);

  const calculateHeight = (element) => {
    const height = element.offsetHeight;
    const width = element.offsetWidth;
    setModalHeight(height);
    setModalWidth(width);
  };

  return (
    <>
      <ThemeProvider theme={Colors}>
        <LoginContainer style={{ height: modalHeight }}>
          <CSSTransition
            in={activeModal === 'login'}
            unmountOnExit
            timeout={500}
            classNames="modalanimator-primary"
            onEnter={calculateHeight}
          >
            <ModalAnimator>
              <LoginForm>
                <FormHeader>Please Login</FormHeader>
                <UsernameField placeholder="Username" type="text" name="username" required="" />
                <br />
                <PasswordField type="password" name="password" placeholder="Password" required="" />
                <br />
                <LoginButton>Log in!</LoginButton>
                <br />
                <RegisterInfo>
                  Don&apos;t have an account yet? Join&nbsp;
                  <RegisterLink onClick={() => setActiveModal('register')}>here</RegisterLink>!
                </RegisterInfo>
              </LoginForm>
            </ModalAnimator>
          </CSSTransition>

          <CSSTransition
            in={activeModal === 'register'}
            unmountOnExit
            timeout={500}
            classNames="modalanimator-secondary"
            onEnter={calculateHeight}
          >
            <ModalAnimator>
              <LoginForm>
                <FormHeader>Please Register</FormHeader>
                <UsernameField placeholder="Username" type="text" name="username" required="" />
                <br />
                <UsernameField placeholder="E-mail address" type="email" name="email" required="" />
                <br />
                <PasswordField type="password" name="password" placeholder="Password" required="" />
                <br />
                <LoginButton>Register!</LoginButton>
                <br />
                <RegisterInfo>
                  Already got an account?&nbsp;
                  <RegisterLink onClick={() => setActiveModal('login')}>Log in</RegisterLink>!
                </RegisterInfo>
              </LoginForm>
            </ModalAnimator>
          </CSSTransition>
        </LoginContainer>
      </ThemeProvider>
    </>
  );
};

export default LoginModal;
