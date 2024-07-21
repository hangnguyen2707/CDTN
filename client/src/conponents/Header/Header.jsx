import React, { useEffect, useState } from 'react'
import './Header.css'
import { BsSearch } from 'react-icons/bs'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { getAllPackages } from "../../store/actions/package";
import tem from '../../assets/images/tem.png'
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch()
  const { isLogged } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)
  const { packages } = useSelector((state) => state.package);
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [packageItem, setSearchedPackage] = useState(null);
  const [statusPackage, setStatusPackage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPackages());
    const handleScroll = () => {
      var header = document.getElementById('header');
      var nav = document.getElementById('nav');
      var a = document.querySelectorAll('#nav a');
      var input = document.querySelector('#nav input');
      if (header && nav) {
        if (window.scrollY > header.offsetHeight) {
          nav.style.backgroundColor = 'white';
          a.forEach(link => {
            link.style.color = 'black';
          });
          input.style.backgroundColor = '#ECECEC';
        } else {
          nav.style.backgroundColor = 'transparent';
          a.forEach(link => {
            link.style.color = 'white';
          });
          input.style.backgroundColor = '#D7D7D7';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // console.log(packages)

  const onChangeHandler = (text) => {
    let matches = []
    var input = document.querySelector('#nav input');
    if (text.length > 0) {
      input.style.borderRadius = '15px 15px 0px 0px';
      matches = packages.filter(usr => {
        const regex = new RegExp(`${text}`, "gi");
        return usr.packageCode.match(regex)
      })
    } else {
      input.style.borderRadius = '15px';
    }
    if (matches.length == 0) {
      input.style.borderRadius = '15px';
    }
    setSuggestions(matches);
    setText(text)
  }

  console.log(suggestions)

  useEffect(() => {
    if (showModal && packageItem && statusPackage.length > 0) {
      console.log("Chuyển trang")
      navigate('/packageForm', {
        state: {
          packageItem: packageItem,
          statusPackage: statusPackage
        }
      })
    }
  }, [statusPackage, showModal, packageItem]);


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

  const openModal = (order) => {

    setShowModal(true);
    console.log(order);
    setSearchedPackage(order)
    const statusTimes = [
      [order.Status.datePointEndReceived, order?.transactionPointEnd?.name + " đang chuyển đơn hàng."],

      [order.Status.dateReceiverReturn, 'Người nhận trả lại hàng lúc ' + formatDateTime(order.Status.dateReceiverReturn)],

      [order.Status.dateSendPackage, 'Người gửi gửi đơn hàng tại điểm giao dịch ' + order?.transactionPointStart?.name + " lúc " + formatDateTime(order.Status.dateSendPackage)],

      [order.Status.dateSendToPointEnd, "Đơn hàng chuyển tới điểm giao dịch " + order?.transactionPointEnd?.name + " lúc " + formatDateTime(order.Status.dateSendToPointEnd)],

      [order.Status.dateSendToReceiver, "Đơn hàng đã chuyển tới người nhận lúc " + formatDateTime(order.Status.dateSendToReceiver)],

      [order.Status.dateSendToWarehouseEnd, "Đơn hàng rời khỏi kho " + order?.warehouseStart?.name + " lúc " + formatDateTime(order?.Status?.dateSendToWarehouseEnd)],

      [order.Status.dateSendToWarehouseStart,
      "Đơn hàng rời khỏi điểm giao dịch " + order?.transactionPointStart?.name + " lúc " + formatDateTime(order.Status.dateSendToWarehouseStart)],

      [order.Status.dateWarehouseEndReceived,
      "Đơn hàng nhập kho " + order?.warehouseEnd?.name + " lúc " + formatDateTime(order.Status.dateWarehouseEndReceived)],

      [order.Status.dateWarehouseStartReceived,
      "Đơn hàng nhập kho " + order?.warehouseStart?.name + " lúc " + formatDateTime(order.Status.dateWarehouseStartReceived)],

      [order.Status.receivedDate, "Đơn hàng được trả lại lúc " + order.Status.receivedDate]
    ];
    const filteredStatusTimes = statusTimes.filter(time => time[0] !== null);
    filteredStatusTimes.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    console.log(statusTimes);
    console.log(filteredStatusTimes);
    setStatusPackage(filteredStatusTimes);
    setText("");
    setSuggestions("");
    var input = document.querySelector('#nav input');
    input.style.borderRadius = '15px';
  };
  return (
    <div id='header'>
      <nav id="nav">
        <ul className="menuNav">
          <li>
            <div className="logo">
              <Link to='/'>
                <h2>FUTA Express</h2>
              </Link>
            </div>
          </li>
          {/* <span className='header-span'></span> */}
          <li>
            <Link to='/aboutUs'>
              Giới thiệu
            </Link>
          </li>
          <li>
            <Link to='/construction'>
              Hướng dẫn
            </Link>
          </li>
          <li>
            <div className="search">
              <input type="text"
                id="search-input"
                placeholder='Nhập mã đơn hàng...'
                value={text}
                onChange={e => onChangeHandler(e.target.value)}>
              </input>
            </div>
            {suggestions && suggestions.map((suggestion, index) => (
              <div key={index} className="searchBox" onClick={() => openModal(suggestion)}>
                {suggestion.packageCode}
                <br></br>
              </div>
            ))}
          </li>
          {!isLogged && <li>
            <Link to='/login'>
              Đăng nhập
            </Link>
          </li>}
          {isLogged && userData && <li onClick={() => dispatch(actions.logout())}>

            <Link to='/login'>
              <div>Đăng xuất</div>
            </Link>
          </li>}
        </ul>
      </nav>
      <br></br>
      <div className="post">
        <h1>Welcome to FUTA Express!</h1>
      </div>
    </div>
  )
}

export default Header