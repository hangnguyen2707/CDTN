import React, { useEffect, useState, useRef } from 'react'
import './Login.css'
import Button from '../../../conponents/Button/Button'
import * as actions from '../../../store/actions'
import { useNavigate } from 'react-router-dom'
import car from '../../../assets/images/car.png'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const ref = useRef();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { isLogged } = useSelector(state => state.auth)
  const { userData } = useSelector(state => state.user)

  const [payload, setPayload] = useState({
    phone: '',
    password: ''
  })


  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: ref.current.offsetTop })
    isLogged && navigate('/loading')
  }, [isLogged])


  const [errorPhoneMessage, setErrorPhoneMessage] = useState('');
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('');

  const passwordRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }
  }

  const handleSubmit = async () => {
    try {
      if (!payload.phone) {
        setErrorPhoneMessage('Vui lòng nhập tên đăng nhập!');
      } else if (payload.phone[0] !== '0' || !(payload.phone.match('[0-9]{10}'))) {
        setErrorPhoneMessage('Số điện thoại không hợp lệ!');
      } else {
        setErrorPhoneMessage('');
      }
      if (!payload.password) {
        setErrorPasswordMessage('Vui lòng nhập mật khẩu!');
      } else {
        setErrorPasswordMessage('');
      }
      if (!payload.phone || !payload.password) return;
      const response = dispatch(actions.login(payload))

      setTimeout(() => {
        if (!window.localStorage.getItem('persist:auth').isLogged ) {
          setErrorPasswordMessage('');
        } else {
          setErrorPasswordMessage('');
        }
      }, 500)
      
    } catch (error) {
      setErrorPasswordMessage('Đã xảy ra lỗi khi đăng nhập!');
    }
  }

  return (
    <div id="container" ref={ref}>
      <div id="container-signIn">
        <div id="flex1">
          <div className="flexRow">
            <img id="imgSignIn" src={car} alt="" />
            <h1>Đăng nhập</h1>
          </div>
          <form>
            <div id="phoneDiv">
              <label className='label-login'>Tên đăng nhập</label>
              <input type="text" id='phone'
                value={payload.phone}
                placeholder="Tên đăng nhập"
                onKeyDown={handleKeyDown}
                onChange={(e) => setPayload(prev => ({ ...prev, phone: e.target.value }))} />
            </div>
            {errorPhoneMessage && (
            <p style={{ color: 'red', marginTop: '5px' }}>{errorPhoneMessage}</p>
            )}
            <div id="passwordDiv">
              <label className='label-login'>Mật khẩu</label>
              <input id='password'
                type="password"
                placeholder="Mật khẩu"
                value={payload.password}
                ref={passwordRef}
                onChange={(e) => setPayload(prev => ({ ...prev, password: e.target.value }))} />
            </div>
            {errorPasswordMessage && (
            <p style={{ color: 'red', marginTop: '5px' }}>{errorPasswordMessage}</p>
            )}
          </form>
          <br></br>
          <button className="btnSignIn" onClick={handleSubmit}>Đăng nhập</button>
          <br></br>
          
        </div>
      </div>
      <div id="poster">
        <div id="flex2">
          
        </div>
      </div>
    </div>
  )
}

export default Login