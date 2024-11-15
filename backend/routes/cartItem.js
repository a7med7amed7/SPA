const express = require('express');
const controllers = require('../controllers/cartItem')
const router = express.Router();

router.post('/cart', controllers.getCartItems);
router.get('/:id', controllers.getCartItem);
router.patch('/:id', controllers.updateCartItemQuantity);
router.delete('/:id', controllers.deleteCartItem);
router.delete('/cart/:id', controllers.clearCart);
router.post('/', controllers.createCartItem);
module.exports = router;