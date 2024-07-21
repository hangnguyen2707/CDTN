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
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages } from "../../../store/actions/package";
import UpdateSendToWarehouse from "./Modal/UpdateSendToWarehouse/UpdateSendToWarehouse";
import CreateNewPackageModal from "./Modal/CreateNewPackage/CreateNewPackage";
import PrintPackageInfo from "./Modal/PrintPackageInfo/PrintPackageInfo";
import UpdatePackageModal from "./Modal/UpdatePackage/UpdatePackage";
import HeaderRoleNoButton from "../../../conponents/HeaderRole/HeaderRoleNoButton/HeaderRoleNoButton";
function PointStaffSendToWarehouse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages } = useSelector((state) => state.package);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isUpdate1ModalOpen, setIsUpdate1ModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [orders, setOrders] = useState([]);
  const [statusPackage, setStatusPackage] = useState('');
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  const [isTab1, setIsTab1] = useState(true);
  const [isTab2, setIsTab2] = useState(false);
  useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  useEffect(() => {
    const filteredPackages = packages.filter((pk) =>
      pk.transactionPointStart.id === parseInt(localStorage.getItem('transactionPointId')) && pk?.Status?.nameOfStatus === "DELIVERING"
      && pk?.Status?.dateSendToWarehouseStart === null
    );
    setFilteredPackages(filteredPackages);
  }, [packages]);

  useEffect(() => {
    setPagination(calculateRange(filteredPackages, 4));
    setPage(1);
  }, [filteredPackages]);


  useEffect(() => {
    setOrders(sliceData(filteredPackages, page, 4));
  }, [page, filteredPackages]);
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
  const handleOpenPrintModal = (order) => {
    const statusTimes = [
      [order.Status.datePointEndReceived,
      order.transactionPointEnd && order.transactionPointEnd?.name ? order.transactionPointEnd?.name + " đang chuyển đơn hàng." : null],

      [order.Status.dateReceiverReturn, 'Người nhận trả lại hàng lúc ' + formatDateTime(order.Status.dateReceiverReturn)],

      [order.Status.dateSendPackage, 'Người gửi gửi đơn hàng tại điểm giao dịch ' + order.transactionPointStart?.name + " lúc " + formatDateTime(order.Status.dateSendPackage)],

      [order.Status.dateSendToPointEnd,
      order.transactionPointEnd && order.transactionPointEnd?.name ?
        "Đơn hàng chuyển tới điểm giao dịch " + order.transactionPointEnd?.name + " lúc " + formatDateTime(order.Status.dateSendToPointEnd) : null],

      [order.Status.dateSendToReceiver, "Đơn hàng đã chuyển tới người nhận lúc " + formatDateTime(order.Status.dateSendToReceiver)],

      [order.Status.dateSendToWarehouseEnd, order.warehouseEnd && order.warehouseEnd?.name ?
        "Đơn hàng rời khỏi kho " + order.warehouseStart?.name + " lúc " + formatDateTime(order.Status.dateSendToWarehouseEnd) : null],

      [order.Status.dateSendToWarehouseStart, order.warehouseStart && order.warehouseStart?.name ?
        "Đơn hàng rời khỏi điểm giao dịch " + order.transactionPointStart?.name + " lúc " + formatDateTime(order.Status.dateSendToWarehouseStart) : null],

      [order.Status.dateWarehouseEndReceived, order.warehouseEnd && order.warehouseEnd?.name ?
        "Đơn hàng nhập kho " + order.warehouseEnd?.name + " lúc " + formatDateTime(order.Status.dateWarehouseEndReceived) : null],

      [order.Status.dateWarehouseStartReceived, order.warehouseStart && order.warehouseStart?.name ?
        "Đơn hàng nhập kho " + order.warehouseStart?.name + " lúc " + formatDateTime(order.Status.dateWarehouseStartReceived) : null],

      [order.Status.receivedDate, "Đơn hàng được trả lại lúc " + order.Status.receivedDate]
    ];

    const filteredStatusTimes = statusTimes.filter(time => time[0] !== null);
    console.log(filteredStatusTimes)
    filteredStatusTimes.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    setStatusPackage(filteredStatusTimes);
    setIsPrintOpen(true);
    setSelectedPackage(order);
  }
  const handleClosePrintModal = () => {
    setIsPrintOpen(false);
  }
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleTab1Click = () => {
    navigate('/pointStaff/sendToWarehouse');
  };

  const handleTab2Click = () => {
    navigate('/pointStaff/sendToAccount');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenUpdateModal = (order) => {
    setIsUpdateModalOpen(true);
    setSelectedPackage(order);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };
  const handleOpenUpdate1Modal = (order) => {
    setIsUpdate1ModalOpen(true);
    setSelectedPackage(order);
  };

  const handleCloseUpdate1Modal = () => {
    setIsUpdate1ModalOpen(false);
  };

  // Search
  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let searchResults = filteredPackages.filter(
        (item) =>
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.last_name.toLowerCase().includes(search.toLowerCase()) ||
          item.product.toLowerCase().includes(search.toLowerCase())
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
        btnText={"Đơn chờ gửi đến kho"}
        variant="primary"
        onClick={handleOpenModal}
      />
      <CreateNewPackageModal
        // dialogClassName="modal-dialog-custom"
        show={isModalOpen}
        onHide={handleCloseModal}
        style={{ zIndex: 9999 }} 
      />
      <div className="dashboard-content-container">
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px' }}>
        <Button style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleTab1Click}>Đơn chờ gửi đến kho</Button>
        <Button style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleTab2Click}>Đơn gửi người nhận</Button>
      </div>
        <div className="dashboard-content-header">
        {/* <Button style={{ backgroundColor: 'gray', color: 'white' }}onClick={handleOpenModal}>Ghi nhận đơn hàng</Button> */}
          <h2>Các đơn đang chờ gửi đến kho</h2>
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
                    <span>2024-07-19T14:40:22.000Z</span>
                  </td>
                  <li class="list-inline-item">
                    <button
                      class="btn btn-secondary btn-sm rounded-0"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Update"
                      onClick={() => handleOpenUpdate1Modal(order)}
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                  </li>
                  <li class="list-inline-item">
                    <button
                      class="btn btn-secondary btn-sm rounded-0"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Update"
                      onClick={() => handleOpenUpdateModal(order)}
                    >
                      <i class="fa fa-truck"></i>
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      className="btn btn-secondary btn-sm rounded-0"
                      type="button"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Print"
                      onClick={() => handleOpenPrintModal(order)}
                    >
                      <i className="fa fa-print"></i>
                    </button>
                  </li>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <UpdateSendToWarehouse showModal={isUpdateModalOpen} handleClose={handleCloseUpdateModal} selectedPackage={selectedPackage} />
        <PrintPackageInfo
          showModal={isPrintOpen} handleClose={handleClosePrintModal} selectedPackage={selectedPackage}  statusPackage={statusPackage}
        />
        <UpdatePackageModal
            show={isUpdate1ModalOpen}
            order={selectedPackage}
            onHide={handleCloseUpdate1Modal}
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

export default PointStaffSendToWarehouse;
