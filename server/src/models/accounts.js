'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accounts.hasOne(models.Employee, {foreignKey: 'accountId',sourceKey: 'id'}),
      Accounts.hasMany(models.TransactionPoint, {foreignKey: 'pointLeaderId',sourceKey: 'id'}),
      Accounts.hasMany(models.Warehouse, {foreignKey: 'leaderId',sourceKey: 'id'})
    }
  }
  Accounts.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    accountType: DataTypes.ENUM(['BOSS','WAREHOUSE_LEADER', 'WAREHOUSE_STAFF', 'POINT_LEADER', 'POINT_STAFF', 'CUSTOMER' ]),
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Accounts',
  });
  return Accounts;
};
