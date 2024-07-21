import React from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { apiUpdatePackageById } from '../../../../../services/package';

const UpdateReceiveFromTransaction = ({ showModal, handleClose, selectedPackage }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const warehouseId = parseInt(localStorage.getItem('warehouseId'), 10);
    const warehouseName = localStorage.getItem('warehouseName');
    selectedPackage.warehouseEnd = {
      id: warehouseId,
      name: warehouseName,
    };
    console.log(localStorage);
    console.log(selectedPackage);
    const payload = {
      id: selectedPackage?.id,
      dateWarehouseStartReceived: new Date()
    }
    apiUpdatePackageById(payload)
    window.location.reload();
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
        <Modal.Title>Nhận đơn hàng từ điểm giao dịch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Xác nhận đơn hàng nhập kho hàng {localStorage.getItem('warehouseId')}:</p>
        <p>ID: {selectedPackage?.id}</p>
        <p>Ngưởi gửi: {selectedPackage?.sender.name}</p>
        <p>Người nhận: {selectedPackage?.receiver.name}</p>
        <p>Điểm giao dịch chuyển tới: {selectedPackage?.transactionPointStart.name}</p>
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

export default UpdateReceiveFromTransaction;
