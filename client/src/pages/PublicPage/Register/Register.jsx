import React, { useState } from 'react'
import './Register.css'
import Button from '../../../conponents/Button/Button'
import * as actions from '../../../store/actions'
import { useDispatch } from 'react-redux'

const Register = () => {
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    password: '',
    address: ''
  })
  const handleSubmit = async () => {
    console.log(payload)
    dispatch(actions.register(payload))
  }

  return (
    <div id='register'>
        <br></br>
        <h3>ĐĂNG KÝ</h3>
        <div>
          <div class="input-icons">
            <i class="fa fa-edit icon"></i>
            <input type="text" id='name' placeholder="Họ và tên"
            value={payload.name} onChange={(e) => setPayload(prev => ({...prev, name: e.target.value}) )} />
            <br></br>
            <i class="fa fa-phone icon"></i>
            <input type="text" id='phone' placeholder="Số điện thoại"
            value={payload.phone} onChange={(e) => setPayload(prev => ({...prev, phone: e.target.value}) )} />
             <br></br>
            <i class="fa fa-edit icon"></i>
            <input id='password' type="password" 
            placeholder="Mật khẩu" value={payload.password} onChange={(e) => setPayload(prev => ({...prev, password: e.target.value}) )} />
             <br></br>
            <i class="fa fa-edit icon"></i>
            <input id='password' type="password" 
            placeholder="Nhập lại mật khẩu" value={payload.password} onChange={(e) => setPayload(prev => ({...prev, password: e.target.value}) )} />
             <br></br>
            <i class="fa fa-edit icon"></i>
            <input type="text" id='address' 
            placeholder="Địa chỉ" value={payload.address} onChange={(e) => setPayload(prev => ({...prev, address: e.target.value}) )} />
          </div>
        </div>
        <br></br>
        <div id = "btn">
        <Button className='item' text="Đăng ký" textColor="white" bgColor="black" width="100px" onClick={handleSubmit} />
        </div>
        <br></br>
    </div>

  )
}

export default Register