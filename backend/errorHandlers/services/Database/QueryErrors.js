const BaseDatabaseError = require('./Base')
const DatabaseErrorNumbers = require('../../../utils/DatabaseErrorNumbers')
class QueryError extends BaseDatabaseError {
    constructor(name, DatabaseErrorNumber, message, isOperationalError, severity, context = {}) {
        super(name, message, { ...context, type: 'QueryError' });
    }
}