import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useAuthModal from '../hooks/useAuthModal';
import useUser from '../hooks/useUser';

const Title = styled.h1`
  font-weight: lighter;
  font-size: min(20vw, 10rem);
`;

const Message = styled.p`
  font-weight: lighter;
  font-size: min(5vw, 2.5rem);
`;

const Divider = styled.hr`
  height: 1px;
  border: none;
  background: rgb(33, 37, 41);
  background: linear-gradient(90deg, rgba(33, 37, 41, 0) 0%, rgba(33, 37, 41, 0.5) 50%, rgba(33, 37, 41, 0) 100%);
`;

export default function ErrorPage({ statusCode, message, showLoginButton }) {
  const { showLogin } = useAuthModal();
  const user = useUser();

  return (
    <Jumbotron className="bg-transparent text-center">
      <Title>{statusCode}</Title>
      <Divider />
      <Message>Oops! {message}</Message>
      {showLoginButton && !user && (
        <Button className="mr-2" onClick={showLogin}>
          Login
        </Button>
      )}
      <Button as={Link} to="/">
        Home Page
      </Button>
    </Jumbotron>
  );
}

ErrorPage.defaultProps = {
  showLoginButton: false,
};

export const NotFoundPage = () => <ErrorPage statusCode={404} message="Page not found!" />;
export const UnauthorizedPage = () => (
  <ErrorPage statusCode={403} message="You don't have access to this page!" showLoginButton />
);
