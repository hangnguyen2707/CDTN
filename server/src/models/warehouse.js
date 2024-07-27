'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warehouse.belongsTo(models.Accounts, {foreignKey: 'leaderId', as: 'warehouseLeader'}),
      Warehouse.hasMany(models.Employee, {foreignKey: 'warehouseId', sourceKey: 'id', onDelete: 'CASCADE', hooks: true}),
      Warehouse.hasMany(models.TransactionPoint, {foreignKey: 'warehouseId', sourceKey: 'id'}),
      Warehouse.hasMany(models.Package, {foreignKey: 'warehouseStartId', sourceKey: 'id'}),
      Warehouse.hasMany(models.Package, {foreignKey: 'warehouseEndId', sourceKey: 'id'})
    }
  }
  Warehouse.init({
    name: DataTypes.STRING(30),
    address: DataTypes.STRING,
    leaderId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Warehouse',
  });
  return Warehouse;
};
