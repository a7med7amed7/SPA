const ValidationError = require('../services/Validation/index')
const development = require('../environment/development')
const production = require('../environment/production')
module.exports = (err, req, res, next) => {
    console.log("Validation")
    if (err instanceof ValidationError.ValidationBaseError) {
        if (process.env.NODE_ENV === 'development') {
            development.clientResponse(err, req, res, next);
        } else if (process.env.NODE_ENV === 'production') {
            production.clientResponse(err, req, res, next);
        } else {

        }

    }
    next(err);
}