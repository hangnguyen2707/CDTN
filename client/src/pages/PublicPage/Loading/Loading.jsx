import React, { useEffect } from 'react'
import './Loading.css'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../store/actions'
import runner from '../../../assets/images/runner.gif'
import { useNavigate } from 'react-router-dom'

const Loading = () => {    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLogged} = useSelector(state => state.auth)
    const {userData} = useSelector(state => state.user)

    useEffect(() => {
        setTimeout(() => {
            isLogged && dispatch(actions.getUser())
        },500)
        
    },[isLogged])

    console.log(userData)
    let i = 0
    useEffect(() => {
            userData && setTimeout(() => {

                if (!(Object.keys(userData).length === 0) && !(userData.length === 0)) {
                    localStorage.setItem('role', userData[0].accountType);
                    localStorage.setItem('id', userData[0].id);
                    localStorage.setItem('name', userData[0].name);
                    switch(userData[0].accountType){
                        case 'POINT_STAFF':
                        
                            localStorage.setItem('transactionPointId', userData[0].Employee?.TransactionPoint?.id|| '-1')
                            console.log(userData[0].Employee?.TransactionPoint?.Warehouse.id)
                            localStorage.setItem('warehouseId', userData[0].Employee?.TransactionPoint?.Warehouse.id || '-1' )
                            break
                        
                        case 'WAREHOUSE_STAFF':
                            localStorage.setItem('warehouseId', userData[0].Employee?.Warehouse?.id|| '-1')
                            break
                        case 'POINT_LEADER':
                            localStorage.setItem('transactionPointId', userData[0].TransactionPoints[0]?.id|| '-1')
                            break
                        case 'WAREHOUSE_LEADER':
                            localStorage.setItem('warehouseId', userData[0].Warehouses[0]?.id|| '-1')
                            break
                    }   
                    
                    navigate('/boss/dashboard');
                    window.location.reload();
                }
                
                
            }, 1000);
    },[userData])
    
    return(
        <div className='loading'>
              <div className='loadingLogo'>
                <div className='loadingPost'>
                  <h1>Bạn có biết?</h1>
                  <br></br>
                  <p>Magic Post là đơn vị vận chuyển có số lượng người dùng trong năm 2023 cao nhất Việt Nam</p>
                </div>
                <img src={runner} alt="" />
              </div>
              <div className = "loader"></div> 
            </div>
    )
}

export default Loading 