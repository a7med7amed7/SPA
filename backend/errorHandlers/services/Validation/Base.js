const AppError = require('../AppError');
// const HttpStatusCode = require('../../utils/HttpStatusCode')
const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
};
class BaseDatabaseError extends AppError {
    constructor(message = 'Validation Error', context = {}) {
        super('ValidationError', HttpStatusCode.INTERNAL_SERVER, message, true, 'low', context);
    }
}

module.exports = BaseDatabaseError