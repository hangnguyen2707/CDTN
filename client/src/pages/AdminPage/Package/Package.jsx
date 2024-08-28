import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from 'react-router-dom'
import HeaderRoleNoButton from "../../../conponents/HeaderRole/HeaderRoleNoButton/HeaderRoleNoButton";
import CreateNewPackageModal from "./Modal/CreateNewPackage/CreateNewPackage";
import { useDispatch, useSelector } from "react-redux";
import Chart from 'react-apexcharts';
function Package() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { packages } = useSelector((state) => state.package);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const [packages, setAllOrders] = useState([]);
  const [isDelete, setIsDelete] = useState();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showInfoPackage, setShowInfoPackage] = useState(false);

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

      console.log(packages);
      const updatedLineChartData = {
        ...lineChartData,
        options: {
          ...lineChartData.options,
          xaxis: {
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
            data: [23,25,26]
          },
        ],
      };

      setLineChartData(updatedLineChartData);

    }
  }, [packages, loading]);
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



  
  return (
    <div className="dashboard-content">
      <HeaderRoleNoButton
        variant="primary"
      />
      <CreateNewPackageModal
        show={isModalOpen}
        onHide={handleCloseModal}
        style={{ zIndex: 9999 }} // Add this line
      />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Tổng quan</h2>
         
        </div>
        
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
      
    

    
          

    </div>
    
  );
}

export default Package;