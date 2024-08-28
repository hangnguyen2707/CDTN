import Account from "../pages/AdminPage/Account/Account";
import {Home} from "../pages/PublicPage/Home/Home";
import Login from "../pages/PublicPage/Login/Login";
import Package from "../pages/AdminPage/Package/Package";
import TransactionPoint from "../pages/AdminPage/TransactionPoint/TransactionPoint";
import Warehouse from "../pages/AdminPage/Warehouse/Warehouse";

import PointLeaderAccount from "../pages/PointLeaderPage/Account/PointLeaderAccount";
import pointStaffSendToWarehouse from "../pages/PointStaffPage/SendToWarehouse/SendToWarehouse";
import pointStaffReceiveFromWarehouse from "../pages/PointStaffPage/ReceiveFromWarehouse/ReceiveFromWarehouse";
import pointStaffSendToAccount from "../pages/PointStaffPage/SendToAccount/SendToAccount";
import Refund from "../pages/PointStaffPage/RefundPackage/Refund";
import WarehouseLeaderAccount from "../pages/WarehouseLeaderPage/Account/WarehouseLeaderAccount";
import warehouseStaffSendToWarehouse from "../pages/WarehouseStaffPage/SendToWarehouse/SendToWarehouse";
import warehouseStaffReceiveFromWarehouse from "../pages/WarehouseStaffPage/ReceiveFromWarehouse/ReceiveFromWarehouse";
import warehouseStaffSendToTransaction from "../pages/WarehouseStaffPage/SendToTransaction/SendToTransaction";
import warehouseStaffReceiveFromTransaction from "../pages/WarehouseStaffPage/ReceiveFromTransaction/ReceiveFromTransaction";
import Success from "../pages/PointStaffPage/ShippingSuccess/Success";
import PointLeaderPackageSending from "../pages/PointLeaderPage/PackageSending/PointLeaderPackageSending";
import PointLeaderPackageReceivering from "../pages/PointLeaderPage/PackageReceivering/PointLeaderPackageReceivering";
import WarehouseLeaderPackageSending from "../pages/WarehouseLeaderPage/PackageSending/WarehouseLeaderPackageSending";
import WarehouseLeaderPackageReceivering from "../pages/WarehouseLeaderPage/PackageReceivering/WarehouseLeaderPackageReceivering";
import AcceptPackage from "../pages/PointStaffPage/AcceptPackage/AcceptPackage"
const publicRoutes = [
    {
      path: 'login',
      page: Login
    },
    {
      path: '/',
      page: Home
    },
    {
      path: '*',
      page: Home
    }
  ];
const bossRoutes = [
    {
        path: 'boss/warehouse',
        page: Warehouse
    },
    {
        path: 'boss/transaction',
        page: TransactionPoint
    },
    {
        path: 'boss/package',
        page: Package
    },
    {
        path: 'boss/account',
        page: Account
    },
]
const pointLeaderRoutes = [
  {
    path: 'pointLeader/account',
    page: PointLeaderAccount
  },
  {
    path: 'pointLeader/packageSending',
    page: PointLeaderPackageSending
  },
  {
    path: 'pointLeader/packageReceivering',
    page: PointLeaderPackageReceivering
  }
]
const pointStaffRoutes = [
  {
    path: 'pointStaff/acceptPackage',
    page: AcceptPackage 
  },
  {
    path: 'pointStaff/sendToWarehouse',
    page: pointStaffSendToWarehouse
  },
  {
    path: 'pointStaff/receiveFromWarehouse',
    page: pointStaffReceiveFromWarehouse
  },
  {
    path: 'pointStaff/sendToAccount',
    page: pointStaffSendToAccount
  },
  {
    path: 'pointStaff/refund',
    page: Refund
  },
  {
    path: 'pointStaff/success',
    page: Success
  }

]
const warehouseLeaderRoutes = [
  {
    path: 'warehouseLeader/account',
    page: WarehouseLeaderAccount
  },
  {
    path: 'warehouseLeader/packageSending',
    page: WarehouseLeaderPackageSending
  },
  {
    path: 'warehouseLeader/packageReceivering',
    page: WarehouseLeaderPackageReceivering
  }
]
const warehouseStaffRoutes = [
  {
    path: 'warehouseStaff/sendToWarehouse',
    page: warehouseStaffSendToWarehouse
  },
  {
    path: 'warehouseStaff/receiveFromWarehouse',
    page: warehouseStaffReceiveFromWarehouse
  },
  {
    path: 'warehouseStaff/sendToTransaction',
    page: warehouseStaffSendToTransaction
  },
  {
    path: 'warehouseStaff/receiveFromTransaction',
    page: warehouseStaffReceiveFromTransaction
  }
]

export {publicRoutes, bossRoutes, pointLeaderRoutes, pointStaffRoutes, warehouseLeaderRoutes, warehouseStaffRoutes}