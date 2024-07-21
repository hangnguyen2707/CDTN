import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiGetPublicProvinces, apiGetPublicDistrict, apiGetPublicWard, apiUpdatePackageById } from '../../../../../services/package';
import "./UpdatePackage.scss";

function UpdatePackageModal(props) {
  const [receiverProvinces, setReceiverProvinces] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [receiverWards, setReceiverWards] = useState([]);

  const [receiverProvince, setReceiverProvince] = useState('');
  const [receiverDistrict, setReceiverDistrict] = useState('');
  const [receiverWard, setReceiverWard] = useState('');

  const [reset, setReset] = useState(false);
  const [validated, setValidated] = useState(false);

  // console.log(props)
  const { order } = props
  console.log(order)
  const [price, setPrice] = useState('')
  const [formData, setFormData] = useState({})
  useEffect(() => {
    // console.log('YES')
      setFormData({
        ...order,
        receiverAddress1: {
          province: "",
          district: "",
          ward: "",
          street: "",
        },
        weight: "",
      });
      setPrice(order?.shippingCost);
    
  }, [order])
  

  useEffect(() => {
    const calculatedPrice = 3000 * parseFloat(formData?.weight) || 0;
    if (calculatedPrice > 10000) {
      setPrice(calculatedPrice);
      formData.shippingCost = String(calculatedPrice) 
      // console.log(formData?.shippingCost)
    }
    else { 
      setPrice(10000);
    formData.shippingCost = String(price)
  }
  }, [formData?.weight]);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setReceiverProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    setReceiverDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(receiverProvince);
      if (response.status === 200) {
        setReceiverDistricts(response.data?.results);
      }
    };
    receiverProvince && fetchPublicDistrict();
    !receiverProvince ? setReset(true) : setReset(false);
    !receiverProvince && setReceiverDistricts([]);
  }, [receiverProvince]);

  useEffect(() => {
    setReceiverWard(null);
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWard(receiverDistrict);
      if (response.status === 200) {
        setReceiverWards(response.data?.results);
      }
    };
    receiverDistrict && fetchPublicWard();
    !receiverDistrict ? setReset(true) : setReset(false);
    !receiverDistrict && setReceiverWards([]);
  }, [receiverDistrict]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    // console.log(formData)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return
    }
    if (form.checkValidity()) {
      apiUpdatePackageById(formData);
      console.log(formData);
      window.alert("Cập nhập thành công")
      window.location.reload();
    }
    setValidated(true);
    if (validated) {
      // apiCreatePackage(formData)
    }
};
const handleClose = () => {
  setReset(false);
  setValidated(false);
  setFormData({
    ...order,
    receiverAddress1: {
      province: "",
      district: "",
      ward: "",
      street: "",
    },
    weight: "",
  });
  setPrice(order?.shippingCost);

  props.onHide();
};

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      className="custom-modal"
      backdrop="static"
      size="lg"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Cập nhật thông tin đơn hàng
        </Modal.Title>
        <CloseIcon onClick={handleClose}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* Sender Information */}
          <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="senderName">
            <Form.Label>Tên người gửi</Form.Label>
            <Form.Control
              type="text"
              defaultValue={formData?.sender?.name}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Vui lòng nhập tên người gửi.
            </Form.Control.Feedback>
          </Form.Group>
            <Form.Group as={Col} md="6" controlId="senderPhone">
              <Form.Label>Số điện thoại người gửi</Form.Label>
              <Form.Control
                // required
                type="text"
                defaultValue={formData?.sender?.phone}
                // placeholder="Nhập số điện thoại người gửi"
                // defaultValue={formData?.sender?.phone}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập số điện thoại người gửi.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="receiverName">
              <Form.Label>Tên người nhận</Form.Label>
              <Form.Control
                // required
                type="text"
                // defaultValue={formData?.receiver?.name}
                // placeholder="Nhập tên người nhận"
                defaultValue={formData?.receiver?.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên người nhận.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="receiverPhone">
              <Form.Label>Số điện thoại người nhận</Form.Label>
              <Form.Control
                // required
                type="text"
                // placeholder="Nhập số điện thoại người nhận"
                defaultValue={formData?.receiver?.phone}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập số điện thoại người nhận.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} md='4' controlId="receiverAddressProvince">
    <Form.Label>Địa chỉ nhận</Form.Label>
    <Form.Control
      // required
      as="select"
      value={receiverProvince}
      onChange={(e) => {
        const selectedProvinceId = e.target.value;
        const selectedProvince = receiverProvinces.find(
          (province) => province.province_id === selectedProvinceId
        );

        setReceiverProvince(selectedProvinceId);
        setFormData((prevData) => ({
          ...prevData,
          receiverAddress1: {
            ...prevData.receiverAddress1,
            province: selectedProvince ? selectedProvince.province_name : "",
          },
        }));
      }}
      isInvalid={!receiverProvince && validated}  
    >
      <option value="">Chọn tỉnh</option>
      {receiverProvinces.map((province) => (
        <option key={province.province_id} value={province.province_id}>
          {province.province_name}
        </option>
      ))}
    </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="receiverAddressDistrict">
              <Form.Label></Form.Label>
              <Form.Control as="select" value={receiverDistrict} 
              // required
              onChange={(e) => {
                const selectedDistrictId = e.target.value;
                const selectedDistrict = receiverDistricts.find(
                  (district) => district.district_id === selectedDistrictId
                );
          
                setReceiverDistrict(selectedDistrictId);
                setFormData((prevData) => ({
                  ...prevData,
                  receiverAddress1: {
                    ...prevData.receiverAddress1,
                    district: selectedDistrict ? selectedDistrict.district_name : "",
                  },
                }));
              }}
                style={{ marginTop: '8px' }}>
                <option value="">Chọn quận</option>
                {receiverDistricts.map((district) => (
                  <option key={district.district_id} value={district.district_id}>
                    {district.district_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="receiverAddressWard">
            <Form.Label></Form.Label>
            <Form.Control
            // required
              as="select"
              value={receiverWard}
              onChange={(e) => {
                const selectedWardId = e.target.value;
                const selectedWard = receiverWards.find(
                  (ward) => ward.ward_id === selectedWardId
                );
          
                setReceiverWard(selectedWardId);
                setFormData((prevData) => ({
                  ...prevData,
                  receiverAddress1: {
                    ...prevData.receiverAddress1,
                    ward: selectedWard ? selectedWard.ward_name : "",
                  },
                }));
              }}
              style={{ marginTop: '8px' }}
            >
              <option value="">Chọn phường/xã</option>
              {receiverWards.map((ward) => (
                <option key={ward.ward_id} value={ward.ward_id}>
                  {ward.ward_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="receiverAddressTitle">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                // required
                type="text"
                // placeholder="Nhập số nhà, đường cụ thể"
                defaultValue={formData?.receiver?.address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập số nhà, đường người nhận.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
          <Form.Label>Tên đơn hàng</Form.Label>
          <Form.Control
            // required
            type="text"
            // placeholder="Nhập tên đơn hàng"
            defaultValue={formData?.name}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Vui lòng nhập tên đơn hàng.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="weight">
        <Form.Label>Kích thước đơn hàng (kg)</Form.Label>
        <Form.Control
          // required
          type="text"
          // placeholder="kg"
          defaultValue={formData?.weight}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid">
          Vui lòng nhập kích thước đơn hàng.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} controlId="price">
      <Form.Label>Giá vận chuyển (VND)</Form.Label>
      <Form.Control
        type="text"
        placeholder="Giá vận chuyển"
        value={price}
        readOnly
      />
    </Form.Group>
          </Row>
          <Row>
            <div className="text-center mt-3">
              <Button variant="secondary" onClick={handleSubmit} id="input-submit">
                Cập nhật
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
            </div>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdatePackageModal;