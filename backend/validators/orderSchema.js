const Joi = require('joi');

// Base schema for common fields
const baseSchema = {
    orderId: Joi.number().integer().positive().required().messages({
        'number.base': '"Order ID" must be a number',
        'any.required': '"Order ID" is required',
    }),
    userId: Joi.number().integer().positive().required().messages({
        'number.base': '"User ID" must be a number',
        'any.required': '"User ID" is required',
    }),
    productId: Joi.number().integer().positive().required().messages({
        'number.base': '"Product ID" must be a number',
        'any.required': '"Product ID" is required',
    }),
    quantity: Joi.number().integer().positive().required().messages({
        'number.base': '"Quantity" must be a number',
        'any.required': '"Quantity" is required',
    }),
    firstName: Joi.string().max(255).required().messages({
        'string.base': '"First Name" must be a string',
        'any.required': '"First Name" is required',
    }),
    lastName: Joi.string().max(255).required().messages({
        'string.base': '"Last Name" must be a string',
        'any.required': '"Last Name" is required',
    }),
    country: Joi.number().integer().required().messages({
        'number.base': '"Country" must be a number',
        'any.required': '"Country" is required',
    }),
    city: Joi.string().max(255).required().messages({
        'string.base': '"City" must be a string',
        'any.required': '"City" is required',
    }),
    address: Joi.string().max(255).required().messages({
        'string.base': '"Address" must be a string',
        'any.required': '"Address" is required',
    }),
    zipCode: Joi.string().max(255).required().messages({
        'string.base': '"Zip Code" must be a string',
        'any.required': '"Zip Code" is required',
    }),
    phone: Joi.string().max(255).required().messages({
        'string.base': '"Phone" must be a string',
        'any.required': '"Phone" is required',
    }),
    email: Joi.string().email().max(255).required().messages({
        'string.base': '"Email" must be a valid string',
        'string.email': '"Email" must be a valid email address',
        'any.required': '"Email" is required',
    }),
};

const createOrderSchema = Joi.object({
    userId: baseSchema.userId,
    products: Joi.array()
        .items(
            Joi.object({
                productId: baseSchema.productId,
                quantity: baseSchema.quantity,
            })
        )
        .required(),
    firstName: baseSchema.firstName,
    lastName: baseSchema.lastName,
    country: baseSchema.country,
    city: baseSchema.city,
    address: baseSchema.address,
    zipCode: baseSchema.zipCode,
    phone: baseSchema.phone,
    email: baseSchema.email,
});

const getOrderSchema = Joi.object({
    orderId: baseSchema.orderId,
});

const getAllOrdersSchema = Joi.object({
    userId: baseSchema.userId,
});

const updateOrderSchema = Joi.object({
    orderId: baseSchema.orderId,
});

const deleteOrderSchema = Joi.object({
    orderId: baseSchema.orderId,
});

module.exports = {
    createOrderSchema,
    getOrderSchema,
    getAllOrdersSchema,
    updateOrderSchema,
    deleteOrderSchema,
};
