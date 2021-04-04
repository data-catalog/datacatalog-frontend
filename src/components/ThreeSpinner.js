import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export default function ThreeSpinner(props) {
  return (
    <Container className="text-center pt-5">
      <Spinner {...props} className="mx-3" animation="grow" role="status" />
      <Spinner {...props} className="mx-3" animation="grow" role="status" />
      <Spinner {...props} className="mx-3" animation="grow" role="status" />
    </Container>
  );
}
