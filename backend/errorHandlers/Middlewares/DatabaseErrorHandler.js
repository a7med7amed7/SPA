const DatabaseError = require('../services/Database/index')
const development = require('../environment/development')
const production = require('../environment/production')
module.exports = (err, req, res, next) => {
    console.log("DB ERROR")
    if (err instanceof DatabaseError.BaseDatabaseError) {
        if (process.env.NODE_ENV === 'development') {
            development.clientResponse(err, req, res, next);
        } else if (process.env.NODE_ENV === 'production') {
            production.clientResponse(err, req, res, next);
        } else {

        }
    }
    next(err);
}