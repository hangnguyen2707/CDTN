import React, { useEffect, useRef} from 'react'
import './Construction.css'
import home from '../../../assets/images/home.png'

const Construction = () => {
    const ref = useRef();
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: ref.current.offsetTop })
      }, []);
    return(
        <div id = "construction" ref={ref}>
            <h1>Người dùng truy cập trang chủ Home</h1>
            <img id = "imgInstruction" src = {home}></img>
            <p>
                Bước 1: Tại đây, nhập mã đơn hàng tại thanh tìm kiếm <br></br>
                Bước 2: Nhấn nút xác nhận <br></br>
                Bước 3: Hệ thống sẽ hiển thị thông tin trạng thái đơn hàng <br></br>
            </p>
        </div>
    )
}

export default Construction