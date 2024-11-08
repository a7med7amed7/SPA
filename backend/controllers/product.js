const models = require('../models/product')
const getAllProducts = (req, res, next) => {
    models.getAllProducts().then(result => {
        console.log(result);
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to get the list of products"
        });
    })
};
const getProduct = (req, res, next) => {
    models.getProduct(req.params.id).then(result => {
        console.log(result, result.length);
        if (!result.length) {
            return res.status(404).json({
                status: 0,
                message: "There no product with the given id!"
            });
        }
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
const createProduct = (req, res, next) => {
    // Assert the req.body is ok
    models.createProduct(req.body).then(result => {
        console.log(result);
        return res.status(200).json({
            status: 1,
            data: result
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            status: 0,
            message: "Unable to create a new product"
        });
    })
};
const updateProduct = (req, res, next) => {
    models.updateProduct(req.params.id, req.body).then(result => {
        console.log(result.affectedRows);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no product with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to update the wanted product"
        });
    })
};
const deleteProduct = (req, res, next) => {
    console.log("DELETE", req.params.id)
    models.deleteProduct(req.params.id).then(result => {
        console.log(result, result.affectedRows);
        if (!result.affectedRows) {
            return res.status(404).json({
                status: 0,
                message: "There no product with the given id!"
            });
        }
        return res.status(200).json({
            status: 1,
        });
    }).catch(err => {
        return res.status(500).json({
            status: 0,
            message: "Unable to delete the wanted product"
        });
    })
};

module.exports = {
    getAllProducts, getProduct, createProduct, deleteProduct, updateProduct
}