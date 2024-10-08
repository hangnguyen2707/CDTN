import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWarehouses,
  getAllTransactionPoints,
} from "../../../../../store/actions";
import { apiEmployee, apiLeader, apiRegister } from "../../../../../services/auth";
function CreateNewAccountModal(props) {
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [noLeaderWarehouses, setNoLeaderWarehouses] = useState([])
  const [noLeaderPoints, setNoLeaderPoints] = useState([])
  const { warehouses } = useSelector((state) => state.warehouse);
  const { transactionPoints } = useSelector((state) => state.transactionPoint);
  useEffect(() => {
    dispatch(getAllWarehouses());
  }, []);
  useEffect(() => {
    dispatch(getAllTransactionPoints());
  }, []);
  useEffect(() => {
    const filteredWarehouses = warehouses.filter(warehouse => warehouse.warehouseLeader === null);
    console.log(filteredWarehouses)
    setNoLeaderWarehouses(filteredWarehouses)
  }, [warehouses])

  useEffect(() => {
    const filteredPoints = transactionPoints.filter(warehouse => warehouse.pointLeader === null);
    console.log(filteredPoints)
    setNoLeaderPoints(filteredPoints)
  }, [transactionPoints])
  const [formData, setFormData] = useState({
    user_id: "",
    username: "",
    name: "",
    phone: "",
    email: "",
    // address: "",
    password: "",
    accountType: "POINT_STAFF",
    positionId: localStorage.getItem('transactionPointId'),
  });

  const handleHide = () => {
    setFormData({
      user_id: "",
      username: "",
      name: "",
      phone: "",
      email: "",
      // address: "",
      password: "",
      accountType: "POINT_STAFF",
      positionId: localStorage.getItem('transactionPointId'),
    });
    if (props.onHide) {
      props.onHide();
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if (formData.phone[0] !== '0' || !(formData.phone.match('[0-9]{10}'))) {
        window.alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
        return;
      }
      console.log(formData)
      const fetchEmployee = async () => {
        const response = await apiEmployee(formData);
        window.alert("Tạo tài khoản thành công")
        window.location.reload()
      };
      const fetchCreateUser = async () => {
        const response = await apiRegister(formData);
        if (formData.positionId && !response.data.err) {
          fetchEmployee()

        } else {
          window.alert("Số điện thoại đã được đăng ký trước đó")
        }
      };



      fetchCreateUser()

      setFormData({
        user_id: "",
        username: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        accountType: "POINT_STAFF",
        positionId: localStorage.getItem('transactionPointId'),
      });
    }
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      className="custom-modal"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Tạo tài khoản giao dịch viên
        </Modal.Title>
        <CloseIcon onClick={handleHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="user_id">
              <Form.Label>Mã Nhân viên</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập mã nhân viên"
                value={formData.user_id}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mã nhân viên
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="username">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên đăng nhập.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="name">
              <Form.Label>Tên nhân viên</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập tên nhân viên"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên nhân viên.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="phone">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập số điện thoại.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="password">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mật khẩu.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          {/* <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập địa chỉ.
              </Form.Control.Feedback>
            </Form.Group>
          </Row> */}
          <Row style={{ marginTop: "10px" }}>
            <div className="text-center mt-3" style={{ marginTop: "50px" }}>
              <Button variant="secondary" id="input-submit" type="submit">
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

export default CreateNewAccountModal;
