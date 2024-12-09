const Joi = require('joi');

const baseSchema = {
    cartId: Joi.number().integer().positive().required().messages({
        'number.base': '"Cart ID" must be a number',
        'number.integer': '"Cart ID" must be an integer',
        'number.positive': '"Cart ID" must be positive',
        'any.required': '"Cart ID" is required',
    }),
    productId: Joi.number().integer().positive().required().messages({
        'number.base': '"Product ID" must be a number',
        'number.integer': '"Product ID" must be an integer',
        'number.positive': '"Product ID" must be positive',
        'any.required': '"Product ID" is required',
    }),
    quantity: Joi.number().integer().positive().min(1).required().messages({
        'number.base': '"Quantity" must be a number',
        'number.integer': '"Quantity" must be an integer',
        'number.positive': '"Quantity" must be positive',
        'number.min': '"Quantity" must be at least 1',
        'any.required': '"Quantity" is required',
    }),
};

const addProductToCartSchema = Joi.object({
    cartId: baseSchema.cartId,
    productId: baseSchema.productId,
    quantity: baseSchema.quantity,
});

const updateProductToCartSchema = Joi.object({
    cartId: baseSchema.cartId,
    productId: baseSchema.productId,
    quantity: baseSchema.quantity,
});

const removeProductFromCartSchema = Joi.object({
    cartId: baseSchema.cartId,
    productId: baseSchema.productId,
});

const getProductFromCartSchema = Joi.object({
    cartId: baseSchema.cartId,
    productId: baseSchema.productId,
});

const getAllProductsFromCartSchema = Joi.object({
    cartId: baseSchema.cartId,
});

module.exports = {
    addProductToCartSchema,
    removeProductFromCartSchema,
    updateProductToCartSchema,
    getProductFromCartSchema,
    getAllProductsFromCartSchema
};
