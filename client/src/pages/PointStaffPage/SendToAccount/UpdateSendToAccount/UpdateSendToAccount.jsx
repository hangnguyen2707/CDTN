import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { apiUpdatePackageById } from '../../../../services/package';

const UpdateSendToAccount = ({ showModal, handleClose, selectedPackage }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    selectedPackage.Status.nameOfStatus = selectedStatus;
    console.log(selectedPackage);
    if (selectedStatus === 'SUCCESS') {
      const payload = {
        id: selectedPackage?.id,
        dateSendToReceiver: new Date(),
        receivedDate: new Date(),
        nameOfStatus: selectedStatus
      }
      console.log(payload)
      apiUpdatePackageById(payload)
    } else {
      const payload = {
        id: selectedPackage?.id,
        dateSendToReceiver: new Date(),
        dateReceiverReturn: new Date(),
        nameOfStatus: selectedStatus
      }
      console.log(payload)
      apiUpdatePackageById(payload)
    }

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
        <Modal.Title>Chuyển đơn hàng đến kho kế tiếp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <p>ID: {selectedPackage?.id}</p>
          <p>Người gửi: {selectedPackage?.sender.name}</p>
          <p>Người nhận: {selectedPackage?.receiver.name}</p>
          <Form.Group controlId="selectedWarehouse">
            <Form.Label>Trạng thái:</Form.Label>
            <Form.Control
              as="select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
            >
              <option value=""> Chọn trạng thái </option>
              <option value="SUCCESS">Đã giao hàng</option>
              <option value="FAILED">Giao không thành công</option>
            </Form.Control>
          </Form.Group>
          </Form>
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

export default UpdateSendToAccount;
