'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Package.hasOne(models.Status, {foreignKey: 'packageId',sourceKey: 'id'}),
      Package.belongsTo(models.Customer, {foreignKey: 'senderId', as: 'sender'}),
      Package.belongsTo(models.Customer, {foreignKey: 'receiverId', as: 'receiver'}),
      Package.belongsTo(models.TransactionPoint, {foreignKey: 'transactionPointStartId', as: 'transactionPointStart'}),
      Package.belongsTo(models.TransactionPoint, {foreignKey: 'transactionPointEndId', as: 'transactionPointEnd'}),
      Package.belongsTo(models.Warehouse, {foreignKey: 'warehouseStartId', as: 'warehouseStart'}),
      Package.belongsTo(models.Warehouse, {foreignKey: 'warehouseEndId', as: 'warehouseEnd'})
    }
  }
  Package.init({
    packageCode: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    transactionPointStartId: DataTypes.INTEGER,
    warehouseStartId: DataTypes.INTEGER,
    warehouseEndId: DataTypes.INTEGER,
    transactionPointEndId: DataTypes.INTEGER,
    name: DataTypes.STRING(30),
    shippingCost: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Package',
  });
  return Package;
};