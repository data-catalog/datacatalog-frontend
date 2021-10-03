import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function MetadataEntry({ name, children }) {
  return (
    <Row>
      <Col xs={4}>{name}</Col>
      <Col className="text-muted">{children}</Col>
    </Row>
  );
}
