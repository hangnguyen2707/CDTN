import React from 'react';
import './Report.css'; // Import CSS để giữ nguyên style

const Report = () => {
  return (
    <div style={{ marginTop: '50px' }}>

      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="from-date">Từ ngày:</label>
          <input type="date" id="from-date" name="from-date" />
        </div>
        <div className="filter-group">
          <label htmlFor="to-date">Đến ngày:</label>
          <input type="date" id="to-date" name="to-date" />
        </div>
        <div className="filter-group">
          <label htmlFor="region">Miền:</label>
          <select id="region" name="region">
            <option value="">Chọn miền...</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="report-region">Vùng báo cáo:</label>
          <select id="report-region" name="report-region">
            <option value="">Chọn vùng...</option>
          </select>
        </div>
        <div className="filter-group">
          <input type="checkbox" id="internal-bill" name="internal-bill" />
          <label htmlFor="internal-bill">Chỉ lấy đơn giao nội tỉnh</label>
        </div>
        <div className="filter-group">
          <label htmlFor="transfer-unit">Điểm/ Kho chuyển tiếp:</label>
          <input type="text" id="transfer-unit" name="transfer-unit" />
        </div>
        <div className="filter-group">
          <label htmlFor="search-transfer">Nhập nhiều mã đơn vị cách nhau bằng dấu ","</label>
          <input type="checkbox" id="search-transfer" name="search-transfer" defaultChecked />
        </div>
        <div className="filter-group">
          <button type="button">Tìm</button>
          <button type="button">Lưu dữ liệu</button>
          <button type="button">Excel</button>
        </div>
      </div>

      <div className="table-container">
        <table className="result-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã gói hàng</th>
              <th>Điểm gửi</th>
              <th>Điểm nhận</th>
              <th>Cước phí</th>
              <th>Trạng thái</th>
              <th>Ghi chú</th>
              <th>Đơn vị cập nhật kết quả</th>
              <th>Cập nhật gần nhất</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
