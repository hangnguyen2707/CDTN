'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      packageCode: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    senderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'customers', key: 'id' }
    },
    receiverId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'customers', key: 'id' }
    },
    transactionPointStartId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'transactionpoints', key: 'id' }
    },
    warehouseStartId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'warehouses', key: 'id' }
    },
    warehouseEndId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'warehouses', key: 'id' }
    },
    transactionPointEndId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'transactionpoints', key: 'id' }
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING(30)
    },
    shippingCost: {
        allowNull: false,
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('Packages');
  }
};