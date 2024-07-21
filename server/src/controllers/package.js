const packageService = require('../services/package.js');
exports.create = async (req, res) => {
    const {senderPhone, senderName, senderAddress, receiverPhone, receiverName, receiverAddress, transactionPointStartId, warehouseStartId, name, shippingCost} = req.body
    try{
        if(!senderPhone || !senderName || !senderAddress || !receiverPhone || !receiverName || !receiverAddress 
            || !transactionPointStartId || !warehouseStartId || !name || !shippingCost) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!senderPhone?"SenderPhone":"") + (!senderName?"SenderName":"")+ (!senderAddress?"SenderAddress":"")+ (!receiverPhone?"ReceiverPhone":"")
            + (!receiverAddress?"receiverAddress":"")+ (!receiverName?"receiverName":"")+ (!transactionPointStartId?"pointId":"")+ (!warehouseStartId?"warehouseId":"")
            + (!name?"name":"")+ (!shippingCost?"ShippingCost":"")
        })
        const response = await packageService.createService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at package controller' + error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const response = await packageService.getAllService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at package controller' + error
        })
    }
}

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await packageService.deleteService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at package controller' + error
        })
    }
}

exports.updateById = async (req, res) => {
    const {senderPhone, senderName, senderAddress, receiverPhone, receiverName, receiverAddress, transactionPointStartId, name, shippingCost} = req.body
    try{
        const id = req.params.id
        const response = await packageService.updateService(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at package controller' + error
        })
    }
}

