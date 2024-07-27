const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const {v4} = require('uuid');
const { Sequelize, DataTypes } = require('sequelize');

function taoMaDonHang() {
  // Tạo một chuỗi ngẫu nhiên cho mã đơn hàng
  const kyTuNgauNhien = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let maDonHang = '';

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * kyTuNgauNhien.length);
    maDonHang += kyTuNgauNhien.charAt(randomIndex);
  }

  // Thêm một định danh thời gian để đảm bảo tính duy nhất
  const thoiGianHienTai = new Date().getTime();
  maDonHang += thoiGianHienTai.toString();

  return maDonHang;
}

exports.createService = (body) => new Promise(async(resolve, reject) => {
  try {
        const sender = await db.Customer.create({
                name: body.senderName,
                phone: body.senderPhone,
                address: body.senderAddress
        })
      const receiver = await db.Customer.create({
              name: body.receiverName,
              phone: body.receiverPhone,
              address: body.receiverAddress
        })
        const responsePackage = await db.Package.create({
            packageCode: taoMaDonHang(),
            note: body.note,
            type: body.type,
            senderId: sender.id,
            receiverId: receiver.id,
            transactionPointStartId: body.transactionPointStartId,
            warehouseStartId: body.warehouseStartId,
            name: body.name,
            shippingCost: body.shippingCost

        })
        const responseStatus = await db.Status.create({
            packageId: responsePackage.id,
            nameOfStatus: 'DELIVERING',
            dateSendPackage: new Date()
        })
        resolve({
            err: responsePackage && responseStatus ? 0 : 2,
            msg: responsePackage && responseStatus ? 'Create package is successfully!' : 'Create package is failed!',
        })
    } catch (error) {
        reject(error)
    }
})

exports.getAllService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Package.findAll({
            attributes: ['id','packageCode','name', 'type', 'note', 'shippingCost'],
            include: [
                {
                model: db.Customer,
                as: 'sender',
                attributes: ['id', 'name', 'phone', 'address'],
                required: false,
              },
              {
                model: db.Customer,
                as: 'receiver',
                attributes: ['id', 'name', 'phone', 'address'],
                required: false,
              },
              {
                model: db.TransactionPoint,
                as: 'transactionPointStart',
                attributes: ['id', 'name'],
                required: false,
              },
              {
                model: db.TransactionPoint,
                as: 'transactionPointEnd',
                attributes: ['id', 'name'],
                required: false,
              },
              {
                model: db.Warehouse,
                as: 'warehouseStart',
                attributes: ['id', 'name'],
                required: false,
              },
              {
                model: db.Warehouse,
                as: 'warehouseEnd',
                attributes: ['id', 'name'],
                required: false,
              },
              {
                model: db.Status,
                attributes: ['nameOfStatus', 'dateSendPackage',
                'dateSendToWarehouseStart',
                'dateWarehouseStartReceived',
                'dateSendToWarehouseEnd',
                'dateWarehouseEndReceived',
                'dateSendToPointEnd',
                'datePointEndReceived',
                'dateSendToReceiver',
                'dateReceiverReturn', 'receivedDate'],
                required: false
              }
            ]
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get all packages is successfully' : 'Get all packages is unsuccessfully',
            response
        })
    } catch (error) {
        reject(error)
    }
})

exports.deleteService = (id) => new Promise(async(resolve, reject) => {
  try {
    const order = await db.Package.findOne({
      where: {id}
    })
    console.log(order)
    const responseStatus = await db.Status.destroy({
      where: {packageId: id}
    })
      const responsePackage = await db.Package.destroy({
        where: {id}
      })

      const responseSender = await db.Customer.destroy({
        where: {id: order.senderId}
      })
      const responseReceiver = await db.Customer.destroy({
        where: {id: order.receiverId}
      })
      resolve({
        err: responseStatus && responsePackage && responseSender && responseReceiver ? 0 : 2,
        msg: responseStatus && responsePackage && responseSender && responseReceiver ? 'Delete is successfully' : `Can't find this id`,
      })

    } catch (error) {
      reject(error)
  }
})

exports.updateService = (id, updatedData) => new Promise(async (resolve, reject) => {
  try {
    const order = await db.Package.findOne({
      where: {id}
    })

      // Assuming db.Package.update returns the number of affected rows
      const [rowsAffectedPackage] = await db.Package.update(updatedData, {
          where: { id }
      });

      const [rowsAffectedStatus] = await db.Status.update(updatedData, {
        where: { packageId: id }
    });

    let senderUpdated = {}
    let receiverUpdated = {}
    updatedData.receiverName ? receiverUpdated.name = updatedData.receiverName : null
    updatedData.receiverPhone ? receiverUpdated.phone = updatedData.receiverPhone : null
    updatedData.receiverAddress ? receiverUpdated.address = updatedData.receiverAddress : null

    updatedData.senderName ? senderUpdated.name = updatedData.senderName : null
    updatedData.senderPhone ? senderUpdated.phone = updatedData.senderPhone : null
    updatedData.senderAddress ? senderUpdated.address = updatedData.senderAddress : null

    const [rowsAffectedSender] = await db.Customer.update(senderUpdated,{
      where: {id: order.senderId}
    })
    const [rowsAffectedReceiver] = await db.Customer.update(receiverUpdated,{
      where: {id: order.receiverId}
    })
      const successMessage = 'Update is successful';
      const errorMessage = 'Update is failed';

      console.log(rowsAffectedPackage + rowsAffectedStatus)

      // Check if any rows were affected
      const response = {
          err: rowsAffectedPackage || rowsAffectedStatus || rowsAffectedSender || rowsAffectedReceiver > 0 ? 0 : 2,
          msg: rowsAffectedPackage || rowsAffectedStatus || rowsAffectedSender || rowsAffectedReceiver > 0 ? successMessage : errorMessage,
      };

      resolve(response);
  } catch (error) {
      reject(error);
  }
});
