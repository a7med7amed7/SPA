const AppError = require('../AppError');

class BaseAPIError extends AppError {
    constructor(name, statusCode, message, isOperationalError, severity = 'medium', context = {}) {
        super(name, statusCode, message, isOperationalError, severity, context);
    }
}
module.exports = BaseAPIError;