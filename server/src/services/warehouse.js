const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const { Op } = require('sequelize');

exports.createService = (body) => new Promise(async(resolve, reject) => {
  try {
        const response = await db.Warehouse.create({
            name: body.name,
            address: body.address,
            leaderId: body.leaderId
        })
        resolve({
            err: response? 0 : 2,
            msg: response? 'Create warehouse is successfully!' : 'Create warehouse is failed!',
        })
    } catch (error) {
        reject(error)
    }
})

exports.getAllService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Warehouse.findAll({
            attributes: ['id','name', 'address'],
            include: [
              {
                model: db.Accounts,
                as: 'warehouseLeader',
                attributes: ['id', 'name', 'phone', 'address'],
                required: false,
              }
            ]
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get all warehouses is successfully' : 'Get all warehouses is unsuccessfully',
            response
        })
    } catch (error) {
        reject(error)
    }
})

exports.deleteService = (id) => new Promise(async(resolve, reject) => {
    try {

    const points = await db.TransactionPoint.findAll({
        where: {warehouseId: id}
      })
      for (let i = 0; i < points.length; i++) {
        const responsePointStaff = await db.Employee.destroy({
            where: {transactionPointId: points[i].id }
          })
          const responseStatus = await db.Status.destroy({
            where: {packageId: id}
          })

            
            const responseSender = await db.Customer.destroy({
              where: {id: package.senderId}
            })
            const responseReceiver = await db.Customer.destroy({
              where: {id: package.receiverId}
            })
          const responsePackage = await db.Package.destroy({
            where: {
                [Op.or]: [
                    {
                      transactionPointStartId: points[i].id,
                    },
                    {
                        transactionPointEndId: points[i].id,
                    }
                ],
                 }
          })
      }
    const responseEmployee = await db.Employee.destroy({
        where: {warehouseId: id}
      })
      const responsePoint = await db.TransactionPoint.destroy({
        where: {warehouseId: id}
      })
        const responseWarehouse = await db.Warehouse.destroy({
          where: {id}
        })
    
        resolve({
          err: responsePoint && responseWarehouse && responseEmployee ? 0 : 2,
          msg: responsePoint && responseWarehouse && responseEmployee ? 'Delete is successfully' : `Can't find this id`,
        })
  
      } catch (error) {
        reject(error)
    }
  })
  
  exports.updateService = (id, updatedData) => new Promise(async (resolve, reject) => {
    try {
        const [rowsAffected] = await db.Warehouse.update(updatedData, {
          where: { id }
      });
      const successMessage = 'Update is successful';
      const errorMessage = 'Update is failed';
        const response = {
            err: rowsAffected> 0 ? 0 : 2,
            msg: rowsAffected> 0 ? successMessage : errorMessage,
        };
  
        resolve(response);
    } catch (error) {
        reject(error);
    }
  });

  exports.getPackagesService = (id) => new Promise(async(resolve, reject) => {
    try {
      const response = await db.Package.findAll({
        where: {
            [Op.or]: [
                {
                  warehouseStartId: id,
                },
                {
                    warehouseEndId: id,
                }
            ],
        },
        attributes: ['id','packageCode','name', 'warehouseStartId', 'warehouseEndId', 'shippingCost'],
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
              }]
      })
      console.log(response)
      console.log(id)
      const filteredResponse = response.filter(item => (
        (item.warehouseStartId == id && item.Status.dateSendToWarehouseEnd === null && item.Status.dateWarehouseStartReceived !== null)  ||
        (item.warehouseEndId == id && item.Status.dateSendToPointEnd === null && item.Status.dateWarehouseEndReceived !== null)
      ));
      console.log(filteredResponse.length);

      resolve({
        err: filteredResponse.length > 0 ? 0 : 2,
        msg: filteredResponse.length > 0 ? 'Get Packages is successfully' : `Can't find this id or no matching items`,
        response: filteredResponse
      });
  
      } catch (error) {
        reject(error)
    }
  })

  exports.getPointsService = (id) => new Promise(async(resolve, reject) => {
    try {
      const response = await db.TransactionPoint.findAll({
        where: {
          warehouseId: id
        },
        attributes: ['id','name', 'address'],
        include: [
            {
            model: db.Warehouse,
            attributes: ['id', 'name'],
            required: false,
            include: [{
                model: db.Accounts,
                as: 'warehouseLeader',
                attributes: ['id', 'name', 'phone', 'address'],
                required: false,
            }]
          },
          {
            model: db.Accounts,
            as: 'pointLeader',
            attributes: ['id', 'name', 'phone', 'address'],
            required: false,
          },
        ]
    })
  
      resolve({
        err: response.length > 0 ? 0 : 2,
        msg: response.length > 0 ? 'Get points is successfully' : `Can't find this id or no matching items`,
        response
      });
  
      } catch (error) {
        reject(error)
    }
  })