import { useState, useEffect } from 'react';
import React from 'react';
import './Home.css';
import { apiGetPackage, apiGetUser } from '../../../services/user'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPackages } from "../../../store/actions/package";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const dispatch = useDispatch();
  const [packageID, setPackageID] = useState('');
  const [statusPackage, setStatusPackage] = useState('');
  const { packages } = useSelector((state) => state.package);
  const [showPackageInfo, setShowPackageInfo] = useState(false);
  const [packageItem, setSearchedPackage] = useState(null);
  const navigate = useNavigate();
    useEffect(() => {
    dispatch(getAllPackages());
  }, []);

  useEffect(() => {
    if (showPackageInfo && packageItem) {
      console.log("Chuyển trang")
      navigate(
        '/packageForm',
        {
          state: {
            packageItem: packageItem,
            statusPackage: statusPackage
          }
        }
      )
    }
  }, [statusPackage, showPackageInfo, packageItem]);

  console.log(packages);

  
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

  const handleSearch = async () => {
    const foundPackage = packages.find(packageItem => packageItem.packageCode === packageID);
    if (foundPackage) {
      console.log(foundPackage);
      const statusTimes = [
        [foundPackage.Status.datePointEndReceived, foundPackage?.transactionPointEnd?.name + " đang chuyển đơn hàng."],
  
        [foundPackage.Status.dateReceiverReturn, 'Người nhận trả lại hàng lúc ' + formatDateTime(foundPackage.Status.dateReceiverReturn)],
  
        [foundPackage.Status.dateSendPackage, 'Người gửi gửi đơn hàng tại điểm bưu cục ' + foundPackage?.transactionPointStart?.name + " lúc " + formatDateTime(foundPackage.Status.dateSendPackage)],
  
        [foundPackage.Status.dateSendToPointEnd, "Đơn hàng chuyển tới điểm bưu cục " + foundPackage?.transactionPointEnd?.name + " lúc " + formatDateTime(foundPackage.Status.dateSendToPointEnd)],
  
        [foundPackage.Status.dateSendToReceiver, "Đơn hàng đã chuyển tới người nhận lúc " + formatDateTime(foundPackage.Status.dateSendToReceiver)],
  
        [foundPackage.Status.dateSendToWarehouseEnd, "Đơn hàng rời khỏi kho " + foundPackage?.warehouseStart?.name + " lúc " + formatDateTime(foundPackage?.Status?.dateSendToWarehouseEnd)],
  
        [foundPackage.Status.dateSendToWarehouseStart,
          "Đơn hàng rời khỏi điểm bưu cục " + foundPackage?.transactionPointStart?.name + " lúc " + formatDateTime(foundPackage.Status.dateSendToWarehouseStart)],
  
        [foundPackage.Status.dateWarehouseEndReceived,
          "Đơn hàng nhập kho " + foundPackage?.warehouseEnd?.name + " lúc " + formatDateTime(foundPackage.Status.dateWarehouseEndReceived)],
  
        [foundPackage.Status.dateWarehouseStartReceived, 
          "Đơn hàng nhập kho " + foundPackage?.warehouseStart?.name + " lúc " + formatDateTime(foundPackage.Status.dateWarehouseStartReceived)],
  
        [foundPackage.Status.receivedDate, "Đơn hàng được trả lại lúc " + foundPackage.Status.receivedDate]
      ];
      const filteredStatusTimes = statusTimes.filter(time => time[0] !== null);

      filteredStatusTimes.sort((a, b) => new Date(a[0]) - new Date(b[0]));
      setStatusPackage(filteredStatusTimes);
    }
    setSearchedPackage(foundPackage);
    setShowPackageInfo(!!foundPackage);
  };

  return (
    <div id="home">
   
    </div>
  )
}
