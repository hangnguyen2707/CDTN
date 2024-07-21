const userService = require('../services/user.js');
exports.getUser = async (req, res) => {
    const {phone} = req.user
    try {
        if(!phone) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!phone ? "phone " : " ")
        })
        const response = await userService.getUser(phone)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const response = await userService.getAllService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}

exports.updateById = async (req, res) => {
    
    try{
        const id = req.params.id
        const response = await userService.updateService(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}

exports.getLeaders = async (req, res) => {
    try {
        const type = req.params.type
        const response = await userService.getLeadersService(type)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await userService.deleteService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at warehouse controller' + error
        })
    }
}