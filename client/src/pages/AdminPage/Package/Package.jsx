import React, { useState, useEffect } from "react";
import {
  calculateRange,
  sliceData,
  nextPage,
  prevPage,
  lastPage,
  firstPage,
} from "../../../utils/table-pagination";
import "./styles.css";
import { useNavigate } from 'react-router-dom'
import DoneIcon from "../../../assets/icons/done.svg";
import CancelIcon from "../../../assets/icons/cancel.svg";
import ShippingIcon from "../../../assets/icons/shipping.svg"
import HeaderRoleNoButton from "../../../conponents/HeaderRole/HeaderRoleNoButton/HeaderRoleNoButton";
import CreateNewPackageModal from "./Modal/CreateNewPackage/CreateNewPackage";
import UpdatePackageModal from "./Modal/UpdatePackage/UpdatePackage";
import { apiDeletePackage, apiGetAllPackages } from "../../../services/package";
import { useDispatch, useSelector } from "react-redux";
import { getAllPackages } from "../../../store/actions/package";
import ShowInfoPackage from "../../AdminPage/Package/Modal/ShowInfoPackage/ShowInfoPackage"
import moment from 'moment';
import Chart from 'react-apexcharts';
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  getAllTransactionPoints,
  getAllWarehouses,
} from "../../../store/actions";

