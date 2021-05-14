import React from 'react';
import { Form } from 'react-bootstrap';
import { styled } from 'redoc';

const StyledFormGroup = styled(Form.Group)`
  width: min(100%, 20rem);
`;

export default function AddForm({ children, onSubmit }) {
  return (
    <Form onSubmit={onSubmit}>
      <StyledFormGroup>{children}</StyledFormGroup>
    </Form>
  );
}
