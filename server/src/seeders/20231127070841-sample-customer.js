'use strict';

function generateRandomPhoneNumber() {
  const secondDigitOptions = ['9', '8', '1'];
  const secondDigit = secondDigitOptions[Math.floor(Math.random() * secondDigitOptions.length)];

  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return '0' + secondDigit + String(randomNumber).substring(0, 8);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Customers', [
      {
        // Sample data for the first record
        name: 'Nguyễn Văn A',
        phone: generateRandomPhoneNumber(),
        address: 'Thái Nguyên, Việt Nam',
      },
      {
        // Sample data for the first record
        name: 'Nguyễn Thị B',
        phone: generateRandomPhoneNumber(),
        address: 'Hà Nội, Việt Nam',
      },
      {
        // Sample data for the first record
        name: 'Nguyễn Văn C',
        phone: generateRandomPhoneNumber(),
        address: 'Cao Bằng, Việt Nam',
      },
      {
        // Sample data for the first record
        name: 'Trần Thị D',
        phone: generateRandomPhoneNumber(),
        address: 'Bắc Giang, Việt Nam',
      },
      {
        // Sample data for the first record
        name: 'Hà Văn H',
        phone: generateRandomPhoneNumber(),
        address: 'Cà Mau, Việt Nam',
      },
      {
        // Sample data for the first record
        name: 'Trần Bắc P',
        phone: generateRandomPhoneNumber(),
        address: 'Bắc Giang, Việt Nam',
      },
      {
        // Sample data for the first record
        name: 'Lý Thị Q',
        phone: generateRandomPhoneNumber(),
        address: 'Bắc Ninh, Việt Nam',
      },
      {
        // Sample data for the first record
        name: 'Da Văn S',
        phone: generateRandomPhoneNumber(),
        address: 'Ninh Thuận, Việt Nam',
      },
      {
        // Sample data for the first record
        name: 'Tiêu Văn V',
        phone: generateRandomPhoneNumber(),
        address: 'Hà Nội, Việt Nam',
      },
      {
        // Sample data for the first record
        name: 'Đường Thị T',
        phone: generateRandomPhoneNumber(),
        address: 'Nha Trang, Việt Nam',
      }
      
      
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Customers', null, {});
  },
};
