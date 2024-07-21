'use strict';

function taoMaDonHang() {
  // Tạo một chuỗi ngẫu nhiên cho mã đơn hàng
  const kyTuNgauNhien = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let maDonHang = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * kyTuNgauNhien.length);
    maDonHang += kyTuNgauNhien.charAt(randomIndex);
  }

  // Thêm một định danh thời gian để đảm bảo tính duy nhất
  const thoiGianHienTai = new Date().getTime();
  maDonHang += thoiGianHienTai.toString();

  return maDonHang;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const packagesData = [];

    for (let i = 1; i <= 300; i++) {
      // Generate senderId
      const senderId = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 4

      // Generate receiverId (ensuring it's different from senderId)
      let receiverId;
      do {
        receiverId = Math.floor(Math.random() * 10) + 1;
      } while (receiverId === senderId);

      packagesData.push({
        packageCode: taoMaDonHang(),
        senderId,
        receiverId,
        warehouseStartId: ((i + 2) % 7) + 1,
        transactionPointStartId: (((i + 2) % 7))*3 + ((i + 2) % 3) + 1,
        name: `Item ${i}`,
        shippingCost: (i * 1000).toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Packages', packagesData);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Packages', null, {});
  },
};