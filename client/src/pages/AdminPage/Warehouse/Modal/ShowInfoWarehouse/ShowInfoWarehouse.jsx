import React, { useState, useEffect } from 'react';
import "./ShowInfoWarehouse.css"
import { Modal, Tabs, Tab, ModalBody } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import avt from "../../../../../assets/images/avt.jpg"
import { apiGetAllPackages } from '../../../../../services/package';
import { apiGetPackagesOfWarehouse, apiGetPointsOfWarehouse } from '../../../../../services/warehouse';
import {  apiGetEmployees } from '../../../../../services/auth';


function ShowInfoWarehouse(props) {
  const [activeTab, setActiveTab] = useState('tab1');
  const { warehouse } = props;
  const [packages, setPackages] = useState([]);
  const [warehousePoint, setWarehousePoint] = useState([]);
  const [warehouseEmployees, setWarehouseEmployees] = useState([]);
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };



  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await apiGetPackagesOfWarehouse(warehouse.id);
        const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        console.log(data)
        if (err === 0) {
          setPackages(data);
        } else {
          console.log(msg)
        }

      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPackages();
  }, [warehouse]);
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await apiGetPointsOfWarehouse(warehouse?.id);
        const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        console.log(data)
        if (err === 0) {
          setWarehousePoint(data);
        } else {
          console.log(msg)
        }

      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchPoints();
  }, [warehouse]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const payload = {
          type: 'warehouse',
          positionId: String(warehouse?.id)

        }
        const response = await apiGetEmployees(payload)
        const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        console.log(data)
        if (err === 0) {
          setWarehouseEmployees(data);
        } else {
          console.log(msg)
        }

      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };
    fetchEmployees();
  }, [warehouse]);

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static" size="lg">
      <Modal.Header>
        <Tabs activeKey={activeTab} onSelect={handleTabSelect}>
          <Tab eventKey="tab1" title="Trưởng kho">
          </Tab>
          <Tab eventKey="tab2" title="Điểm bưu cục">
          </Tab>
          {/* <Tab eventKey="tab3" title="Đơn hàng">
          </Tab>
          <Tab eventKey="tab4" title="Nhân viên">
          </Tab> */}
        </Tabs>
        <CloseIcon onClick={props.onHide}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        {activeTab === 'tab1' &&
          <div>
            {warehouse && warehouse.warehouseLeader && (
              <div style={{ display: 'flex', gap: '70px' }}>
                <div style={{ marginLeft: '10%', marginRight: '10%' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Mã nhân viên:</strong>
                    </label>
                    <p>

                      {warehouse?.warehouseLeader?.user_id}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Họ và tên:</strong>
                    </label>
                    <p>
                      {warehouse?.warehouseLeader?.name}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Số điện thoại:</strong>
                    </label>
                    <p>

                      {warehouse?.warehouseLeader?.phone}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <label>
                      <strong>Email:</strong>
                    </label>
                    <p>

                      {warehouse?.warehouseLeader?.email}
                    </p>
                  </div>
                </div>
                <img src={avt} style={{ width: '150px', height: '150px' }}></img>
              </div>
            )}
          </div>
        }
        {activeTab === 'tab2' &&
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <ul>
              {warehousePoint.map(item => (
                <li key={item?.id}>
                  <div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên điểm bưu cục:</strong>
                      </label>
                      <p>
                        {item?.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên trưởng điểm:</strong>
                      </label>
                      <p>
                        {item?.pointLeader?.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Số điện thoại trưởng điểm:</strong>
                      </label>
                      <p>

                        {item?.pointLeader?.phone}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Địa chỉ: </strong>
                      </label>
                      <p>
                        {item?.address}
                      </p>
                    </div>
                    <hr></hr>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }
        {activeTab === 'tab3' &&
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <ul>
              {packages.map((packageItem, index) => (
                <li key={index}>
                  <div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Mã đơn hàng: </strong>
                      </label>
                      <p>
                        {packageItem?.packageCode}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên người gửi: </strong>
                      </label>
                      <p>
                        {packageItem?.sender?.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên người nhận: </strong>
                      </label>
                      <p>
                        {packageItem?.receiver?.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Tên đơn hàng: </strong>
                      </label>
                      <p>
                        {packageItem?.name}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Phí vận chuyển:</strong>
                      </label>
                      <p>
                        {packageItem?.shippingCost}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label>
                        <strong>Trạng thái:</strong>
                      </label>
                      <p>

                        {packageItem?.Status?.nameOfStatus}
                      </p>
                    </div>
                    <hr></hr>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        }
        {activeTab === 'tab4' &&
          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <ul>
              {warehouseEmployees.map(item => (
                <li key={item?.id}>
                  <div>
                    <div style={{ marginLeft: '10%', marginRight: '10%' }}>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <label>
                          <strong>Mã nhân viên:</strong>
                        </label>
                        <p>
                          {item?.id}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <label>
                          <strong>Họ và tên:</strong>
                        </label>
                        <p>
                          {item?.name}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <label>
                          <strong>Số điện thoại:</strong>
                        </label>
                        <p>
                          {item?.phone}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <label>
                          <strong>Địa chỉ:</strong>
                        </label>
                        <p>
                          {item?.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                </li>
              ))}
            </ul>
          </div>
        }
      </Modal.Body>
    </Modal>
  );
}

export default ShowInfoWarehouse;