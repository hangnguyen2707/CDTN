import React from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { apiUpdatePackageById } from '../../../../../services/package';

const UpdateReceiveFromWarehouse = ({ showModal, handleClose, selectedPackage }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const transactionPointId = parseInt(localStorage.getItem('transactionPointId'), 10);
    const transactionPointName = localStorage.getItem('transactionPointName');
    selectedPackage.transactionPointEnd = {
      id: transactionPointId,
      name: transactionPointName,
    };
    const payload = {
      id: selectedPackage?.id,
      datePointEndReceived: new Date()
    }
    apiUpdatePackageById(payload)
    window.location.reload();
    console.log(selectedPackage);
    handleClose();
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nhận đơn hàng từ kho</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Xác nhận đơn hàng nhập điểm bưu cục</p>
        <p>Kho chuyển tới: {selectedPackage?.warehouseStart.name}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateReceiveFromWarehouse;
