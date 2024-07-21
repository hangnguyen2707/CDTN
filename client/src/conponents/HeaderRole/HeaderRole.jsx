import React, { useEffect } from 'react';
import './HeaderRole.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import { useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../store/actions'

function HeaderRole ({ btnText, onClick }) {
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const dispatch = useDispatch()
    const { isLogged } = useSelector(state => state.auth)
    const {userData} = useSelector(state => state.user)
    const navigate = useNavigate();
    const { warehouses } = useSelector((state) => state.warehouse);
    const [warehouseName, setWarehouseName] = useState("");
    const [transactionPointName, setTransactionPointName] = useState("");
    const { transactionPoints } = useSelector((state) => state.transactionPoint);
    useEffect(() => {
      dispatch(actions.getAllTransactionPoints());
    }, []);
    
    useEffect(() => {
    const selectedTransactionPoint = transactionPoints.find(
      (transactionPoint) => transactionPoint.id == localStorage.getItem('transactionPointId')
    );
  
    if (selectedTransactionPoint) {
      setTransactionPointName(selectedTransactionPoint.name);
    } else {
      setTransactionPointName("");
    }
  }, [transactionPoints]);
    useEffect(() => {
      dispatch(actions.getAllWarehouses());
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
  
    const userRole = localStorage.getItem('role');

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

    return (
        <div className='dashboard-header-container'>
            {btnText && 
                <button className='dashboard-header-btn' onClick={onClick}>{btnText}</button>
            }

            {/*
            <div className='dashboard-header-right'>
                <img 
                    src={NotificationIcon}
                    className='dashboard-header-icon' />
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
        className='dashboard-header-icon' /> */}
                    <Tippy
                    interactive
                    visible={visible}
                    onClickOutside={hide}
                    // placement="bottom-end"
                    placement="bottom"
                    render={(attrs) => (
                    <div className="user__profile" style={ {marginLeft: '2em',backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6))',
                        color: 'white', border:'black', borderRadius: '10px', zIndex:'999'}} tabIndex="-1" {...attrs}>
                            <Box
                                sx={{
                                    padding: '12px 20px',
                                    brentBottom: '1px solid #ccc',
                                    minWidth: '200px',
                                }}
                            >
                                <Typography sx={{ fontSize: '0.875rem', textAlign: 'center', fontWeight: 'bolder' }} variant="h6">
                                    {localStorage.getItem('name')}
                                </Typography>
                           
                                  {userRole === 'POINT_STAFF' && (
                                    <Typography
                                        sx={{
                                            fontSize: '0.8rem',
                                            textAlign: 'center',
                                            fontWeight: 'bolder',
                                        }}
                                        variant="h6"
                                    >
                                        GIAO DỊCH VIÊN
                                    </Typography>
                                )} 
                                {userRole === 'POINT_LEADER' && (
                                    <Typography
                                        sx={{
                                            fontSize: '0.8rem',
                                            textAlign: 'center',
                                            fontWeight: 'bolder',
                                        }}
                                        variant="h6"
                                    >
                                        TRƯỞNG ĐIỂM 
                                    </Typography>
                                )}
                                {userRole === 'WAREHOUSE_LEADER' && (
                                    <Typography
                                        sx={{
                                            fontSize: '0.8rem',
                                            textAlign: 'center',
                                            fontWeight: 'bolder',
                                        }}
                                        variant="h6"
                                    >
                                        TRƯỞNG KHO
                                    </Typography>
                                )}
                                {userRole === 'WAREHOUSE_STAFF' && (
                                    <Typography
                                        sx={{
                                            fontSize: '0.8rem',
                                            textAlign: 'center',
                                            fontWeight: 'bolder',
                                        }}
                                        variant="h6"
                                    >
                                        NHÂN VIÊN KHO
                                    </Typography>
                                )}
                                {userRole === 'BOSS' && (
                                    <Typography
    sx={{
      fontSize: '0.875rem',
      textAlign: 'center',
      fontWeight: 'bolder',
    }}
    variant="h6"
  >
    Lãnh đạo
  </Typography>                                  
                                  )}
                            
                                  {(userRole === 'POINT_STAFF' || userRole === 'POINT_LEADER') && (
                                    <Typography
                                      sx={{
                                        fontSize: '0.875rem',
                                        textAlign: 'center',
                                        fontWeight: 'bolder',
                                      }}
                                      variant="h6"
                                    >
                                      {transactionPointName !== '' ? transactionPointName : warehouseName}
                                    </Typography>
                                  )}
                            
                                  {(userRole === 'WAREHOUSE_STAFF' || userRole === 'WAREHOUSE_LEADER') && (
                                    <Typography
                                      sx={{
                                        fontSize: '0.875rem',
                                        textAlign: 'center',
                                        fontWeight: 'bolder',
                                      }}
                                      variant="h6"
                                    >
                                      {transactionPointName !== '' ? transactionPointName : warehouseName}
                                    </Typography>
                                  )}
                                </Box>
                            <Box
                                sx={{
                                    padding: '5px 20px',
                                    brentBottom: '1px solid #ccc',
                                }}
                            >
                                <Button variant="text" style={{color: 'white'}} fullWidth onClick={handleClickLogout}>
                                    Đăng xuất
                                </Button>
                            </Box>
                        </div>
                    )}
                >
                    <Avatar
                        className="user__avatar"
                        onClick={visible ? hide : show}
                        src='https://reqres.in/img/faces/7-image.jpg'
                        sx={{ marginRight: '60px' }}
                    />
                </Tippy>
        </div>
    );
}

export default HeaderRole;
