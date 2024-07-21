import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer-clean">
        <footer>
            <div className="container">
                <div className="rowCenter">
                    <div className="colItem1">
                        <h3>Dịch vụ</h3>
                        <ul>
                            <li><a href="#">Chuyển phát</a></li>
                            <li><a href="#">Theo dõi hàng hóa</a></li>
                            <li><a href="#">Hỗ trợ khách hàng</a></li>
                        </ul>
                    </div>
                    <div className="colItem2">
                        <h3>Chúng tôi</h3>
                        <ul>
                            <li><a href="#">Công ty</a></li>
                            <li><a href="#">Nhóm </a></li>
                            <li><a href="#">Kinh tế</a></li>
                        </ul>
                    </div>
                    <div className="colItem3">
                        <h3>Địa điểm làm việc</h3>
                        <ul>
                            <li><a href="#">Kho hàng</a></li>
                            <li><a href="#">Điểm giao dịch</a></li>
                            <li><a href="#">Website</a></li>
                        </ul>
                    </div>
                </div>
                <div className="item social">
                      <a href = "https://www.facebook.com/">
                        <i className="fa fa-facebook icon"></i>
                      </a>
                      <a href = "https://www.instagram.com/">
                        <i className="fa fa-instagram icon"></i>
                      </a>
                      <a href = "https://www.youtube.com/">
                        <i className="fa fa-youtube icon"></i>
                      </a>
                </div>
                <p className="copyright">FUTA Express 2024</p>
            </div>
        </footer>
    </div>
  )
}
export default Footer