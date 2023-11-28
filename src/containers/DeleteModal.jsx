import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ showModal, setShowModal, removeAllCompletedTasks }) => {
  const handleClose = () => setShowModal(false);

  const deleteConfirmed = () => {
    handleClose();
    removeAllCompletedTasks();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Danger zone 😱</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This will delete all compleated tasks. Are you sure?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={deleteConfirmed}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
