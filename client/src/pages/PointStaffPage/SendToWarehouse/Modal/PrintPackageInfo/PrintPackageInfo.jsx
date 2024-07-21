import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { useReactToPrint } from 'react-to-print';
import SignaturePad from 'react-signature-canvas';
import QRCode from 'qrcode.react';

function PrintPackageInfo({ showModal, handleClose, selectedPackage, statusPackage }) {
  const modalContentRef = useRef();
  const signaturePadRefSender = useRef();
  const signaturePadRefReceiver = useRef();

  const handlePrint = useReactToPrint({
    content: () => modalContentRef.current,
    documentTitle: 'Giấy biên nhận chuyển phát',
    onAfterPrint: () => alert('Đã lưu giấy biên nhận chuyển phát'),
  });

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Chi tiết đơn hàng
        </Modal.Title>
        <CloseIcon onClick={handleClose}>Đóng</CloseIcon>
      </Modal.Header>
      <Modal.Body>
        {selectedPackage && (
          <div ref={modalContentRef} className="packageForm">
            <div className="flex3">
              <div className="infoPerson">
                <div className="flex1">
                  <p>THÔNG TIN NGƯỜI DÙNG</p>
                </div>
                <div className="flex4">
                  <div className="flex5">
                    <p className="pLabel">
                      <strong>(*) Người gửi</strong>
                    </p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Họ và tên: </p>
                    <p>{selectedPackage.sender.name}</p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Số điện thoại: </p>
                    <p>{selectedPackage.sender.phone}</p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Địa chỉ: </p>
                    <p>{selectedPackage.sender.address}</p>
                  </div>
                </div>
                <hr />
                <div className="flex4">
                  <div className="flex5">
                    <p className="pLabel">
                      <strong>(*) Người nhận</strong>
                    </p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Họ và tên: </p>
                    <p>{selectedPackage.receiver.name}</p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Số điện thoại: </p>
                    <p>{selectedPackage.receiver.phone}</p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Địa chỉ: </p>
                    <p>{selectedPackage.receiver.address}</p>
                  </div>
                </div>
              </div>
              <div className="infoPackage">
                <div className="flex1">
                  <p>THÔNG TIN ĐƠN HÀNG</p>
                </div>
                <div className="flex4">
                  <div className="flex5">
                    <p className="pLabel">Mã đơn hàng: </p>
                    <p>{selectedPackage.packageCode}</p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Tên sản phẩm: </p>
                    <p>{selectedPackage.name}</p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Giá vận chuyển: </p>
                    <p>{selectedPackage.shippingCost}</p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Điểm gửi hàng: </p>
                    <p>{selectedPackage.transactionPointStart.name}</p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Điểm nhận hàng: </p>
                    <p>
                      {selectedPackage.transactionPointEnd
                        ? selectedPackage.transactionPointEnd.name
                        : null}
                    </p>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Thông tin vận chuyển: </p>
                    <br />
                    <ul>
                      {statusPackage &&
                        statusPackage.map((item, i) => (
                          <li key={i}>
                            <p
                              className={
                                i === statusPackage.length - 1 ? 'pStatus' : ''
                              }
                            >
                              {item[1]}
                            </p>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="flex5">
                    <p className="pLabel">Chữ ký người gửi: </p>
                    <div style={{ marginLeft: '150px'}}>
                    <p>Mã QR đơn: </p>
                </div>
                  </div>
                  <div className="flex5" style={{ display: 'flex', alignItems: 'center' }}>
                  <p className="pLabel">Chữ ký người nhận: </p>
                  <div style={{ marginLeft: '150px', marginBottom: '30px'}}>
                      <QRCode value={selectedPackage.packageCode} size={50} />
                  </div>
              </div>
              
                </div>
              </div>
            </div>
            </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handlePrint}>
          Xuất PDF
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PrintPackageInfo;
