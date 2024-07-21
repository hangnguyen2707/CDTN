'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Employees', [
      {
        // Sample data for the first record
        accountId: '4',
        transactionPointId: '1',
      },
      {
        // Sample data for the first record
        accountId: '5',
        warehouseId: '1',
      },
      {
        // Sample data for the first record
        accountId: '6',
        transactionPointId: '1',
      },
      {
        // Sample data for the first record
        accountId: '7',
        warehouseId: '1',
      },
      {
        // Sample data for the first record
        accountId: '20',
        transactionPointId: '2',
      },
      {
        // Sample data for the first record
        accountId: '21',
        transactionPointId: '3',
      },
      {
        // Sample data for the first record
        accountId: '22',
        transactionPointId: '4',
      },
      {
        // Sample data for the first record
        accountId: '23',
        transactionPointId: '5',
      },
      {
        // Sample data for the first record
        accountId: '24',
        transactionPointId: '6',
      },
      {
        // Sample data for the first record
        accountId: '25',
        transactionPointId: '7',
      },
      {
        // Sample data for the first record
        accountId: '26',
        warehouseId: '2',
      },
      {
        // Sample data for the first record
        accountId: '27',
        warehouseId: '3',
      },
      {
        // Sample data for the first record
        accountId: '28',
        warehouseId: '4',
      },
      {
        // Sample data for the first record
        accountId: '29',
        warehouseId: '5',
      },
      {
        // Sample data for the first record
        accountId: '30',
        warehouseId: '6',
      },
      {
        // Sample data for the first record
        accountId: '31',
        warehouseId: '7',
      },
      // Add more records as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Employees', null, {});
  },
};
