import React, { useEffect, useState } from 'react';
import { apiGetAllUsers } from '../../../services/user';
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
const Account = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [accounts, setAccounts] = useState(users);
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  console.log(accounts);
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
                className={i === page ? 'active-pagination' : 'pagination'}
                onClick={() => handleChangePage(i)}>
                {i}
            </span>
        );
    }

    if (start > 1) {
        buttons.unshift(<span key="start" className="pagination-disabled"></span>);
    }
    if (end < pagination.length) {
        buttons.push(<span key="end" className="pagination-disabled"></span>);
    }

    return buttons;
};


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiGetAllUsers();
        const data = response?.data.response;
        console.log(data);
        const err = response?.data.err;
        const msg = response?.data.msg;
        console.log(data);
        if (err === 0) {
          setAllUsers(data);
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
    const filteredUsers = allUsers.filter(user => (user.accountType === 'WAREHOUSE_LEADER' || user.accountType === 'POINT_LEADER'));
    console.log(filteredUsers)
    setUsers(filteredUsers)
  }, [allUsers])

  useEffect(() => {
    setPagination(calculateRange(users, 5));
    setAccounts(sliceData(users, page, 5));
  }, [page, users]);

  // Search
  // const handleSearch = (event) => {
  //   setSearch(event.target.value);
  //   if (event.target.value !== "") {
  //     let searchResults = users.filter(
  //       (item) =>
  //         item.first_name.toLowerCase().includes(search.toLowerCase()) ||
  //         item.last_name.toLowerCase().includes(search.toLowerCase()) ||
  //         item.product.toLowerCase().includes(search.toLowerCase())
  //     );
  //     setAccounts(searchResults);
  //     setPagination(calculateRange(searchResults, 5));
  //     setPage(1);
  //   } else {
  //     setAccounts(sliceData(users, page, 5));
  //     setPagination(calculateRange(users, 5));
  //   }
  // };

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearch(searchText);

    if (searchText !== '') {
        let searchResults = users.filter((item) =>
            (item?.first_name && typeof item.first_name === 'string' && item.first_name.toLowerCase().includes(searchText)) ||
            (item?.last_name && typeof item.last_name === 'string' && item.last_name.toLowerCase().includes(searchText)) ||
            (item?.product && typeof item.product === 'string' && item.product.toLowerCase().includes(searchText))
        );
        setPagination(calculateRange(searchResults, 5));
        setPage(1);// Reset to the first page when searching
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

  return (
    <div className="dashboard-content">
      <HeaderRole
        btnText={'Thêm tài khoản'}
        variant="primary"
        onClick={handleOpenModal}
      />
      <CreateNewAccountModal
      show={isModalOpen}
      onHide={handleCloseModal}
      style={{ zIndex: 9999 }}/>
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Tài khoản</h2>
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
            <th>TÊN</th>
            <th>EMAIL</th>
            <th>SỐ ĐIỆN THOẠI</th>
            <th>CHỨC VỤ</th>
            <th>NƠI LÀM VIỆC</th>
          </thead>
          {accounts.length !== 0 ? (
            <tbody>
              {accounts.map((account, index) => (
                <tr key={index}>
                  <td>
                    <span>{account.id}</span>
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
                    {account.accountType === "POINT_LEADER" ? (
                      <span>TRƯỞNG ĐIỂM</span>
                    ) : (
                      <span>TRƯỞNG KHO</span>
                    )}
                  </td>
                  <td>
                  <span>
                    {account.TransactionPoints[0]?.name !== null
                      ? account.TransactionPoints[0]?.name
                      : account.Warehouses[0]?.name}
                      {account.Warehouses[0]?.name !== null
                        ? account.Warehouses[0]?.name
                      : null}
                  </span>
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
                      {/* <li class="list-inline-item">
                        <button
                          class="btn btn-secondary btn-sm rounded-0"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          // onClick={() => { handleDelete(order.id) }}
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </li> */}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        <UpdateAccountModal
        show={isUpdateModalOpen}
        account = {selectedAccount}
        onHide={handleCloseUpdateModal}/>
        {accounts.length !== 0 ? (
            <div className='dashboard-content-footer'>
                <span className="pagination" onClick={handleFirstPage} disabled={page === 1}>{'<<'}</span>
                <span className="pagination" onClick={handlePrevPage} disabled={page === 1}>{'<'}</span>
                {renderPagination()}
                <span className="pagination" onClick={handleNextPage} disabled={page === pagination.length}>{'>'}</span>
                <span className="pagination" onClick={handleLastPage} disabled={page === pagination.length}>{'>>'}</span>
            </div>
        ) : (
            <div className='dashboard-content-footer'>
                <span className='empty-table'>No data</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default Account;