function Package() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages } = useSelector((state) => state.package);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const [packages, setAllOrders] = useState([]);
  const [isDelete, setIsDelete] = useState();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [orders, setOrders] = useState(packages);
  const [showInfoPackage, setShowInfoPackage] = useState(false);
  const [statusPackage, setStatusPackage] = useState('');

  const [loading, setLoading] = useState(true);
  const [donutChartData, setDonutChartData] = useState({
    options: {
      labels: ["Chờ Giao Hàng", "Giao Thành Công", "Hàng Hủy"],
      colors: ["#008FFB", "#00E396", "#FEB019"],
      chart: {
        width: 250,
        type: "donut",
      },
    },
    series: [294, 2, 2],
  });
  const [lineChartData, setLineChartData] = useState({
    options: {
      xaxis: {
        categories: [],
        labels: {
          formatter: function (value) {
            return value; 
          },
        },
      },
    },
    series: [
      {
        name: "Đơn hàng theo tháng",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (packages.length > 0 && loading) {
      setLoading(false);
      setDonutChartData(prevData => {
        const newDonutChartData = { ...prevData };
  
        for (const order of packages) {
          if (order?.Status?.nameOfStatus === "SUCCESS") {
            newDonutChartData.series[1] += 1;
          } else if (order?.Status?.nameOfStatus === "FAILED") {
            newDonutChartData.series[2] += 1;
          } else if (order?.Status?.nameOfStatus === "DELIVERING") {
            newDonutChartData.series[0] += 1;
          }
        }
  
        console.log("Updated Donut Chart Data:", newDonutChartData);
  
        return newDonutChartData;
      });

      console.log(packages);

      const ordersByMonth = packages.reduce((acc, order) => {
        const monthYear = moment(order.Status.dateSendPackage).format('MM/YYYY');
        if (!acc[monthYear]) {
          acc[monthYear] = {
            count: 0,
          };
        }
        acc[monthYear].count += 1;
        return acc;
      }, {});

      console.log("ordersByMonth:", ordersByMonth); // In ra để kiểm tra

      // Lấy và sắp xếp các tháng năm
      const sortedMonths = Object.keys(ordersByMonth).sort((a, b) => moment(b, 'MM/YYYY') - moment(a, 'MM/YYYY'));
      console.log("sortedMonths:", sortedMonths); // In ra để kiểm tra

      const maxDisplayedPoints = 5;
      const recentMonths = sortedMonths.slice(0, maxDisplayedPoints);
      console.log("recentMonths:", recentMonths); // In ra để kiểm tra

      // Cập nhật dữ liệu biểu đồ với các tháng gần đây
      const incomeTmp = recentMonths.map((key) => ordersByMonth[key].count);
      console.log("incomeTmp:", incomeTmp); // In ra để kiểm tra

      const categoTmp = recentMonths.map((key) => key);
      console.log("categoTmp:", categoTmp); // In ra để kiểm tra

      const updatedLineChartData = {
        ...lineChartData,
        options: {
          ...lineChartData.options,
          xaxis: {
            categories: categoTmp,
            labels: {
              formatter: function (value) {
                return value; // Trả về giá trị tháng/năm mà không thay đổi
              },
            },
          },
        },
        series: [
          {
            name: "Đơn hàng theo tháng",
            data: incomeTmp,
          },
        ],
      };

      setLineChartData(updatedLineChartData);
      //setDonutChartData(newDonutChartData);
      //setLineChartData(newLineChartData);
    }
  }, [packages, loading]);

  useEffect(() => {
    if (packages.length > 0 && loading) {
      setLoading(false);
      setDonutChartData(prevData => {
        const newDonutChartData = { ...prevData };
  
        for (const order of packages) {
          if (order?.Status?.nameOfStatus === "SUCCESS") {
            newDonutChartData.series[1] += 1;
          } else if (order?.Status?.nameOfStatus === "FAILED") {
            newDonutChartData.series[2] += 1;
          } else if (order?.Status?.nameOfStatus === "DELIVERING") {
            newDonutChartData.series[0] += 1;
          }
        }
  
        console.log("Updated Donut Chart Data:", newDonutChartData);
  
        return newDonutChartData;
      });
    }
    dispatch(getAllPackages());
  }, []);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowInfoPackage(false);
  };

  const handleOpenUpdateModal = (order) => {
    setIsUpdateModalOpen(true);
    console.log(order)
    setSelectedPackage(order)
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);

  }
  useEffect(() => {
    setPagination(calculateRange(packages, 6));
    setOrders(sliceData(packages, page, 6));
  }, [page, packages]);

  // Search
  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  //   if (event.target.value !== "") {
  //     let searchResults = packages.filter(
  //       (item) =>
  //         item.first_name.toLowerCase().includes(search.toLowerCase()) ||
  //         item.last_name.toLowerCase().includes(search.toLowerCase()) ||
  //         item.product.toLowerCase().includes(search.toLowerCase())
  //     );
  //     setOrders(searchResults);
  //     setPagination(calculateRange(searchResults, 6));
  //     setPage(1);
  //   } else {
  //     setOrders(sliceData(packages, page, 6));
  //     setPagination(calculateRange(packages, 6));
  //   }
  // };

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearch(searchText);

    if (searchText !== '') {
      let searchResults = packages.filter((item) =>
        (item?.first_name && typeof item.first_name === 'string' && item.first_name.toLowerCase().includes(searchText)) ||
        (item?.last_name && typeof item.last_name === 'string' && item.last_name.toLowerCase().includes(searchText)) ||
        (item?.product && typeof item.product === 'string' && item.product.toLowerCase().includes(searchText))
      );
      setOrders(searchResults);
      setPagination(calculateRange(searchResults, 6));
      setPage(1); // Reset to the first page when searching
    } else {
      setOrders(sliceData(packages, page, 6));
      setPagination(calculateRange(packages, 6));
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

  const handleOpenDeleteModal = (order) => {
    console.log('YES')
    setIsDelete(order);
    console.log(order);
    console.log(isDelete);
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
      apiDeletePackage(id)
      window.location.reload();
    }

    /*  if (setIsDelete) {
  
        // Tìm vị trí của đối tượng trong danh sách orders
        const index = orders.findIndex((order) => order.id === setIsDelete.id);
        console.log(isDelete)
        if (index !== -1) {
          // Tạo một bản sao của danh sách orders để tránh thay đổi trực tiếp state
          const updatedOrders = [...orders];
          // Xóa đối tượng khỏi danh sách
          apiDeletePackage(index);
          // Cập nhật state orders
          setOrders(updatedOrders);
        }
        // Đặt lại selectedOrderToDelete về null
        setIsDelete(null);
      } */
  };
  const renderPagination = () => {
    const totalButtons = 3; // Number of buttons to display
    const halfButtons = Math.floor(totalButtons / 2);
    const start = Math.max(1, page - halfButtons);
    const end = Math.min(start + totalButtons - 1, pagination.length);

    const buttons = [];

    for (let i = start; i <= end; i++) {
      buttons.push(
        <span
          key={i}
          className={i === page ? "active-pagination" : "pagination"}
          onClick={() => handleChangePage(i)}
        >
          {i}
        </span>
      );
    }

    if (start > 1) {
      buttons.unshift(
        <span key="start" className="pagination-disabled"></span>
      );
    }
    if (end < pagination.length) {
      buttons.push(<span key="end" className="pagination-disabled"></span>);
    }

    return buttons;
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

    filteredStatusTimes.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    setStatusPackage(filteredStatusTimes);
    setShowInfoPackage(true)

  };


  return (
    <div className="dashboard-content">
      <HeaderRoleNoButton
        btnText={"Thêm đơn hàng"}
        variant="primary"
        onClick={handleOpenModal}
      />
      <CreateNewPackageModal
        // dialogClassName="modal-dialog-custom"
        show={isModalOpen}
        onHide={handleCloseModal}
        style={{ zIndex: 9999 }} // Add this line
      />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Đơn hàng</h2>
          {/* <div className="dashboard-content-search">
            <input
              type="text"
              value={search}
              placeholder="Search.."
              className="dashboard-content-input"
              onChange={handleSearch}
            />
          </div> */}
        </div>
        {/* <table>
          <thead>
            <th>ID</th>
            <th>TRẠNG THÁI</th>
            <th>NGƯỜI GỬI</th>
            <th>NGƯỜI NHẬN</th>
            <th>GIÁ TRỊ</th>
          </thead>

          {orders.length !== 0 ? (
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>
                    <span>{order.id}</span>
                  </td>
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
                    <span>{order.sender?.name}</span>
                  </td>
                  <td>
                    <span>{order.receiver?.name}</span>
                  </td>
                  <td>
                    <span>{order.shippingCost} VND</span>
                  </td>
                  <td>
                    <ul class="list-inline m-0">
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
                        </button>
                      </li>
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
                      <li class="list-inline-item">
                        <button
                          class="btn btn-secondary btn-sm rounded-0"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => { handleDelete(order.id) }}
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
          <ShowInfoPackage
            show={showInfoPackage}
            order={selectedPackage}
            statusPackage={statusPackage}
            onHide={handleCloseModal}
          />
          <UpdatePackageModal
            show={isUpdateModalOpen}
            order={selectedPackage}
            onHide={handleCloseUpdateModal}
          />
        </table> */}
{/* 
        {orders.length !== 0 ? (
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
            {renderPagination()}
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
        )} */}
      </div>
      <div className="chart-container">
        <div className="chart-item">
          <Chart
            options={donutChartData.options}
            series={donutChartData.series}
            type="donut"
          />
        </div>
        <div className="chart-item">
          <Chart
            options={lineChartData.options}
            series={lineChartData.series}
            type="line"
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
        <img
          src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-anime-cute-1.jpg"
          alt="Ảnh anime cute"
          style={{
            width: '700px',
            height: 'auto',
          }}
        />
      </div>
    </div>
  );
}

export default Package;