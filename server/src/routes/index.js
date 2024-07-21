const authRouter = require('./auth.js');
const packageRouter = require('./package.js');
const userRouter = require('./user.js')
const warehouseRouter = require('./warehouse.js')
const transactionPointRouter = require('./transactionpoint.js')

const initRoutes = (app) => {
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/package', packageRouter)
    app.use('/api/v1/user', userRouter)
    app.use('/api/v1/warehouse', warehouseRouter)
    app.use('/api/v1/transactionpoint', transactionPointRouter)
    return app.use('/', (req, res) => {
        res.send('server...')
    })
}

module.exports = initRoutes