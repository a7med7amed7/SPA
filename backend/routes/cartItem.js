const express = require('express');
const controllers = require('../controllers/cartItem')
const router = express.Router();

router.get('/', controllers.getCartItems);
router.get('/:id', controllers.getCartItem);
router.patch('/:id', controllers.updateCartItemQuantity);
router.delete('/:id', controllers.deleteCartItem);
router.post('/', controllers.createCartItem);
module.exports = router;