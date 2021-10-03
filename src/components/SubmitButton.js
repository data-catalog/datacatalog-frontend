import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

export default function SubmitButton({ isSubmitting, children, disabled, ...props }) {
  return (
    <Button {...props} disabled={disabled || isSubmitting}>
      {isSubmitting && <Spinner animation="border" size="sm" className="mr-2" role="status" aria-hidden="true" />}
      {children}
    </Button>
  );
}

SubmitButton.defaultProps = {
  type: 'submit',
  isSubmitting: false,
};
