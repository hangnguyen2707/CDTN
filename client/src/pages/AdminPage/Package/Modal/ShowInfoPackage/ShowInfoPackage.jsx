import { Modal, Tabs, Tab, ModalBody } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';


function ShowInfoPackage({ order, statusPackage, ...props }) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter" className="custom-modal" backdrop="static" size="lg">
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Chi tiết đơn hàng
                </Modal.Title>
                <CloseIcon onClick={props.onHide}>Đóng</CloseIcon>
            </Modal.Header>
            <Modal.Body>
                {order && (
                    <div className='packageForm'>
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
                                        <p>{order.sender.name}</p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Số điện thoại: </p>
                                        <p>{order.sender.phone}</p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Địa chỉ: </p>
                                        <p>{order.sender.address}</p>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className="flex4">
                                    <div className="flex5">
                                        <p className='pLabel'><strong>(*) Người nhận</strong></p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Họ và tên: </p>
                                        <p>{order.receiver.name}</p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Số điện thoại: </p>
                                        <p>{order.receiver.phone}</p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Địa chỉ: </p>
                                        <p>{order.receiver.address}</p>
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
                                        <p>{order.packageCode}</p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Tên sản phẩm: </p>
                                        <p>{order.name}</p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Giá vận chuyển: </p>
                                        <p>{order.shippingCost} (VNĐ)</p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Điểm gửi hàng: </p>
                                        <p>{order.transactionPointStart.name}</p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Điểm nhận hàng: </p>
                                        <p>{order.transactionPointEnd ? order.transactionPointEnd.name : null}</p>
                                    </div>
                                    <div className="flex5">
                                        <p className='pLabel'>Thông tin vận chuyển: </p>
                                        <br></br>
                                        <ul>
                                            {statusPackage && Array.isArray(statusPackage) && statusPackage.map((item, i) => (
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
                    </div >
                )}

            </Modal.Body>
        </Modal>
    );
}

export default ShowInfoPackage;