import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup, Row, Col } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { apiGetLeaders } from "../../../../../services/user";
import { apiUpdateWarehouseById } from "../../../../../services/warehouse";

function UpdateWarehouseModal(props) {
  const { warehouses } = useSelector((state) => state.warehouse);
  const [validated, setValidated] = useState(false);
  const [leaders, setLeaders] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    warehouseLeader: "",
    leaderId: "",
    description: ""
  });
  const { selectWarehouse } = props;
  // console.log(selectWarehouse);
  const [reset, setReset] = useState(false);

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
    if (selectWarehouse) {
      setFormData({
        ...selectWarehouse,
        name: selectWarehouse?.name,
        address: selectWarehouse.address,
        selectWarehouseLeader: selectWarehouse.warehouseLeader?.name,
        leaderId: selectWarehouse.warehouseLeader?.id,
        description: selectWarehouse?.description

      });
    }
  }, [selectWarehouse]);


  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (form.checkValidity()) {
      apiUpdateWarehouseById(formData);
      window.alert("Cập nhật kho thành công")
      window.location.reload()
    }
    setValidated(true);
    if (validated) {
      // apiCreatePackage(formData)
    }
  };

  const handleHide = () => {
    setReset(false);
    setValidated(false);
    setFormData({
      ...selectWarehouse,
      warehouseLeader: "",
      leaderId: "",
    });

    props.onHide();
  };

  const setWarehouseLeader = (value) => {
    console.log(value)
    const selectedName = leaders.find((item) => {
      return item?.id?.toString() === value.id;
    })?.name || '';

    setFormData(prevData => ({
      ...prevData,
      warehouseLeader: selectedName,
      leaderId: value
    }));
  }

  // console.log(formData)
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      className="custom-modal"
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Cập nhật kho hàng
        </Modal.Title>
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
                // defaultValue={warehouse.name}
                value={formData?.name}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên kho hàng.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "10px" }} className="mb-3">
            <Form.Group as={Col} md="7" controlId="address">
              <Form.Label>Tỉnh/Thành phố</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ cụ thể"
                  aria-describedby="inputGroupPrepend"
                  required

                  value={formData?.address}

                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập địa chỉ.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            {/* <Form.Group as={Col} md="5" controlId="warehouseLeader">
              <Form.Label>Trưởng kho hàng</Form.Label>

              <Form.Control
                as="select"
                value={formData.leaderId}
                onChange={(e) => setFormData({ ...formData, leaderId: String(e.target.value)  })}
              >
                <option value="">Chọn trưởng kho</option>
                {leaders.map((item) => (
                  <option key={item?.id} value={item?.id} >
                    {item?.name}

                  </option>
                ))}
              </Form.Control>
            </Form.Group> */}
          </Row>
          <Row>
          <Form.Group as={Col} controlId="description">
              <Form.Label>Mô tả</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Nhập mô tả"
                  aria-describedby="inputGroupPrepend"
                  required

                  value={formData?.description}

                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập mô tả.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <div className="text-center mt-3" style={{ marginTop: "50px" }}>
              <Button
                variant="secondary"
                // type="submit"
                id="input-submit"
                onClick={handleSubmit}
              >
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

export default UpdateWarehouseModal;
