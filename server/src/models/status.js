'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
   
    static associate(models) {
      // define association here
      Status.belongsTo(models.Package, {foreignKey: 'packageId'})
    }
  }
  Status.init({
    packageId: DataTypes.INTEGER,
    nameOfStatus: DataTypes.ENUM(['DELIVERING', 'SUCCESS', 'FAILED']),
    dateSendPackage: DataTypes.DATE,
    dateSendToWarehouseStart: DataTypes.DATE,
    dateWarehouseStartReceived: DataTypes.DATE,
    dateSendToWarehouseEnd: DataTypes.DATE,
    dateWarehouseEndReceived: DataTypes.DATE,
    dateSendToPointEnd: DataTypes.DATE,
    datePointEndReceived: DataTypes.DATE,
    dateSendToReceiver: DataTypes.DATE,
    dateReceiverReturn: DataTypes.DATE,
    receivedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};