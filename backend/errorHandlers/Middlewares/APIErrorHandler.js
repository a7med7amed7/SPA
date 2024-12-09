const APIError = require('../services/API/index')
const development = require('../environment/development')
const production = require('../environment/production')
module.exports = (err, req, res, next) => {
    if (err instanceof APIError.BaseAPIError) {
        if (process.env.NODE_ENV === 'development') {
            development.clientResponse(err, req, res, next);
        } else if (process.env.NODE_ENV === 'production') {
            production.clientResponse(err, req, res, next);
        } else {

        }

    }
    next(err);
}