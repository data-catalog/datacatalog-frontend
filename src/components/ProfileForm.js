import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import SubmitButton from './SubmitButton';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('E-mail address is required.').email('Please provide a valid e-mail address.'),
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required.'),
  password: Yup.string()
    .transform((value) => (!value ? undefined : value))
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Password of minimum 6 characters, which contains at least a number and a letter.'
    )
    .nullable(),
});

export default function ProfileForm({ user, onSubmit, setValues }) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => setValues && reset(setValues), [setValues, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" value={user.userId} disabled className="cursor-not-allowed" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={user.username} disabled className="cursor-not-allowed" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>E-mail Address</Form.Label>
              <Form.Control name="email" placeholder="E-mail Address" ref={register} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors?.email?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control name="firstName" placeholder="First Name" ref={register} isInvalid={!!errors.firstName} />
              <Form.Control.Feedback type="invalid">{errors?.firstName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lastName" placeholder="Last Name" ref={register} isInvalid={!!errors.lastName} />
              <Form.Control.Feedback type="invalid">{errors?.lastName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Change Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="New password"
                ref={register}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors?.password?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <SubmitButton variant="success" className="mr-2" isSubmitting={isSubmitting}>
              Save changes
            </SubmitButton>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
