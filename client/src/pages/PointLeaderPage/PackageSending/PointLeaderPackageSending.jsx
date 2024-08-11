import React, { useState, useEffect } from "react";
import {
  calculateRange,
  sliceData,
  nextPage,
  prevPage,
  lastPage,
  firstPage,
} from "../../../utils/table-pagination";
import { useNavigate } from 'react-router-dom'
import DoneIcon from "../../../assets/icons/done.svg";
import CancelIcon from "../../../assets/icons/cancel.svg";
import ShippingIcon from "../../../assets/icons/shipping.svg";
import HeaderRole from "../../../conponents/HeaderRole/HeaderRole";
import { Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HeaderRoleNoButton from "../../../conponents/HeaderRole/HeaderRoleNoButton/HeaderRoleNoButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages} from "../../../store/actions/package";
import { getAllTransactionPoints } from "../../../store/actions";
import { apiGetPackagesOfPoint } from "../../../services/transactionpoint";
// import UpdateReceiveFromWarehouse from "./Modal/UpdateReceiveFromWarehouse/UpdateReceiveFromWarehouse";
import ShowInfoPackage from "../../AdminPage/Package/Modal/ShowInfoPackage/ShowInfoPackage"

function PointLeaderPackageSending() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { packages } = useSelector((state) => state.package);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showInfoPackage, setShowInfoPackage] = useState(false);
  const [statusPackage, setStatusPackage] = useState('');
  const [transactionPointName, setTransactionPointName] = useState("");
  const { transactionPoints } = useSelector((state) => state.transactionPoint);
  const [isTab1, setIsTab1] = useState(true);
  const [isTab2, setIsTab2] = useState(false);


  const handleTab1Click = () => {
    navigate("/pointLeader/packageSending");
  };

  const handleTab2Click = () => {
    navigate('/pointLeader/packageReceivering');
  };
  
  useEffect(() => {
    dispatch(getAllTransactionPoints());
  }, []);
  
  useEffect(() => {
  const selectedTransactionPoint = transactionPoints.find(
    (transactionPoint) => transactionPoint.id == localStorage.getItem('transactionPointId')
  );

  if (selectedTransactionPoint) {
    setTransactionPointName(selectedTransactionPoint.name);
  } else {
    setTransactionPointName("");
  }
}, [transactionPoints]);
  
