const express = require('express');
const controllers = require('../controllers/order')
const router = express.Router();

router.get('/', controllers.getAllOrders);
router.get('/:id', controllers.getOrder);
router.patch('/:id', controllers.updateOrder);
router.delete('/:id', controllers.deleteOrder);
router.post('/', controllers.createOrder);
module.exports = router;