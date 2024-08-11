import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWarehouses } from '../../../../../store/actions';
import { apiUpdatePackageById } from '../../../../../services/package';
const UpdateSendToWarehouse = ({ showModal, handleClose, selectedPackage }) => {
  const dispatch = useDispatch();
  const { warehouses } = useSelector((state) => state.warehouse);
  // const [selectedWarehouse, setSelectedWarehouse] = useState('');
  
  useEffect(() => {
    dispatch(getAllWarehouses());
  }, []);
  console.log(localStorage.getItem('warehouseId'))
  const selectedWarehouse = warehouses.find((warehouse) => warehouse.id === parseInt(localStorage.getItem('warehouseId'), 10));
  console.log(selectedWarehouse)

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
      dateSendToWarehouseStart: new Date()
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
        <Modal.Title>Chuyển đơn hàng đến kho kế tiếp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <p>ID: {selectedPackage?.id}</p>
          <p>Kho kế tiếp: {selectedWarehouse?.name}</p>
          
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

export default UpdateSendToWarehouse;
