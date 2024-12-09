// const HttpStatusCode = require('../../../utils/HttpStatusCode')
const BaseAPIError = require('./Base')
const HttpStatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER: 500,
};

class BadRequestError extends BaseAPIError {
    constructor(message = 'Bad Request', context = {}) {
        super('BadRequestError', HttpStatusCode.BAD_REQUEST, message, true, 'low', context);
    }
}

class UnauthorizedError extends BaseAPIError {
    constructor(message = 'Unauthorized', context = {}) {
        super('UnauthorizedError', HttpStatusCode.UNAUTHORIZED, message, true, 'medium', context);
    }
}

class ForbiddenError extends BaseAPIError {
    constructor(message = 'Forbidden', context = {}) {
        super('ForbiddenError', HttpStatusCode.FORBIDDEN, message, true, 'medium', context);
    }
}

class NotFoundError extends BaseAPIError {
    constructor(message = 'Not Found', context = {}) {
        super('NotFoundError', HttpStatusCode.NOT_FOUND, message, true, 'medium', context);
    }
}

class ConflictError extends BaseAPIError {
    constructor(message = 'Conflict', context = {}) {
        super('ConflictError', HttpStatusCode.CONFLICT, message, true, 'low', context);
    }
}

class InternalServerError extends BaseAPIError {
    constructor(message = 'Internal Server Error', context = {}) {
        super('InternalServerError', HttpStatusCode.INTERNAL_SERVER, message, false, 'critical', context);
    }
}

module.exports = {
    HttpStatusCode,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InternalServerError,
};
