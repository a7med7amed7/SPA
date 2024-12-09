const Joi = require('joi');

const baseSchema = {
    id: Joi.string().required().messages({
        'string.base': '"ID" should be a text',
        'string.required': '"ID" shouldn\'t be empty or null',
    }),
    name: Joi.string().required().messages({
        'string.base': '"Name" should be a text',
        'string.required': '"Name" shouldn\'t be empty',
    }),
    price: Joi.number().positive().required().messages({
        'number.base': '"Price" must be a number',
        'number.positive': '"Price" must be greater than zero',
        'any.required': '"Price" is required',
    }),
    stock: Joi.number().integer().min(0).required().messages({
        'number.base': '"Stock" must be a number',
        'number.integer': '"Stock" must be an integer',
        'number.min': '"Stock" cannot be negative',
        'any.required': '"Stock" is required',
    }),
    cover: Joi.string().uri().required().messages({
        'string.base': '"Cover" must be a string',
        'string.uri': '"Cover" must be a valid URL',
        'any.required': '"Cover" is required',
    }),
    rating: Joi.number().min(0).max(5).messages({
        'number.base': '"Rating" must be a number',
        'number.min': '"Rating" cannot be less than 0',
        'number.max': '"Rating" cannot be greater than 5',
    }),
    description: Joi.string().required().messages({
        'string.base': '"Description" must be a string',
        'any.required': '"Description" is required',
    }),
    images: Joi.array()
        .items(
            Joi.string().uri().messages({
                'string.base': '"Image" must be a string',
                'string.uri': '"Image" must be a valid URL',
                'any.required': '"Image" URL is required',
            })
        )
    ,
    comments: Joi.array()
        .items(
            Joi.string().messages({
                'string.base': '"Comment content" must be a string',
                'any.required': '"Comment content" is required',
            }),
        ),
};

const createSchema = Joi.object({
    name: baseSchema.name,
    price: baseSchema.price,
    stock: baseSchema.stock,
    cover: baseSchema.cover,
    rating: baseSchema.rating,
    description: baseSchema.description,
    images: baseSchema.images,
    comments: baseSchema.comments,
});

const getOneSchema = Joi.object({
    id: baseSchema.id,
});

const updateOneSchema = Joi.object({
    id: baseSchema.id,
    name: baseSchema.name,
    price: baseSchema.price,
    stock: baseSchema.stock,
    cover: baseSchema.cover,
    rating: baseSchema.rating,
    description: baseSchema.description,
});

module.exports = {
    createSchema,
    getOneSchema,
    deleteOneSchema: getOneSchema,
    updateOneSchema,
};
