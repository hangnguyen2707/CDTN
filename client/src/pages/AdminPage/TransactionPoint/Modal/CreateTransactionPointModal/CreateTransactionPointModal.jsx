import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { apiGetLeaders } from '../../../../../services/user';
import { apiCreateNewPoint } from '../../../../../services/transactionpoint';
function CreateTransactionPointModal(props) {
  const [leaders, setLeaders] = useState([]);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    warehouseId: '',
    pointLeaderId: null,
    description: ''
  });

  const [formDataSubmit, setFormDataSubmit] = useState({
    name: '',
    address: '',
    warehouseId: '',
    pointLeaderId: '',
    description: ''
  });

  const { transactionPoints } = props;
  const {warehouses} = props;

  useEffect(() => {
    const fetchWarehouseLeader = async () => {
      try {
      const response = await apiGetLeaders('point')
      const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        if (err === 0) {
          setLeaders(data)
        } else {
          console.log(msg)
        }

      } catch (error) {
        console.error('Error fetching leaders:', error);
      }
    };
    fetchWarehouseLeader();
  }, []);


  const handleHide = () => {
    setFormData({
        name: '',
        address: '',
        warehouseId: '',
        pointLeaderId: '',
        description: ''
    });
    if (props.onHide) {
      props.onHide();
    }
  };


  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setFormDataSubmit({
        name: form.elements?.name.value,
        address: form.elements.address.value,
        warehouseId: form.elements.warehouseId.value,
        pointLeaderId: "",
        description: formData.elements?.description.value,
      });
      console.log(formData)
      const payload = {
        name: form.name,
        address: formData.address,
        warehouseId: formData.warehouse,
        pointLeaderId: formData.transactionPointLeader,
        description: formData.description,
      }
      apiCreateNewPoint(formData)
      window.location.reload()
      props.onHide();
      setFormData({
        name: '',
        address: '',
        warehouse: '',
        transactionPointLeader: '',
        description: '',
      });
    }
    };
  console.log(formDataSubmit)





  const setwarehouseId = (value) => {
    setFormData(prevData => ({
      ...prevData,
      warehouseId: value
    }));
  }

  const setpointLeaderId = (value) => {
    setFormData(prevData => ({
      ...prevData,
      pointLeaderId: value
    }));
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Tạo điểm bưu cục mới</Modal.Title>
        <CloseIcon onClick={handleHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Tên điểm bưu cục</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên kho hàng"
                value={formData?.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên điểm bưu cục.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }} className="mb-3">
            <Form.Group as={Col} controlId="address">
              <Form.Label>Địa chỉ điểm bưu cục</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên thành phố"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập địa chỉ.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="warehouseId">
              <Form.Label>Thuộc kho hàng</Form.Label>
              <Form.Control as="select" value={formData.warehouseId} onChange={(e) => setwarehouseId(e.target.value)}>
                <option>Chọn kho hàng</option>
                {warehouses.map((item) => (
                  <option key={item.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} md="12" controlId="description">
              <Form.Label>Mô tả điểm bưu cục</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập mô tả điểm bưu cục"
                value={formData?.description}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mô tả điểm bưu cục.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <div className="text-center mt-3" style={{ marginTop: '50px' }}>
              <Button variant="secondary" id="input-submit" type = "submit">
                Thêm
              </Button>
              <Button variant="secondary" onClick={handleHide}>
                Đóng
              </Button>
            </div>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateTransactionPointModal;
