const express = require('express');
const userController = require('../controllers/user.js');
const verifyToken = require('../middleware/verifytoken.js');

const router = express.Router();

router.use(verifyToken)
router.get('/get/user', userController.getUser);
router.put('/update/:id', userController.updateById);
router.get('/get/all', userController.getAll);
router.get('/get/leaders/:type', userController.getLeaders);
router.delete('/delete/:id',userController.deleteById);


module.exports = router;