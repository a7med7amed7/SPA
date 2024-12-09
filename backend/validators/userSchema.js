const Joi = require('joi');

const baseSchema = {
    id: Joi.string().required().messages({
        'string.base': '"Name" should be a text',
        'string.required': '"Name" shouldn\'t be empty or null',
    }),
    name: Joi.string().required().messages({
        'string.base': '"Name" should be a text',
        'string.required': '"Name" shouldn\'t be empty',
    }),
    email: Joi.string().email().required().messages({
        'string.base': '"Email" should be a text',
        'string.required': '"Email" shouldn\'t be empty',
        'string.email': '"Email" should be a valid email',
    }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
            'string.base': '"Password" should be a text',
        }),
    isPremium: Joi.boolean()
        .truthy(1, '1', true) // Treats 1, '1', and true as true
        .falsy(0, '0', false) // Treats 0, '0', and false as false
        .required(),
    phoneNumber: Joi.string().required().min(8).max(15),
    country: Joi.number().required(),
    address: Joi.string(),
    cardNumber: Joi.number()
        .integer()
        .min(1000000000000000) // Minimum 16 digits for card number
        .max(9999999999999999) // Maximum 16 digits for card number
        .required()
        .messages({
            'number.base': 'Card number must be a number.',
            'number.min': 'Card number must be at least 16 digits.',
            'number.max': 'Card number must be at most 16 digits.',
            'any.required': 'Card number is required.',
        }),

    expiryDate: Joi.string()
        .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/) // MM/YY or MM/YYYY
        .required()
        .custom((value, helper) => {
            // Check if the card is expired
            const [month, year] = value.split('/');
            const expiryYear = year.length === 2 ? `20${year}` : year;
            const expiryDate = new Date(`${expiryYear}-${month}-01`);
            const currentDate = new Date();

            if (expiryDate < currentDate) {
                return helper.message('Card is expired.');
            }
            return value;
        })
        .messages({
            'string.empty': 'Expiry date is required.',
            'string.pattern.base': 'Invalid expiry date format. Use MM/YY or MM/YYYY.',
        }),

    cvv: Joi.number()
        .integer()
        .min(100) // Minimum 3 digits
        .max(9999) // Maximum 4 digits
        .required()
        .messages({
            'number.base': 'CVV must be a number.',
            'number.min': 'CVV must be at least 3 digits.',
            'number.max': 'CVV must be at most 4 digits.',
            'any.required': 'CVV is required.',
        }),
}

const createSchema = Joi.object({
    name: baseSchema.name,
    email: baseSchema.email,
    password: baseSchema.password,
    isPremium: baseSchema.isPremium,
    phoneNumber: baseSchema.phoneNumber,
    country: baseSchema.country,
    address: baseSchema.address,
    cardNumber: baseSchema.cardNumber,
    expiryDate: baseSchema.expiryDate,
    cvv: baseSchema.cvv,
})

const getOneSchema = Joi.object({
    id: baseSchema.id
})

const updateOneSchema = Joi.object({
    id: baseSchema.id,
    name: baseSchema.name,
    email: baseSchema.email,
    password: baseSchema.password,
    isPremium: baseSchema.isPremium,
    phoneNumber: baseSchema.phoneNumber,
    country: baseSchema.country,
    address: baseSchema.address,
    cardNumber: baseSchema.cardNumber,
    expiryDate: baseSchema.expiryDate,
    cvv: baseSchema.cvv,
})

module.exports = {
    createSchema,
    getOneSchema,
    deleteOneSchema: getOneSchema,
    updateOneSchema
};