const express = require('express');
const packageController = require('../controllers/package.js');

const router = express.Router();

router.post('/create', packageController.create);
router.get('/get/all', packageController.getAll);
router.delete('/delete/:id', packageController.deleteById);
router.put('/update/:id', packageController.updateById);

module.exports = router;
