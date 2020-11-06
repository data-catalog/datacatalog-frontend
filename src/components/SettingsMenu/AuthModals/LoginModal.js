import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled, { ThemeProvider } from 'styled-components';

import { Colors } from '../../Global/Colors';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const ModalContainer = styled.div`
  overflow: hidden;
  position: absolute;
  display: flex;
  align-items: center;
  transition: height 300ms ease;
  background-color: ${(props) => props.theme.back_color};
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

const FormHeader = styled.h2`
  margin-bottom: 30px;
`;

const StyledLink = styled.a`
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: gray;
  }
`;

const LoginModal = ({ toggleMenu, toggleLoginModal }) => {
  const [activeModal, setActiveModal] = useState('login');
  const [modalHeight, setModalHeight] = useState(null);

  const calculateHeight = (element) => {
    const height = element.offsetHeight;
    setModalHeight(height);
  };

  return (
    <ThemeProvider theme={Colors}>
      <ModalContainer style={{ height: modalHeight }}>
        <CSSTransition
          in={activeModal === 'login'}
          unmountOnExit
          timeout={500}
          classNames="modalanimator-primary"
          onEnter={calculateHeight}
        >
          <ModalAnimator>
            <FormHeader>Please Log in</FormHeader>
            <LoginForm toggleModal={toggleLoginModal} toggleMenu={toggleMenu} setActiveModal={setActiveModal} />
            <p>
              Don&apos;t have an account yet? Join&nbsp;
              <StyledLink onClick={() => setActiveModal('register')}>here</StyledLink>!
            </p>
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
            <FormHeader>Please Register</FormHeader>
            <RegisterForm setActiveModal={setActiveModal} />
            <p>
              Don&apos;t have an account yet? Join&nbsp;
              <StyledLink onClick={() => setActiveModal('register')}>here</StyledLink>!
            </p>
          </ModalAnimator>
        </CSSTransition>
      </ModalContainer>
    </ThemeProvider>
  );
};

export default LoginModal;
