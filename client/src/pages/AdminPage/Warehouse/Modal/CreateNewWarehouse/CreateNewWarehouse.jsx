import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../../../../../services/package';
import './CreateNewWarehouse.scss'
import { apiLeader } from '../../../../../services/auth';
import { apiGetLeaders } from '../../../../../services/user';
import { apiCreateNewWarehouse } from '../../../../../services/warehouse';
function CreateNewWarehouseModal(props) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [leaders, setLeaders] = useState([]);
  const [reset, setReset] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    // leaderId: null,
    description: ''
  });

  const [formDataSubmit, setFormDataSubmit] = useState({
    name: '',
    address: '',
    // leaderId: '',
    description: ''
  });


  const { warehouses } = props;

  // console.log(warehouses);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);

  const handleHide = () => {
    setFormData({
      name: '',
      address: '',
      // leaderId: '',
      description: ''
    });
    if (props.onHide) {
      props.onHide();
    }
  };


  useEffect(() => {
    const fetchWarehouseLeader = async () => {
      try {
      const response = await apiGetLeaders('warehouse')
      const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        console.log(data)
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

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);

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
      setFormData({
        name: form.elements?.name.value,
        address: form.elements.address.value,
        // leaderId: form.elements.leaderId.value,
        description: form.elements.description.value
      });

      console.log(formData)
      apiCreateNewWarehouse(formData)
      window.location.reload();

      props.onHide();
      setFormData({
        name: '',
        address: '',
        // leaderId: '',
        description: ''

      });
    }
  };

  console.log(formDataSubmit)


  const setleaderId = (value) => {
    setFormData(prevData => ({
      ...prevData,
      leaderId: value
    }));
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static">
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Tạo kho hàng mới</Modal.Title>
        <CloseIcon onClick={handleHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Tên kho hàng</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên kho hàng"
                value={formData?.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên kho hàng.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }} className="mb-3">
            <Form.Group as={Col} controlId="address">
              <Form.Label>Tỉnh/Thành phố</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên thành phố"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên thành phố.
              </Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col} controlId="description">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập mô tả"
                value={formData.description}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mô tả.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <div className="text-center mt-3" style={{ marginTop: '50px' }}>
              <Button variant="secondary" id="input-submit" type = "submit">
                Tạo mới
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

export default CreateNewWarehouseModal;
