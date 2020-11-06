import React from 'react';

import { Form, FormGroup, Input, Button } from '../../styles/Form';

const RegisterForm = () => {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Username" type="text" name="username" required="" />
        <Input placeholder="E-mail address" type="email" name="email" required="" />
        <Input type="password" name="password" placeholder="Password" required="" />
      </FormGroup>

      <Button type="submit">Register!</Button>
    </Form>
  );
};

export default RegisterForm;
