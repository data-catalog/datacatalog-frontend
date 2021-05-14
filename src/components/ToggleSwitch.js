import React from 'react';
import { Form } from 'react-bootstrap';

export default function ToggleSwitch({ name, label, innerRef }) {
  return (
    <div className="custom-control custom-switch">
      <input type="checkbox" name={name} className="custom-control-input" id={name} ref={innerRef} />
      <Form.Label htmlFor={name} className="custom-control-label">
        {label}
      </Form.Label>
    </div>
  );
}
