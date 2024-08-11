import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
function DeleteTransactionPointModal(props) {
  const [validated, setValidated] = useState(false);


  const handleHide = () => {
    if (props.onHide) {
      props.onHide();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
  
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      props.onHide(); 
    }
  };

  const {transaction} = props;

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static" size = "sm" >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Xác nhận xóa điểm bưu cục?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <div className="text-center mt-3" style={{ display: 'flex', flexDirection : 'row', gap: "50px", justifyContent: 'center' }}>
              <Button variant="secondary" id="input-submit" type = "submit" style = {{backgroundColor: 'red'}}>
                Xác nhận
              </Button>
              <Button variant="secondary" onClick={handleHide}>
                Hủy
              </Button>
            </div>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteTransactionPointModal;
