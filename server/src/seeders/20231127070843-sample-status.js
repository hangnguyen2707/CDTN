'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const statusesData = [];

    for (let i = 1; i <= 100; i++) {
      const dateSendPackage = new Date();
      
      statusesData.push({
        packageId: i.toString(),
        nameOfStatus: 'DELIVERING',
        dateSendPackage,
      });
    }

    for (let i = 1; i <= 100; i++) {
      const dateSendPackage = new Date();
      
      // Tính toán thời điểm datePointStartReceived sau dateSendPackage
      const dateSendToWarehouseStart = new Date(dateSendPackage.getTime() + 1 * 60000); // Ví dụ: tăng 1 phút cho mỗi bản ghi
      
      statusesData.push({
        packageId: (100+i).toString(),
        nameOfStatus: 'DELIVERING',
        dateSendPackage,
        dateSendToWarehouseStart,
      });
    }

      for (let i = 1; i <= 100; i++) {
        const dateSendPackage = new Date();
        
        // Tính toán thời điểm datePointStartReceived sau dateSendPackage
        const dateSendToWarehouseStart = new Date(dateSendPackage.getTime() +  60000); // Ví dụ: tăng 1 phút cho mỗi bản ghi
        const dateWarehouseStartReceived = new Date(dateSendPackage.getTime() + 2 * 60000);
        
        statusesData.push({
          packageId: (200+i).toString(),
          nameOfStatus: 'DELIVERING',
          dateSendPackage,
          dateSendToWarehouseStart,
          dateWarehouseStartReceived
        });
    }

    await queryInterface.bulkInsert('Statuses', statusesData);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('Statuses', null, {});
  },
};