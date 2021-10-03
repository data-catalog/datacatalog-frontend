import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AuthModalContext from '../context/AuthModalContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function LoginModal({ show, onHide, onSwitchModal }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Please Log in</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <LoginForm onSuccess={onHide} />
      </Modal.Body>

      <Modal.Footer className="justify-content-start">
        Don&apos;t have an account yet? Join{' '}
        <Button className="p-0 align-baseline" variant="link" onClick={onSwitchModal}>
          here.
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function RegisterModal({ show, onHide, onSwitchModal }) {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Please Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterForm onSuccess={onHide} />
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        Already have an account? Log in{' '}
        <Button className="p-0 align-baseline" variant="link" onClick={onSwitchModal}>
          here.
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function AuthModal() {
  const { open, setOpen, variant, setVariant } = useContext(AuthModalContext);

  const toggleVariant = () => (variant === 'login' ? setVariant('register') : setVariant('login'));

  const onHide = () => setOpen(false);

  return variant === 'login' ? (
    <LoginModal show={open} onHide={onHide} onSwitchModal={toggleVariant} />
  ) : (
    <RegisterModal show={open} onHide={onHide} onSwitchModal={toggleVariant} />
  );
}
