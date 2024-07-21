import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactionPoints } from '../../../../../store/actions';
import { apiUpdatePackageById } from '../../../../../services/package';
const UpdateSendToTransaction = ({ showModal, handleClose, selectedPackage }) => {
  const dispatch = useDispatch();
  const { transactionPoints } = useSelector((state) => state.transactionPoint);
    const [transactions, setTransactions] = useState(transactionPoints);
  const [selectedTransactionPoint, setSelectedTransactionPoint] = useState('');
  useEffect(() => {
    dispatch(getAllTransactionPoints());
  }, []);
  
  console.log(selectedPackage)
  console.log(transactionPoints)
  
  useEffect(() => {
  const filteredTransactions = transactionPoints.filter((pk) => 
    pk.Warehouse?.id === selectedPackage?.warehouseEnd?.id
);
console.log(filteredTransactions)
    setTransactions(filteredTransactions);
  }, [selectedPackage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const warehouseId = parseInt(localStorage.getItem('transactionPointId'), 10);
    const warehouseName = localStorage.getItem('transactionPointName');
    
    selectedPackage.warehouseEnd = {
      id: warehouseId,
      name: warehouseName
    };
    
    const selectedWarehouseObj = transactions.find((warehouse) => warehouse.name === selectedTransactionPoint);

    if (selectedWarehouseObj) {
      selectedPackage.warehouseEnd = {
        id: selectedWarehouseObj.id,
        name: selectedWarehouseObj.name,
      };
    }

    const payload = {
      id: selectedPackage?.id,
      transactionPointEndId: selectedWarehouseObj.id,
      dateSendToPointEnd: new Date()
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
        <Modal.Title>Chuyển đơn hàng đến điểm giao dịch kế tiếp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <p>ID: {selectedPackage?.id}</p>
          <p>Người gửi: {selectedPackage?.sender.name}</p>
          <p>Người nhận: {selectedPackage?.receiver.name}</p>
          <Form.Group controlId="selectedWarehouse">
            <Form.Label>Điểm giao dịch kế tiếp:</Form.Label>
           <Form.Control
              as="select"
              value={selectedTransactionPoint}
              onChange={(e) => setSelectedTransactionPoint(e.target.value)}
            >
              <option value="">Chọn điểm giao dịch</option>
              {transactions.map((transaction) => (
                <option key={transaction.id} value={transaction.name}>
                  {transaction.name}
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

export default UpdateSendToTransaction;
