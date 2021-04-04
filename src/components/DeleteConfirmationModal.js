import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

export default function DeleteConfirmationModal({ show, onHide, onDelete, children }) {
  const [isDeleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    setDeleting(true);
    await onDelete();
    setDeleting(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} backdrop={isDeleting ? 'static' : true}>
      <Modal.Header>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting && <Spinner animation="border" size="sm" className="mr-2" role="status" aria-hidden="true" />}
          {isDeleting ? 'Deleting' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
