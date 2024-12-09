const development = require('../environment/development')
const production = require('../environment/production')
const logger = require('../../logger/index')
module.exports = async (err, req, res, next) => {
    console.log("Centrealized")
    console.log(err);
    logger.error(err.message)
    if (res.headersSent) {
        // Response already sent to the end user
        return;
    }
    if (process.env.NODE_ENV === 'development') {
        development.clientResponse(err, req, res, next);
    } else if (process.env.NODE_ENV === 'production') {
        production.clientResponse(err, req, res, next);
    } else {

    }
}