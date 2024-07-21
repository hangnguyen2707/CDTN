const transactionPointService = require('../services/transactionpoint.js');
exports.create = async (req, res) => {
    const {warehouseId, pointLeaderId, name, address} = req.body
    try{
        if(!warehouseId || !name || !address) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' 
        })
        const response = await transactionPointService.createService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at transactionPoint controller' + error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const response = await transactionPointService.getAllService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at transactionPoint controller' + error
        })
    }
}

exports.updateById = async (req, res) => {
    const {warehouseId, pointLeaderId, name, address} = req.body
    try{
        const id = req.params.id
        const response = await transactionPointService.updateService(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at package controller' + error
        })
    }
}

exports.getPackagesInTransactionPoint = async (req, res) => {
    try {
        const id = req.params.id
        const response = await transactionPointService.getPackagesService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at package controller' + error
        })
    }
}