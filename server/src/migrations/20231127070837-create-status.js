'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Statuses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      packageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'packages', key: 'id' }
      },
      nameOfStatus: {
        allowNull: false,
        type: Sequelize.ENUM(['DELIVERING', 'SUCCESS', 'FAILED'])
      },
      dateSendPackage: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dateSendToWarehouseStart: {
        allowNull: true,
        type: Sequelize.DATE
      },
      dateWarehouseStartReceived: {
        allowNull: true,
        type: Sequelize.DATE
      },
      dateSendToWarehouseEnd: {
        allowNull: true,
        type: Sequelize.DATE
      },
      dateWarehouseEndReceived: {
        allowNull: true,
        type: Sequelize.DATE
      },
      dateSendToPointEnd: {
        allowNull: true,
        type: Sequelize.DATE
      },
      datePointEndReceived: {
        allowNull: true,
        type: Sequelize.DATE
      },
      dateSendToReceiver: {
        allowNull: true,
        type: Sequelize.DATE
      },
      dateReceiverReturn: {
        allowNull: true,
        type: Sequelize.DATE
      },
    receivedDate: {
        allowNull: true,
        type: Sequelize.DATE
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Statuses');
  }
};