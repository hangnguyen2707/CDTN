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
import RefundedIcon from "../../../assets/icons/refunded.svg";
import HeaderRole from "../../../conponents/HeaderRole/HeaderRole";
import { Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages } from "../../../store/actions/package";
import UpdateReceiveFromWarehouse from "./Modal/UpdateReceiveFromWarehouse/UpdateReceiveFromWarehouse";
import HeaderRoleNoButton from "../../../conponents/HeaderRole/HeaderRoleNoButton/HeaderRoleNoButton";
function PointStaffReceiveFromWarehouse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages } = useSelector((state) => state.package);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  useEffect(() => {
    const filteredPackages = packages.filter((pk) =>
      pk?.warehouseEnd?.id === parseInt(localStorage.getItem('warehouseId')) && pk?.Status?.nameOfStatus === "DELIVERING"
      && pk?.Status?.dateWarehouseEndReceived === null && pk?.Status?.dateSendToWarehouseEnd !== null
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
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

  const handleTab1Click = () => {
    navigate("/warehouseStaff/receiveFromTransaction");
  };

  const handleTab2Click = () => {
    navigate('/warehouseStaff/receiveFromWarehouse');
  };

  return (
    <div className="dashboard-content">
    <HeaderRoleNoButton
    btnText={"Thêm đơn hàng"}
    variant="primary"
    onClick={handleOpenModal}
  />
      <div className="dashboard-content-container">
      <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', marginTop: '20px' }}>
        <Button style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleTab1Click}>Đơn chờ nhận từ điểm giao dịch</Button>
        <Button style={{ backgroundColor: 'gray', color: 'white' }} onClick={handleTab2Click}>Đơn chờ nhận từ kho</Button>
      </div>
        <div className="dashboard-content-header">
          <h2>Các đơn đang chờ nhận từ kho</h2>
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
                      title="Edit"
                      onClick={() => handleOpenUpdateModal(order)}
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                  </li>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <UpdateReceiveFromWarehouse showModal={isUpdateModalOpen} handleClose={handleCloseUpdateModal} selectedPackage={selectedPackage} />
        {/*  <UpdateReceiveFromTransaction showModal={isUpdateModalOpen} handleClose={handleCloseUpdateModal} selectedPackage={selectedPackage}/> */}
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

export default PointStaffReceiveFromWarehouse;
