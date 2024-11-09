const models = require('../models/cartItem')
const models_product = require('../models/product')

const getCartItems = (req, res, next) => {
    models.getCartItems(req.body.id).then(result => {
        console.log(result);
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the cart items"
        });
    })
};
const getCartItem = (req, res, next) => {
    models.getCartItem(req.params.id).then(result => {
        console.log(result, result.length);
        if (!result.length) {
            return res.status(404).json({
                status: 0,
                message: "There no item with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the wanted item"
        });
    })
};
const createCartItem = async (req, res, next) => {
    // Assert the req.body is ok
    // We should check first if the product is present or not
    console.log(req.body);
    let quit = false;
    await models_product.getProduct(req.body.productId).then(result => {
        if (!result.length) {
            quit = true;
            return res.status(404).json({
                status: 0,
                message: "There no product with the given id!"
            });
        }
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the wanted product"
        });
    })
    if (quit) return;
    await models.getCustomCartItem(req.body.userId, req.body.productId).then(result => {
        console.log("result", result, result.length);
        if (result.length !== 0) {
            console.log("Duplicate")
            quit = true;
            return res.status(400).json({
                status: 0,
                message: "The item is already in the cart"
            });
        }
    }).catch(err => {
        quit = true;
        return res.status(500).json({
            status: 0,
            message: "Unable to create a new item"
        });
    })
    console.log(quit);
    if (quit) return;
    await models.createCartItem(req.body).then(result => {
        console.log(result);
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: "Unable to create a new item"
        });
    })
};
const updateCartItemQuantity = (req, res, next) => {
    models.updateCartItemQuantity(req.params.id, req.body.quantity).then(result => {
        console.log(result.affectedRows);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no item with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to update the item's quantity"
        });
    })
};
const deleteCartItem = (req, res, next) => {
    console.log("DELETE", req.params.id)
    models.deleteCartItem(req.params.id).then(result => {
        console.log(result, result.affectedRows);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no item with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to delete the wanted item"
        });
    })
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

