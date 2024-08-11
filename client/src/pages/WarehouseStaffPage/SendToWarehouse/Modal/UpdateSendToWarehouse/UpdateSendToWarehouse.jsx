import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWarehouses } from '../../../../../store/actions';
import { apiUpdatePackageById } from '../../../../../services/package';
const UpdateSendToWarehouse = ({ showModal, handleClose, selectedPackage }) => {
  const dispatch = useDispatch();
  const { warehouses } = useSelector((state) => state.warehouse);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  
  useEffect(() => {
    dispatch(getAllWarehouses());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const warehouseId = parseInt(localStorage.getItem('transactionPointId'), 10);
    const warehouseName = localStorage.getItem('transactionPointName');
    
    selectedPackage.warehouseEnd = {
      id: warehouseId,
      name: warehouseName
    };

    const selectedWarehouseObj = warehouses.find((warehouse) => warehouse.name === selectedWarehouse);

    if (selectedWarehouseObj) {
      selectedPackage.warehouseEnd = {
        id: selectedWarehouseObj.id,
        name: selectedWarehouseObj.name,
      };
    }

    const payload = {
      id: selectedPackage?.id,
      warehouseEndId: selectedWarehouseObj.id,
      dateSendToWarehouseEnd: new Date()
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
          <Form.Group controlId="selectedWarehouse">
            <Form.Label>Kho kế tiếp:</Form.Label>
           <Form.Control
              as="select"
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
            >
              <option value="">Chọn kho</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.name}>
                  {warehouse.name}
                </option>
              ))}
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

export default UpdateSendToWarehouse;
