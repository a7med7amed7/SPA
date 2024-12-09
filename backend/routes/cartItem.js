const express = require('express');
const controllers = require('../controllers/cartItem')
const router = express.Router();

router.post('/cart', controllers.getCartItems);
router.post('/single', controllers.getCartItem);
router.patch('/', controllers.updateCartItemQuantity);
router.delete('/', controllers.deleteCartItem);
router.delete('/cart/:id', controllers.clearCart);
router.post('/', controllers.createCartItem);
module.exports = router;