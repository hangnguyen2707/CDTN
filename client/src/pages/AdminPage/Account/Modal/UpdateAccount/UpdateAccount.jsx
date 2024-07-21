import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { getAllWarehouses, getAllTransactionPoints } from "../../../../../store/actions";
import { apiUpdateUserById } from "../../../../../services/user";
import { apiLeader } from "../../../../../services/auth";
import { apiUpdateWarehouseById } from "../../../../../services/warehouse";
import { apiUpdatePointById } from "../../../../../services/transactionpoint";

function UpdateAccountModal(props) {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const { warehouses } = useSelector((state) => state.warehouse);
  const { transactionPoints } = useSelector((state) => state.transactionPoint);
  const [noLeaderWarehouses, setNoLeaderWarehouses] = useState([])
  const [noLeaderPoints, setNoLeaderPoints] = useState([])

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

  const { account } = props;
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    role: "",
    workLocation: "",
  });
  useEffect(() => {
    if (account) {
      setFormData({
        ...account,
        userName: account.name || "",
        phone: account.phone || "",
        email: account.email || "",
        role: account.accountType || "",
        workLocation:
          account.Warehouses[0]?.name ||
          account.TransactionPoints[0]?.name ||
          "",
      });
    }
  }, [account]);


  const handleInputChange = (event) => {
    const { id, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
      const payload ={
        id: account.id,
        name: formData.userName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        accountType: formData.role
      }
      apiUpdateUserById(payload)
        if (formData.workLocation) {
          if (account.accountType === 'WAREHOUSE_LEADER') {
            const payloadWarehouse = {
              id: account.Warehouses[0]?.id,
              leaderId: null
            }
            apiUpdateWarehouseById(payloadWarehouse)
          } else if (account.accountType === 'POINT_LEADER') {
            const payloadPoint = {
              id: account.TransactionPoints[0]?.id,
              pointLeaderId: null
            }
            apiUpdatePointById(payloadPoint)
          }
          const data = {
            accountType : formData.role,
            phone: formData.phone,
            positionId: formData.workLocation
          }
          apiLeader(data)

      }
      window.alert("Cập nhật thông tin thành công")
      window.location.reload()
      // props.onHide();
      // setFormData({
      //   userName: "",
      //   phone: "",
      //   role: "",
      //   workLocation: "",
      // });
    }
  };

  const handleHide = () => {
    setFormData({
      ...account,
      userName: account.name || "",
      phone: account.phone || "",
      email: account.email || "",
      role: account.accountType || "",
      workLocation:
        account.Warehouses[0]?.name ||
        account.TransactionPoints[0]?.name ||
        "",
    });
    if (props.onHide) {
      props.onHide();
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
          Cập nhật tài khoản
        </Modal.Title>
        <CloseIcon onClick={handleHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="userName">
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control
                type="text"
                value={formData.userName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="phone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Form.Group as={Col} md="6" controlId="role">
              <Form.Label>Chọn chức vụ</Form.Label>
              <Form.Control
                as="select"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Chọn chức vụ</option>
                <option value="POINT_LEADER">Trưởng điểm</option>
                <option value="WAREHOUSE_LEADER">Trưởng kho</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="workLocation">
              <Form.Label>Vị trí làm việc</Form.Label>
              <Form.Control
                as="select"
                value={formData.workLocation}
                onChange={handleInputChange}
              >
                <option value="">Chọn vị trí làm việc</option>
                {formData.role === "WAREHOUSE_LEADER"
                  ? noLeaderWarehouses.map((warehouse) => (
                      <option key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </option>
                    ))
                  : noLeaderPoints.map((transactionPoint) => (
                      <option
                        key={transactionPoint.id}
                        value={transactionPoint.id}
                      >
                        {transactionPoint.name}
                      </option>
                    ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Vui lòng chọn vị trí làm việc.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <div className="text-center mt-3" style={{ marginTop: "50px" }}>
              <Button variant="secondary" type="submit" id="input-submit">
                Cập nhật
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

export default UpdateAccountModal;
