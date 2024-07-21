import tem from '../../../assets/images/tem.png'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PackageForm = () => {
    const location = useLocation()
    const { packageItem, statusPackage } = location.state || {};
    const navigate = useNavigate();

    const handleClickClose = async () => {
        navigate('*')
    }

    // console.log(statusPackage);
    // console.log(packageItem)
    return (
        <div className='packageForm'>
            <div className='headerPackage'>
                <div className='flex2'>
                    <h1>BIỂU MẪU ĐƠN HÀNG</h1>
                    <p>Magic Post</p>
                </div>
                <button className="btnCloseForm"
                    onClick={handleClickClose}>
                    <i class="fa fa-times icon"></i>
                </button>
            </div>
            <div className='flex3'>
                <div className="infoPerson">
                    <div className="flex1">
                        <p>THÔNG TIN NGƯỜI DÙNG</p>
                    </div>
                    <div className="flex4">
                        <div className="flex5">
                            <p className='pLabel'><strong>(*) Người gửi</strong></p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Họ và tên: </p>
                            <p>{packageItem.sender.name}</p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Số điện thoại: </p>
                            <p>{packageItem.sender.phone}</p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Địa chỉ: </p>
                            <p>{packageItem.sender.address}</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex4">
                        <div className="flex5">
                            <p className='pLabel'><strong>(*) Người nhận</strong></p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Họ và tên: </p>
                            <p>{packageItem.receiver.name}</p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Số điện thoại: </p>
                            <p>{packageItem.receiver.phone}</p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Địa chỉ: </p>
                            <p>{packageItem.receiver.address}</p>
                        </div>
                    </div>
                </div>
                <div className="infoPackage">
                    <div className="flex1">
                        <p>THÔNG TIN ĐƠN HÀNG</p>
                    </div>
                    <div className="flex4">
                        <div className="flex5">
                            <p className='pLabel'>Mã đơn hàng: </p>
                            <p>{packageItem.packageCode}</p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Tên sản phẩm: </p>
                            <p>{packageItem.name}</p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Giá vận chuyển: </p>
                            <p>{packageItem.shippingCost}</p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Điểm gửi hàng: </p>
                            <p>{packageItem.transactionPointStart.name}</p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Điểm nhận hàng: </p>
                            <p>{packageItem.transactionPointEnd ? packageItem.transactionPointEnd.name : null}</p>
                        </div>
                        <div className="flex5">
                            <p className='pLabel'>Thông tin vận chuyển: </p>
                            <br></br>
                            <ul>
                                {statusPackage.map((item, i) => (
                                    <li key={i}>
                                        <p className={i === statusPackage.length - 1 ? 'pStatus' : ''}>
                                            {item[1]}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="footerPackage">
                <hr></hr>
                <p>
                    <i>
                        <strong>Lưu ý:</strong> Có vấn đề về thông tin khách hàng hay đơn hàng thì vui lòng liên hệ cho số điện thoại (+84)123456789</i>
                </p>
                <p>
                    <i>
                        <strong>Thời gian hỗ trợ:</strong> Thứ 2 đến thứ 6 (8h30-17h00) hàng tuần</i>
                </p>
            </div>
        </div >
    )
}

export default PackageForm