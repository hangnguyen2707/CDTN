'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Warehouses', [
      {
        name: 'Hà Nội',
        address: 'Hà Nội, Việt Nam',
        leaderId: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hồ Chí Minh',
        address: 'Hồ Chí Minh, Việt Nam',
        leaderId: '8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Đà Nẵng',
        address: 'Đà Nẵng, Việt Nam',
        leaderId: '9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hải Phòng',
        address: 'Hải Phòng, Việt Nam',
        leaderId: '10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cần Thơ',
        address: 'Cần Thơ, Việt Nam',
        leaderId: '11',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nha Trang',
        address: 'Nha Trang, Việt Nam',
        leaderId: '12',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vũng Tàu',
        address: 'Vũng Tàu, Việt Nam',
        leaderId: '13',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Huế',
        address: 'Huế, Việt Nam',
        leaderId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quy Nhơn',
        address: 'Quy Nhơn, Việt Nam',
        leaderId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Long Xuyên',
        address: 'Long Xuyên, Việt Nam',
        leaderId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Warehouses', null, {});
  },
};
