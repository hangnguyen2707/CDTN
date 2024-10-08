import "./Sidebar.css";
import {
  Home,
  Storefront,
  WorkOutline,
  WarehouseRounded,
  FactoryRounded,
  Inventory2Rounded,
  AccountBalanceRounded,
  AccessAlarmSharp,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import LogoutIcon from '../../assets/icons/logout.svg';
import * as actions from '../../store/actions';

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleClickLogout = () => {
    localStorage.setItem('role', '');
    localStorage.setItem('id', '');
    localStorage.setItem('name', '');
    localStorage.setItem('transactionPointId', '')
    localStorage.setItem('warehouseId', '')
    dispatch(actions.logout())
    navigate('/');
    window.location.reload();
  };
  const handleItemClick = (key) => {
   
    localStorage.setItem("activeKey", key);
    setIsActive(key);
  };

  const navList = [
    {
      role: "BOSS",
      name_role: "FUTA Express",
      navChild: [
        {
          icon: Inventory2Rounded,
          title: "Tổng quan",
          link: "boss/package",
          key: 1,
        },
        {
          icon: AccountBalanceRounded,
          title: "Quản lý nhân viên",
          link: "boss/account",
          key: 2,
        },
        {
          icon: FactoryRounded,
          title: "Quản lý điểm bưu cục",
          link: "boss/transaction",
          key: 3,
        },
        {
          icon: WarehouseRounded,
          title: "Quản lý điểm kho",
          link: "boss/warehouse",
          key: 4,
        },
      ],
    },
    {
      role: "POINT_LEADER",
      name_role: "FUTA Express",
      navChild: [
        {
          icon: AccountBalanceRounded,
          title: "Quản lý nhân viên",
          link: "/pointLeader/account",
          key: 1,
        },
        {
          icon: Inventory2Rounded,
          title: "Thống kê hàng hóa",
          link: "/pointLeader/packageSending",
          key: 2,
        },
       
      ],
    },
    {
      role: "POINT_STAFF",
      name_role: "FUTA Express",
      navChild: [
              {
          icon: AccessAlarmSharp,
          title: "Ghi nhận đơn hàng",
          link: "pointStaff/acceptPackage",
          key: 1,
        },
        {
          icon: Home,
          title: "Tạo đơn chuyển hàng",
          link: "/pointStaff/sendToWarehouse",
          key: 2,
        },
        {
          icon: Storefront,
          title: "Xác nhận đơn hàng",
          link: "/pointStaff/receiveFromWarehouse",
          key: 3,
        },
        {
          icon: WorkOutline,
          title: "Thống kê hàng hóa",
          link: "/pointStaff/refund",
          key: 4,
        },
        
      ],
    },
    {
      role: "WAREHOUSE_LEADER",
      name_role: "FUTA Express",
      navChild: [
        {
          icon: AccountBalanceRounded,
          title: "Quản lý nhân viên",
          link: "/warehouseLeader/account",
          key: 1,
        },
       
        {
          icon: Storefront,
          title: "Thống kê hàng hóa",
          link: "/warehouseLeader/packageReceivering",
          key: 2,
        },
      ],
    },
    {
      role: "WAREHOUSE_STAFF",
      name_role: "FUTA Express",
      navChild: [
        {
          icon: WorkOutline,
          title: "Xác nhận hàng hóa",
          link: "/warehouseStaff/receiveFromTransaction",
          key: 1,
        },
        
        {
          icon: AccessAlarmSharp,
          title: "Tạo đơn chuyển hàng",
          link: "/warehouseStaff/sendToTransaction",
          key: 2,
        },
      ],
    }
  ];
  const [isActive, setIsActive] = useState(() => {
    const storedActiveKey = parseInt(localStorage.getItem('activeKey'));
    const isValidKey = navList.find((item) =>
      item.navChild.some((child) => child.key === storedActiveKey)
    );
    return isValidKey ? storedActiveKey : (navList[0]?.navChild[0]?.key || 1);
  });

  return (
    <nav className="sidebar">
      <div className="sidebarWrapper">
        {navList.map((item) =>
          localStorage.getItem('role') === item.role ? (
            <div className="sidebarMenu">
              <Link style={{ textDecoration: "none" }}>
                <h3 className="sidebarTitle">{item.name_role}</h3>
              </Link>
              <ul className="sidebarList">
                {item.navChild.map((child) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    onClick={() => handleItemClick(child.key)}
                    to={child.link}
                    className="link"
                  >
                    <li
                      className={
                        isActive === child.key
                          ? "sidebarListItem active"
                          : "sidebarListItem"
                      }
                    >
                      <child.icon className="sidebarIcon" />
                      <h3 className="sidebarText">{child.title}</h3>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ) : null
        )}
        <div className="sidebar-footer" onClick={handleClickLogout}>
          <span className="sidebar-item-label">Đăng xuất</span>
          <img
            src={LogoutIcon}
            alt="icon-logout"
            className="sidebar-item-icon"
          />
        </div>
      </div>
    </nav>
  );
}
