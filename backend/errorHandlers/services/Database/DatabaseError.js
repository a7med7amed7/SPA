const BaseDatabaseError = require('./Base')
const DatabaseErrorNumbers = require('../../../utils/DatabaseErrorNumbers')

class QueryError extends BaseDatabaseError {
    constructor(errorNumber, context = {}) {
        super(DatabaseErrorNumbers[errorNumber || 500] || "Unspeciefied Database Error", { ...context, type: 'QueryError' });
    }
}

class ConnectionError extends BaseDatabaseError {
    constructor(message = 'Database Connection Failed', context = {}) {
        super(message, { ...context, type: 'ConnectionError' });
    }
}

class TimeoutError extends BaseDatabaseError {
    constructor(message = 'Database Query Timed Out', context = {}) {
        super(message, { ...context, type: 'TimeoutError' });
    }
}

class ConstraintViolationError extends BaseDatabaseError {
    constructor(message = 'Constraint Violation', context = {}) {
        super(message, { ...context, type: 'ConstraintViolationError' });
    }
}

module.exports = {
    BaseDatabaseError,
    QueryError,
    ConnectionError,
    TimeoutError,
    ConstraintViolationError,
};
