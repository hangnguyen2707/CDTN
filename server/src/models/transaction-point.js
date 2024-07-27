'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionPoint.hasMany(models.Package, {foreignKey: 'transactionPointStartId', sourceKey: 'id'}),
      TransactionPoint.hasMany(models.Package, {foreignKey: 'transactionPointEndId', sourceKey: 'id'}),
      TransactionPoint.belongsTo(models.Accounts, {foreignKey: 'pointLeaderId', as: 'pointLeader'}),
      TransactionPoint.belongsTo(models.Warehouse, {foreignKey: 'warehouseId'}),
      TransactionPoint.hasMany(models.Employee, {foreignKey: 'transactionPointId', sourceKey: 'id', onDelete: 'CASCADE', hooks: true})
    }
  }
  TransactionPoint.init({
    warehouseId: DataTypes.INTEGER,
    pointLeaderId: DataTypes.INTEGER,
    name: DataTypes.STRING(30),
    address: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionPoint',
  });
  return TransactionPoint;
};
