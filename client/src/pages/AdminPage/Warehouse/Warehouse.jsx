import React, { useState, useEffect } from "react";
import {
  calculateRange,
  sliceData,
  nextPage,
  prevPage,
  firstPage,
  lastPage,
} from "../../../utils/table-pagination";

import "./style.css";
import HeaderRole from "../../../conponents/HeaderRole/HeaderRole";
import CreateNewWarehouseModal from "./Modal/CreateNewWarehouse/CreateNewWarehouse";
import UpdateWarehouseModal from "./Modal/UpdateWarehouse/UpdateWarehouse";
import ShowInfoWarehouse from "./Modal/ShowInfoWarehouse/ShowInfoWarehouse";
import { useDispatch, useSelector } from "react-redux";
import { getAllWarehouses } from "../../../store/actions";

function Warehouse() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { warehouses } = useSelector((state) => state.warehouse);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(null);
  const [warehousesAll, setWarehouseAll] = useState(warehouses);
  const [showInfoWarehouse, setShowInfoWarehouse] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowInfoWarehouse(false);
  };

  const handleOpenUpdateModal = (warehouse) => {
    setIsUpdateModalOpen(true);
    setSelectedWarehouse(warehouse);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleCloseShowInfoModal = () => {
    setShowInfoWarehouse(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteModalOpen = (warehouse) => {
    setIsDeleteModalOpen(true);
    setSelectedWarehouse(warehouse);
  };

  useEffect(() => {
    dispatch(getAllWarehouses());
  }, []);
  console.log(warehouses);

  useEffect(() => {
    setPagination(calculateRange(warehouses, 5));
    setWarehouseAll(sliceData(warehouses, page, 5));
  }, [page, warehouses]);

  const onHandlerShowInfoWarehouse = (warehouse) => {
    setShowInfoWarehouse(true);
    setSelectedWarehouse(warehouse);
  };

  // Search
const handleSearch = (event) => {
  const searchText = event.target.value.toLowerCase();
  setSearch(searchText);

  if (searchText !== "") {
    let searchResults = warehouses.filter(
      (item) =>
        item?.name?.toLowerCase().includes(searchText) ||
        item?.email?.toLowerCase().includes(searchText) ||
        item?.leader?.toLowerCase().includes(searchText)
    );
    setWarehouseAll(searchResults);
    setPagination(calculateRange(searchResults, 5));
    setPage(1); // Reset to the first page when searching
  } else {
    setWarehouseAll(sliceData(warehouses, page, 5));
    setPagination(calculateRange(warehouses, 5));
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

console.log(showInfoWarehouse);

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
    buttons.unshift(<span key="start" className="pagination-disabled"></span>);
  }
  if (end < pagination.length) {
    buttons.push(<span key="end" className="pagination-disabled"></span>);
  }

  return buttons;
};

    return (
        <div className='dashboard-content'>
            <HeaderRole
                btnText="Thêm kho hàng" onClick={setIsModalOpen} />
            <CreateNewWarehouseModal
                // dialogClassName="modal-dialog-custom"
                show={isModalOpen}
                onHide={handleCloseModal}
                warehouses = {warehouses}
                style={{ zIndex: 9999 }} // Add this line
            />
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Quản lý điểm kho</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>STT</th>
                        <th>TÊN KHO HÀNG</th>
                        <th>ĐỊA CHỈ KHO HÀNG</th>
                        <th>TRƯỞNG KHO</th>
                        <th>MÔ TẢ</th>
                    </thead>

                    {warehousesAll.length !== 0 ? (
                        <tbody>
                            {warehousesAll.map((warehouse, index) => (
                                <tr key={index}>
                                    <td><span>{warehouse?.id}</span></td>
                                    <td><span>{warehouse?.name}</span></td>
                                    <td><span>{warehouse?.address}</span></td>
                                    <td><span>{warehouse?.warehouseLeader?.name}</span></td>
                                    <td><span>{warehouse?.description}</span></td>
                                    <td>
                                        <ul className="list-inline m-0">
                                            <li className="list-inline-item">
                                                <button className="btn btn-secondary btn-sm rounded-0"
                                                    type="button" data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Eye"
                                                    onClick={(e) => onHandlerShowInfoWarehouse(warehouse)}><i class="fa fa-eye"></i></button>
                                            </li>
                                            <li className="list-inline-item">
                                                <button className="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit" onClick={(e) => handleOpenUpdateModal(warehouse)}><i class="fa fa-edit"></i></button>
                                            </li>
                                            {/* <li className="list-inline-item">
                                                <button className="btn btn-secondary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete" onClick={(e) => handleDeleteModalOpen(warehouse)}><i class="fa fa-trash"></i></button>
                                            </li> */}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
          <ShowInfoWarehouse
            show={showInfoWarehouse}
            onHide={handleCloseShowInfoModal}
            warehouse={selectedWarehouse}
          />
          <UpdateWarehouseModal
            show={isUpdateModalOpen}
            onHide={handleCloseUpdateModal}
            selectWarehouse={selectedWarehouse}
          />
          {/* <DeleteWarehouseModal
                        show={isDeleteModalOpen}
                        onHide={handleCloseDeleteModal}
                        warehouse = {selectedWarehouse}
                    /> */}
        </table>

        {warehousesAll.length !== 0 ? (
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
        )}
      </div>
    </div>
  );
}

export default Warehouse;
