const authService = require('../services/auth.js');
exports.login = async (req, res) => {
    const {phone, password} = req.body
    try{
        if(!phone || !password) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!'
        })
        const response = await authService.loginService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}

exports.createAccount = async (req, res) => {
    const {name, phone, email, password, address, accountType} = req.body
    console.log(req.body)
    try{
        // return name
        if(!name || !phone || !email || !password || !address || !accountType) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!name ? "name " : " ") + (!phone ? "phone " : " ")
                                + (!password ? "password " : " ") + (!address ? "address " : " ")
                                + (!accountType ? "accountType " : " ") + (!email ? "email " : " ")
        })
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}

exports.updateLeader = async (req, res) => {
    const {accountType, phone, positionId } = req.body
    try{
        // return name
        if(!accountType || !phone || !positionId) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!accountType ? "accountType " : " ") + (!phone ? "phone " : " ") + (!positionId ? "positionId " : " ")
        })
        const response = await authService.updateLeader(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}

exports.updateEmployee = async (req, res) => {
    const {accountType, phone, positionId } = req.body
    try{
        // return name
        if(!accountType || !phone || !positionId) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!accountType ? "accountType " : " ") + (!phone ? "phone " : " ") + (!positionId ? "positionId " : " ")
        })
        const response = await authService.updateEmployee(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}

exports.getEmployees = async (req, res) => {
    try {
        const type = req.params.type
        const positionId = req.params.id

        if(!positionId || !type) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!positionId ? "positionId " : " ") + (!type ? "type " : " ")
        })
        const response = await authService.getEmployees(positionId, type)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}
