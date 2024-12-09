class AppError extends Error {
    constructor(name, statusCode, message, isOperationalError = true, severity = 'medium', context = null) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperationalError = isOperationalError;
        this.severity = severity; // 'low', 'medium', 'high', 'critical'
        this.context = context;
        // Additional error details like src_middleware, db_query, user_id
        // expected and receiver or any additional info
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
