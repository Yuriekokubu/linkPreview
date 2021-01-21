import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalButton = ({ deleteLink, LinkId, linkName }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    deleteLink(LinkId);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="px-2 py-1" variant="danger" onClick={handleShow}>
        <i className="fas fa-close"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการลบ </Modal.Title>
        </Modal.Header>
        <Modal.Body>คุณต้องการลบลิ้ง {linkName} ใช่หรือไม่ ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(LinkId)}>
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalButton;
