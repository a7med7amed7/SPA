const models = require('../models/cartItem')
const models_product = require('../models/product')

const getCartItems = async (req, res, next) => {
    // let quit = false;
    // let list = [], qnt = [], IDs = [];
    let result_records = [];
    await models.getCartItems(req.body.id).then(result => {
        console.log("RES", result);
        result_records = result;
        // return res.status(200).json({
        //     status: 1,
        //     data: result
        // });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the cart items"
        });
    })
    let response = [];
    for (let i = 0; i < result_records.length; i++) {
        let d = {
            cid: result_records[i].id,
            id: result_records[i].product_id,
            quantity: result_records[i].quantity
        };
        let prms = await models_product.getProduct(result_records[i].product_id).then(result => {
            console.log("RECORD", result)
            return result[0];
        }).catch(err => {
            console.log(err);
        })
        console.log(prms);
        d["name"] = prms["name"];
        d["price"] = prms["price"];
        d["stock"] = prms["stock"];
        response.push(d);
    }
    return res.status(200).json({
        status: 1,
        data: response
    });
};
const getCartItem = async (req, res, next) => {
    let quit = false, id = 1, qnt = 0;
    await models.getCartItem(req.params.id).then(result => {
        console.log(result, result.length);
        if (!result.length) {
            quit = true;
            return res.status(404).json({
                status: 0,
                message: "There no item with the given id!"
            });
        }
        id = result[0].product_id
        qnt = result[0].quantity;
        console.log(id, result)
        // return res.status(200).json({
        //     status: 1,
        //     data: result
        // });
    }).catch(err => {
        quit = true;

        return res.status(500).json({
            status: 0,
            message: "Unable to get the wanted item"
        });
    })
    if (quit) return;
    models_product.getProduct(id).then(result => {
        console.log("QNT", result, result.length);
        if (!result.length) {
            return res.status(404).json({
                status: 0,
                message: "There no product with the given id!"
            });
        }
        result[0]["quantity"] = qnt;
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the wanted product"
        });
    })

};
const createCartItem = async (req, res, next) => {
    // Assert the req.body is ok
    // We should check first if the product is present or not
    console.log("BODY", req.body);
    let quit = false, rem = 0;
    await models_product.getProduct(req.body.productId).then(result => {
        if (!result.length) {
            quit = true;
            return res.status(404).json({
                status: 0,
                message: "There no product with the given id!"
            });
        }
        console.log(result[0], req.body.quantity);
        if (result[0].stock < req.body.quantity) {
            quit = 1;
            return res.status(404).json({
                status: 0,
                message: "The quantity is more than the available"
            });
        }
        rem = result[0].stock - req.body.quantity;
    }).catch(err => {
        quit = true;
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
    await models_product.updateProductStock(rem, req.body.productId).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: "Unable to update the stock"
        });
    })
};
const updateCartItemQuantity = async (req, res, next) => {
    console.log(req.body, req.params.id)
    let item = {}, product = {};
    let quit = false;
    await models.getCartItem(req.params.id).then(result => {
        console.log("ITEM", result);
        if (!result.length) {
            quit = true;
            return res.status(404).json({
                status: 0,
                message: "There no item with the given id!"
            });
        }
        item = result[0];
    }).catch((err => {
        quit = true;
        console.log(err);
        return res.status(404).json({
            status: 0,
            message: "There no item with the given id!"
        });
    }))
    await models_product.getProduct(item.product_id).then(result => {
        console.log("PRODUCT", result);
        if (!result.length) {
            quit = true;
            return res.status(404).json({
                status: 0,
                message: "There no product with the given id!"
            });
        }
        product = result[0];
    }).catch((err => {
        quit = true;
        console.log(err);
        return res.status(404).json({
            status: 0,
            message: "There no item with the given id!"
        });
    }))
    if (quit) return;
    let rem = product.stock + item.quantity - req.body.quantity;
    await models.updateCartItemQuantity(req.params.id, req.body.quantity).then(result => {
        console.log("QUANTITY", result);
        if (!result.affectedRows) {
            quit = true;
            return res.status(404).json({
                status: 0,
                message: "There no item with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        quit = true;
        return res.status(500).json({
            status: 0,
            message: "Unable to update the item's quantity"
        });
    })
    if (quit) return;
    await models_product.updateProductStock(rem, item.product_id).then(result => {
        console.log("STOCK", result);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no product with the given id!"
            });
        }
    }).catch((err => {
        console.log(err);
        return res.status(404).json({
            status: 0,
            message: "Unable to update the stock!"
        });
    }))
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

