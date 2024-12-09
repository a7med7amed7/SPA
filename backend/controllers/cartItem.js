const models = require('../models/cartItem')
const models_product = require('../models/product')
const cartItemSchema = require('../validators/index').cartItem
const getCartItems = async (req, res, next) => {
    const data = {
        cartId: req.body.cartId
    }
    try {
        const val = await cartItemSchema.getAllProductsFromCartSchema.validateAsync(data, { abortEarly: false })
        const items = await models.getCartItems(data);
        res.status(200).json({
            status: 1,
            data: items
        })
    } catch (err) {
        console.log(err)
        next(err);
    }
};
const getCartItem = async (req, res, next) => {
    const data = {
        cartId: req.body.cartId,
        productId: req.body.productId
    }
    try {
        const val = await cartItemSchema.getProductFromCartSchema.validateAsync(data, { abortEarly: false })
        const item = await models.getCartItem(data);
        res.status(200).json({
            status: 1,
            data: item
        })
    } catch (err) {
        console.log(err)
        next(err);
    }

};
const createCartItem = async (req, res, next) => {
    const data = {
        cartId: req.body.cartId,
        productId: req.body.productId,
        quantity: req.body.quantity || 1
    }
    try {
        const val = await cartItemSchema.addProductToCartSchema.validateAsync(data, { abortEarly: false })
        const item = await models.createCartItem(data);
        res.status(200).json({
            status: 1,
            data: item
        })
    } catch (err) {
        console.log(err)
        next(err);
    }
};
const updateCartItemQuantity = async (req, res, next) => {
    const data = {
        cartId: req.body.cartId,
        productId: req.body.productId,
        quantity: req.body.quantity || 1
    }
    try {
        const val = await cartItemSchema.updateProductToCartSchema.validateAsync(data, { abortEarly: false })
        const item = await models.updateCartItemQuantity(data);
        res.status(200).json({
            status: 1,
            data: item
        })
    } catch (err) {
        console.log(err)
        next(err);
    }
};
const deleteCartItem = async (req, res, next) => {
    const data = {
        cartId: req.body.cartId,
        productId: req.body.productId,
    }
    try {
        const val = await cartItemSchema.removeProductFromCartSchema.validateAsync(data, { abortEarly: false })
        const item = await models.deleteCartItem(data);
        res.status(200).json({
            status: 1,
            data: item
        })
    } catch (err) {
        console.log(err)
        next(err);
    }
};

const clearCart = (req, res, next) => {
    console.log("DELETE", req.params.id)
    models.clearCart(req.params.id).then(result => {
        console.log(result, result.affectedRows);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no items!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to clear the cart"
        });
    })
};
module.exports = {
    getCartItems, getCartItem, createCartItem, deleteCartItem, updateCartItemQuantity, clearCart
}

