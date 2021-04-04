import React, { useState } from 'react';
import { Badge, Button, Container, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

const CloseButton = styled(Button)`
  border-radius: 50%;
  padding: 0;
  line-height: 0;
  margin-left: 0.5rem;
`;

export default function TagsInput({ name, control, ...props }) {
  const [currentTag, setCurrentTag] = useState('');

  const renderInput = ({ value, onChange }) => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onChange(value.includes(e.target.value) ? value : [...value, e.target.value]);
        setCurrentTag('');
      }
    };

    const handleDelete = (e) => {
      onChange(value.filter((tag) => tag !== e.currentTarget.dataset.tag));
    };

    return (
      <>
        <Container className="pl-0 mb-1">
          {value.map((tag) => (
            <Badge key={tag} pill variant="dark" className="p-1 pl-2 ml-1 mb-1 d-inline-flex align-items-baseline">
              {tag}
              <CloseButton variant="outline-light" data-tag={tag} onClick={handleDelete}>
                <MdClose />
              </CloseButton>
            </Badge>
          ))}
        </Container>

        <Form.Control
          {...props}
          value={currentTag}
          onKeyPress={handleKeyPress}
          onChange={(e) => setCurrentTag(e.target.value)}
        />
      </>
    );
  };

  return <Controller name={name} control={control} defaultValue={[]} render={renderInput} />;
}
