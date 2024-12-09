const models = require('../models/product')
const models_cartItems = require('../models/cartItem')
const CustomErrors = require('../errorHandlers/services/Database/DatabaseError')
const productValidator = require('../validators/index').product
const getAllProducts = async (req, res, next) => {
    try {
        const products = await models.getAllProducts();
        return res.status(200).json({
            status: 1,
            data: products
        });
    } catch (err) {
        next(new CustomErrors.QueryError(err.errno, {
            src: "controllers/products/getAllProducts",
            msg: "Unable to get the list of products"
        }))
    }
};
const getProduct = async (req, res, next) => {
    try {
        const val = await productValidator.getOneSchema.validateAsync({ id: req.params.id }, { abortEarly: false })
        const data = await models.getProduct(req.params.id);
        if (data.length === 0) {
            return res.status(404).json({
                status: 1,
                message: "There's no product with the given id"
            })
        }
        return res.status(200).json({
            status: 1,
            data: data[0]
        });
    } catch (err) {
        if (err.isJoi) {
            return next(new CustomErrors.ValidationError.ValidationBaseError("There's a problem in the provided id", {
                src: "controllers/user/getProduct"
            }))
        }
        next(new CustomErrors.DatabaseError.GeneralDatabaseError.QueryError(err.errno, {
            query: err.sql,
            sqlMessage: err.sqlMessage
        }))
    }
};
const createProduct = async (req, res, next) => {
    const product = {
        name: req.body.name,
        stock: req.body.stock,
        price: req.body.price,
        cover: req.body.cover,
        rating: req.body.rating,
        description: req.body.description,
        images: req.body.images,
        comments: req.body.comments,
    }
    try {
        const val = await productValidator.createSchema.validateAsync(product, { abortEarly: false });
        const data = await models.createProduct(product);
        return res.status(200).json({
            status: 1,
            data: data
        });
    } catch (err) {
        if (err.isJoi) {
            return next(new CustomErrors.ValidationError.ValidationBaseError("Unable to create a new product", {
                src: "controllers/user/createProduct"
            }))
        }
        next(new CustomErrors.QueryError(err.errno, {
            src: "controllers/products/createProduct",
            msg: "Unable to create a new product"
        }))
    }
};
const updateProduct = async (req, res, next) => {
    const product = {
        id: req.params.id,
        name: req.body.name,
        stock: req.body.stock,
        price: req.body.price,
        cover: req.body.cover,
        rating: req.body.rating,
        description: req.body.description,
    }
    try {
        const val = await productValidator.updateOneSchema.validateAsync(product, { abortEarly: false });
        console.log(product)
        const data = await models.updateProduct(product);
        if (!data.affectedRows) {
            return res.status(404).json({
                status: 1,
                message: "There's no product with the given id"
            });
        }
        return res.status(200).json({
            status: 1,
            message: "The product is updated successfully!"
        });
    } catch (err) {
        if (err.isJoi) {
            return next(new CustomErrors.ValidationError.ValidationBaseError("Unable to update a current product", {
                src: "controllers/user/createProduct"
            }))
        }
        console.log(err);
        next(new CustomErrors.QueryError(err.errno, {
            src: "controllers/products/updateProduct",
            msg: "Unable to update the product"
        }))
    }
};
const deleteProduct = async (req, res, next) => {
    try {
        const val = await productValidator.deleteOneSchema.validateAsync({ id: req.params.id }, { abortEarly: false })
        const data = await models.deleteProduct(req.params.id);
        if (!data.affectedRows) {
            return res.status(404).json({
                status: 1,
                message: "There's no product with the given id"
            })
        }
        return res.status(200).json({
            status: 1,
            message: "The product is deleted successfully"
        });
    } catch (err) {
        if (err.isJoi) {
            return next(new CustomErrors.ValidationError.ValidationBaseError("There's a problem in the provided id", {
                src: "controllers/user/deleteProduct"
            }))
        }
        next(new CustomErrors.DatabaseError.GeneralDatabaseError.QueryError(err.errno, {
            query: err.sql,
            sqlMessage: err.sqlMessage
        }))
    }
};

module.exports = {
    getAllProducts, getProduct, createProduct, deleteProduct, updateProduct
}