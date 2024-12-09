const userSchema = require('./userSchema');
const productSchema = require('./productSchema');
const cartItemSchema = require('./cartItemSchema');
const orderSchema = require('./orderSchema');

module.exports = {
    user: userSchema,
    product: productSchema,
    cartItem: cartItemSchema,
    order: orderSchema
}