import React, { useEffect, useState } from 'react';
import { apiDeleteEmployee, apiGetAllUsers } from '../../../services/user';
import {
  calculateRange,
  sliceData,
  nextPage,
  prevPage,
  lastPage,
  firstPage,
} from '../../../utils/table-pagination';
import HeaderRole from '../../../conponents/HeaderRole/HeaderRole';
import { useDispatch, useSelector } from 'react-redux';
import CreateNewAccountModal from './Modal/CreateNewAccount/CreateNewAccount';
import UpdateAccountModal from './Modal/UpdateAccount/UpdateAccount';
import { getAllWarehouses } from '../../../store/actions';
const WarehouseLeaderAccount = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [accounts, setAccounts] = useState(users);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { warehouses } = useSelector((state) => state.warehouse);
  const [warehouseName, setWarehouseName] = useState("");

  useEffect(() => {
    dispatch(getAllWarehouses());
  }, []);
  console.log(warehouses);
  console.log(localStorage);
  useEffect(() => {
    const selectedWarehouse = warehouses.find(
      (warehouse) => warehouse.id == localStorage.getItem("warehouseId")
    );
    if (selectedWarehouse) {
      setWarehouseName(selectedWarehouse.name);
    } else {
      setWarehouseName("");
    }
  }, [warehouses]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenUpdateModal = (account) => {
    setIsUpdateModalOpen(true);
    console.log(account)
    setSelectedAccount(account)
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);

  }



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiGetAllUsers();
        const data = response?.data.response;
        const err = response?.data.err;
        const msg = response?.data.msg;
        console.log(data);
        if (err === 0) {
            console.log(localStorage);

            const filteredUsers = data.filter(user =>
              user.accountType === "WAREHOUSE_STAFF" &&
              user.Employee?.Warehouse?.id == localStorage.getItem('warehouseId')
            );

            setUsers(filteredUsers);
          } else {
            console.log(msg);
          }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setPagination(calculateRange(users, 5));
    setAccounts(sliceData(users, page, 5));
  }, [page, users]);

  // Search
  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      let searchResults = users.filter(
        (item) =>
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.last_name.toLowerCase().includes(search.toLowerCase()) ||
          item.product.toLowerCase().includes(search.toLowerCase())
      );
      setAccounts(searchResults);
      setPagination(calculateRange(searchResults, 5));
      setPage(1);
    } else {
      setAccounts(sliceData(users, page, 5));
      setPagination(calculateRange(users, 5));
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

  const handleDelete = (id) => {
    if(window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
      apiDeleteEmployee(id)
      window.location.reload()
    }

  }

  return (
    <div className="dashboard-content">
      <HeaderRole
        btnText={'Thêm tài khoản nhân viên'}
        variant="primary"
        onClick={handleOpenModal}
      />
      <CreateNewAccountModal
      show={isModalOpen}
      onHide={handleCloseModal}
      style={{ zIndex: 9999 }}
      />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Quản lý nhân viên tại kho {warehouseName}</h2>
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
            <th>ID</th>
            <th>MÃ NHÂN VIÊN</th>
            <th>TÊN ĐĂNG NHẬP</th>
            <th>TÊN</th>
            <th>EMAIL</th>
            <th>SỐ ĐIỆN THOẠI</th>
          </thead>
          {accounts.length !== 0 ? (
            <tbody>
              {accounts.map((account, index) => (
                <tr key={index}>
                  <td>
                    <span>{account.id}</span>
                  </td>
                  <td>
                    <span>{account.user_id}</span>
                  </td>
                  <td>
                    <span>{account.username}</span>
                  </td>
                  <td>
                    <span>{account.name}</span>
                  </td>
                  <td>
                    <span>{account.email}</span>
                  </td>
                  <td>
                    <span>{account.phone}</span>
                  </td>
                  <td>
                    <ul class="list-inline m-0">
                      <li class="list-inline-item">
                        <button
                          class="btn btn-secondary btn-sm rounded-0"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit"
                          onClick={() => handleOpenUpdateModal(account)}
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
                          onClick={() => { handleDelete(account.id) }}
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
        </table>
        <UpdateAccountModal  show={isUpdateModalOpen}
        account = {selectedAccount}
        onHide={handleCloseUpdateModal}/>
        {accounts.length !== 0 ? (
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
            {calculateRange(users, 5).map((item, index) => (
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
};

export default WarehouseLeaderAccount;