useEffect(() => {
  const fetchPackages = async () => {
    const pointId = localStorage.getItem('transactionPointId');
    try {
      const response = await apiGetPackagesOfPoint(pointId);
      const data = response?.data.response;
      const err = response?.data.err;
      const msg = response?.data.msg;
      console.log(data);
      if (err === 0) {
        const filteredPackages = data.filter((pk) =>
      pk.transactionPointStart.id === parseInt(localStorage.getItem('transactionPointId')) && pk?.Status?.nameOfStatus === "DELIVERING"
      && pk?.Status?.dateSendToWarehouseStart === null
    );

        setFilteredPackages(filteredPackages);
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  fetchPackages();
}, []);

  useEffect(() => {
    setPagination(calculateRange(filteredPackages, 4));
    setPage(1);
  }, [filteredPackages]);

  useEffect(() => {
    setOrders(sliceData(filteredPackages, page, 4));
  }, [page, filteredPackages]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowInfoPackage(false);
  };

  const handleOpenUpdateModal = (order) => {
    setIsUpdateModalOpen(true);
    setSelectedPackage(order);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  function formatDateTime(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);

    const day = dateTime.getUTCDate().toString().padStart(2, '0');
    const month = (dateTime.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = dateTime.getUTCFullYear();
    const hours = dateTime.getUTCHours().toString().padStart(2, '0');
    const minutes = dateTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = dateTime.getUTCSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const handleShowInfoPackage = (order) => {
    // console.log(order);
    setSelectedPackage(order)
    const statusTimes = [
      [order.Status.datePointEndReceived,
      order.transactionPointEnd && order.transactionPointEnd?.name ? order.transactionPointEnd?.name + " đang chuyển đơn hàng." : null],

      [order.Status.dateReceiverReturn, 'Người nhận trả lại hàng lúc ' + formatDateTime(order.Status.dateReceiverReturn)],

      [order.Status.dateSendPackage, 'Người gửi gửi đơn hàng tại điểm bưu cục ' + order.transactionPointStart?.name + " lúc " + formatDateTime(order.Status.dateSendPackage)],

      [order.Status.dateSendToPointEnd,
      order.transactionPointEnd && order.transactionPointEnd?.name ?
        "Đơn hàng chuyển tới điểm bưu cục " + order.transactionPointEnd?.name + " lúc " + formatDateTime(order.Status.dateSendToPointEnd) : null],

      [order.Status.dateSendToReceiver, "Đơn hàng đã chuyển tới người nhận lúc " + formatDateTime(order.Status.dateSendToReceiver)],

      [order.Status.dateSendToWarehouseEnd, order.warehouseEnd && order.warehouseEnd?.name ?
        "Đơn hàng rời khỏi kho " + order.warehouseStart?.name + " lúc " + formatDateTime(order.Status.dateSendToWarehouseEnd) : null],

      [order.Status.dateSendToWarehouseStart, order.warehouseStart && order.warehouseStart?.name ?
        "Đơn hàng rời khỏi điểm bưu cục " + order.transactionPointStart?.name + " lúc " + formatDateTime(order.Status.dateSendToWarehouseStart) : null],

      [order.Status.dateWarehouseEndReceived, order.warehouseEnd && order.warehouseEnd?.name ?
        "Đơn hàng nhập kho " + order.warehouseEnd?.name + " lúc " + formatDateTime(order.Status.dateWarehouseEndReceived) : null],

      [order.Status.dateWarehouseStartReceived, order.warehouseStart && order.warehouseStart?.name ?
        "Đơn hàng nhập kho " + order.warehouseStart?.name + " lúc " + formatDateTime(order.Status.dateWarehouseStartReceived) : null],

      [order.Status.receivedDate, "Đơn hàng được trả lại lúc " + order.Status.receivedDate]
    ];
  
    const filteredStatusTimes = statusTimes.filter(time => time[0] !== null);
  
    filteredStatusTimes.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    setStatusPackage(filteredStatusTimes);
    setShowInfoPackage(true)
    
  };

  // Search
 

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearch(searchText);

    if (searchText !== '') {
        let searchResults = filteredPackages.filter((item) =>
            (item?.first_name && typeof item.first_name === 'string' && item.first_name.toLowerCase().includes(searchText)) ||
            (item?.last_name && typeof item.last_name === 'string' && item.last_name.toLowerCase().includes(searchText)) ||
            (item?.product && typeof item.product === 'string' && item.product.toLowerCase().includes(searchText))
        );
        setOrders(sliceData(searchResults, 1, 4));
        setPagination(calculateRange(searchResults, 4));
        setPage(1); // Reset to the first page when searching
    } else {
        setOrders(sliceData(filteredPackages, page, 4));
        setPagination(calculateRange(filteredPackages, 4));
    }
};
  // Change Page
  const handleChangePage = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
    }
  };

  const handleNextPage = () => {
    nextPage(page, pagination.length, setPage);
  };

  const handlePrevPage = () => {
    prevPage(page, setPage);
  };

  const handleLastPage = () => {
    lastPage(page, pagination.length, setPage);
  };

  const handleFirstPage = () => {
    firstPage(page, setPage);
  };



  return (
    <div className="dashboard-content">
    <HeaderRoleNoButton
    variant="primary"
    onClick={handleOpenModal}
  />
      <div className="dashboard-content-container">
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px' }}>
        <Button style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleTab1Click}>Thống kê hàng gửi đi</Button>
        <Button style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleTab2Click}>Thống kê hàng gửi đến</Button>
      </div>
        <div className="dashboard-content-header">
          <h2>Các đơn hàng chuẩn bị gửi đi</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={handleSearch}
            />
          </div>
        </div>
        <table>
          <thead>
            <th>MÃ VẬN ĐƠN</th>
            <th>NGÀY GỬI</th>
            <th>TRẠNG THÁI</th>
            <th>ĐIỂM KẾ TIẾP</th>
            <th>CƯỚC PHÍ</th>
            <th>CẬP NHẬT LẦN CUỐI</th>
          </thead>

          {filteredPackages.length !== 0 ? (
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td><span>{order.packageCode}</span></td>
                  <td><span>{order?.Status?.dateSendPackage}</span></td>
                  <td>
                    <div>
                      {order?.Status?.nameOfStatus === "DELIVERING" ? (
                        <img
                          src={ShippingIcon}
                          alt="paid-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order?.Status?.nameOfStatus === "FAILED" ? (
                        <img
                          src={CancelIcon}
                          alt="canceled-icon"
                          className="dashboard-content-icon"
                        />
                      ) : order?.Status?.nameOfStatus === "SUCCESS" ? (
                        <img
                          src={DoneIcon}
                          alt="refunded-icon"
                          className="dashboard-content-icon"
                        />
                      ) : null}
                      {order?.Status?.nameOfStatus === "DELIVERING" ? (
                        <span>Đang vận chuyển</span>
                      ) : order?.Status?.nameOfStatus === "FAILED" ? (
                        <span>Hoàn trả</span>
                      ) : order?.Status?.nameOfStatus === "SUCCESS" ? (
                        <span>Đã giao</span>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <span></span>
                  </td>
                  <td>
                    <span>{order.shippingCost}</span>
                  </td>
                  <td>
                    <span>2024-08-14T14:40:22.000Z</span>
                  </td>
                  {/*  <td>
        <span>{order.warehouseStart.name}</span>
      </td>*/}
                  <li className="list-inline-item">
                    <button
                      className="btn btn-secondary btn-sm rounded-0"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="View All"
                      onClick={(e) => handleShowInfoPackage(order)}
                    >
                      <i className="fa fa-eye"></i>
                      {/* Use the appropriate icon class here */}
                    </button>
                  </li>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>

        <ShowInfoPackage
            show={showInfoPackage}
            order = {selectedPackage}
            statusPackage = {statusPackage}
            onHide={handleCloseModal}
          />

        {filteredPackages.length !== 0 ? (
          <div className="dashboard-content-footer">
            <span
              className="pagination"
              onClick={handleFirstPage}
              disabled={page === 1}
            >
              {"<<"}
            </span>
            <span
              className="pagination"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              {"<"}
            </span>
            {pagination.map((item, index) => (
              <span
                key={index}
                className={item === page ? "active-pagination" : "pagination"}
                onClick={() => handleChangePage(item)}
              >
                {item}
              </span>
            ))}
            <span
              className="pagination"
              onClick={handleNextPage}
              disabled={page === pagination.length}
            >
              {">"}
            </span>
            <span
              className="pagination"
              onClick={handleLastPage}
              disabled={page === pagination.length}
            >
              {">>"}
            </span>
          </div>
        ) : (
          <div className="dashboard-content-footer">
            <span className="empty-table">No data</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default PointLeaderPackageSending;
