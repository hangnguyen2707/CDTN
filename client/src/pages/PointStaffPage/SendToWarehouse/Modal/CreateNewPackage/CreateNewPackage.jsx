import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiGetPublicProvinces, apiGetPublicDistrict, apiGetPublicWard, apiCreatePackage } from '../../../../../services/package';
import "./CreateNewPackage.scss";

function CreateNewPackageModal(props) {
  const [receiverProvinces, setReceiverProvinces] = useState([]);
  const [receiverDistricts, setReceiverDistricts] = useState([]);
  const [receiverWards, setReceiverWards] = useState([]);

  const [receiverProvince, setReceiverProvince] = useState('');
  const [receiverDistrict, setReceiverDistrict] = useState('');
  const [receiverWard, setReceiverWard] = useState('');

  const [reset, setReset] = useState(false);
  const [validated, setValidated] = useState(false);

  const [isShowInfor, setShowInfor] = useState(false);

  const [nameSender, setNameSender] = useState('');
  const [phoneSender, setPhoneSender] = useState('');
  const [addressSender, setAddressSender] = useState('');
  const [nameReceiver, setNameReceiver] = useState('');
  const [phoneReceiver, setPhoneReceiver] = useState('');
  const [addressReceiver, setAddressReceiver] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [shippingCost, setShippingCost] = useState('');

  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: " ",
    receiverName: "",
    receiverPhone: "",
    transactionPointStartId: localStorage.getItem("transactionPointId"),
    warehouseStartId: localStorage.getItem("warehouseId"),
    receiverAddress1: {
      province: "",
      district: "",
      ward: "",
      street: "",
    },
    name: "",
    weight: "",
    shippingCost: "",
    receiverAddress: "",
  });
  const [price, setPrice] = useState();

  useEffect(() => {
    const calculatedPrice = 3000 * parseFloat(formData.weight) || 0;
    if (calculatedPrice > 10000) {
      setPrice(calculatedPrice);
      formData.shippingCost = String(calculatedPrice)
      console.log(formData.shippingCost)
    }
    else {
      setPrice(10000);
      formData.shippingCost = String(price)
    }
  }, [formData.weight]);

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
    if (id === "receiverAddressTitle") {
      setFormData((prevData) => ({
        ...prevData,
        receiverAddress1: {
          ...prevData.receiverAddress1,
          street: value,
        },
        receiverAddress: `${value}, ${prevData.receiverAddress1.ward}, ${prevData.receiverAddress1.district}, ${prevData.receiverAddress1.province}`,
      }));
    }
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(formData)
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return
    }
    else {
      if (formData.senderPhone[0] !== '0' || !(formData.senderPhone.match('[0-9]{10}'))
        || formData.receiverPhone[0] !== '0' || !(formData.receiverPhone.match('[0-9]{10}'))) {
        window.alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
        return;
      }
    }
    if (form.checkValidity()) {
      setValidated(true);
    }
    else {

    }

    setNameSender(formData.senderName);
    setPhoneSender(formData.senderPhone);
    setAddressSender(formData.senderAddress);
    setNameReceiver(formData.receiverName);
    setPhoneReceiver(formData.receiverPhone);
    setAddressReceiver(formData.receiverAddress);
    setName(formData.name);
    setWeight(formData.weight);
    setShippingCost(formData.shippingCost);

    if (validated) {
      apiCreatePackage(formData);
      setReceiverProvince('');
      setReceiverDistrict('');
      setReceiverWard('');
      setFormData({
        senderName: "",
        senderPhone: "",
        senderAddress: " ",
        receiverName: "",
        receiverPhone: "",
        transactionPointStartId: localStorage.getItem("transactionPointId"),
        warehouseStartId: localStorage.getItem("warehouseId"),
        receiverAddress1: {
          province: "",
          district: "",
          ward: "",
          street: "",
        },
        name: "",
        weight: "",
        shippingCost: "",
        receiverAddress: "",
      });
      props.onHide();
      setShowInfor(true);
    }
  };

  const handleCloseShow = () => {
    setShowInfor(false);
    window.alert("Tạo đơn hàng thành công")
    window.location.reload();
  }
  const handleClose = () => {
    // Reset all form data and state values
    setReceiverProvince('');
    setReceiverDistrict('');
    setReceiverWard('');
    setReset(false);
    setValidated(false);
    setFormData({
      senderName: "",
      senderPhone: "",
      senderAddress: " ",
      receiverName: "",
      receiverPhone: "",
      transactionPointStartId: localStorage.getItem("transactionPointId"),
      warehouseStartId: localStorage.getItem("warehouseId"),
      receiverAddress1: {
        province: "",
        district: "",
        ward: "",
        street: "",
      },
      name: "",
      weight: "",
      shippingCost: "",
      receiverAddress: "",
    });
    setPrice(null);

    props.onHide();
  };


  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        className="custom-modal"
        backdrop="static"
        size="lg"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Ghi nhận đơn hàng
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
                  required
                  type="text"
                  placeholder="Nhập tên người gửi"
                  value={formData.senderName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập tên người gửi.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="senderPhone">
                <Form.Label>Số điện thoại người gửi</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập số điện thoại người gửi"
                  value={formData.senderPhone}
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
                  required
                  type="text"
                  placeholder="Nhập tên người nhận"
                  value={formData.receiverName}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập tên người nhận.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="receiverPhone">
                <Form.Label>Số điện thoại người nhận</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập số điện thoại người nhận"
                  value={formData.receiverPhone}
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
                  required
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
                  required
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
                  required
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
                <Form.Label>Số nhà, đường</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nhập số nhà, đường cụ thể"
                  value={formData.receiverAddress1.street}
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
                  required
                  type="text"
                  placeholder="Nhập tên đơn hàng"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập tên đơn hàng.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="weight">
                <Form.Label>Kích thước đơn hàng (kg)</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="kg"
                  value={formData.weight}
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
                  Thêm
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
              </div>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
      {isShowInfor && (
        <Modal
          show={isShowInfor}
          onHide={handleCloseShow}
          backdrop="static"
          keyboard={false}
          centered
          size="lg"
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Chi tiết đơn hàng
            </Modal.Title>
            <CloseIcon onClick={handleCloseShow}>Đóng</CloseIcon>
          </Modal.Header>
          <Modal.Body>
            {(
              <div className="packageForm">
                <div className="flex3">
                  <div className="infoPerson">
                    <div className="flex1">
                      <p>THÔNG TIN NGƯỜI DÙNG</p>
                    </div>
                    <div className="flex4">
                      <div className="flex5">
                        <p className="pLabel">
                          <strong>(*) Người gửi</strong>
                        </p>
                      </div>
                      <div className="flex5">
                        <p className="pLabel">Họ và tên: </p>
                        <p>{nameSender}</p>
                      </div>
                      <div className="flex5">
                        <p className="pLabel">Số điện thoại: </p>
                        <p>{phoneSender}</p>
                      </div>
                      <div className="flex5">
                        <p className="pLabel">Địa chỉ: </p>
                        <p>{addressSender}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="flex4">
                      <div className="flex5">
                        <p className="pLabel">
                          <strong>(*) Người nhận</strong>
                        </p>
                      </div>
                      <div className="flex5">
                        <p className="pLabel">Họ và tên: </p>
                        <p>{nameReceiver}</p>
                      </div>
                      <div className="flex5">
                        <p className="pLabel">Số điện thoại: </p>
                        <p>{phoneReceiver}</p>
                      </div>
                      <div className="flex5">
                        <p className="pLabel">Địa chỉ: </p>
                        <p>{addressReceiver}</p>
                      </div>
                    </div>
                  </div>
                  <div className="infoPackage">
                    <div className="flex1">
                      <p>THÔNG TIN ĐƠN HÀNG</p>
                    </div>
                    <div className="flex4">
                      {/* <div className="flex5">
                        <p className="pLabel">Mã đơn hàng: </p>
                        <p>{formData.name}</p>
                      </div> */}
                      <div className="flex5">
                        <p className="pLabel">Tên sản phẩm: </p>
                        <p>{name}</p>
                      </div>
                      <div className="flex5">
                        <p className="pLabel">Giá vận chuyển: </p>
                        <p>{shippingCost}</p>
                      </div>
                    
                      <div className="flex5">
                        <p className="pLabel">Chữ ký người gửi: </p>
                        <div style={{ marginLeft: '150px' }}>
                          <p>Mã QR đơn: </p>
                        </div>
                      </div>
                      <div className="flex5" style={{ display: 'flex', alignItems: 'center' }}>
                        <p className="pLabel">Chữ ký người nhận: </p>
                       
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseShow}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default CreateNewPackageModal;