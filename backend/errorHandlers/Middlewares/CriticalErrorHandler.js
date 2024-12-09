const development = require('../environment/development')
const production = require('../environment/production')
module.exports = async (err, req, res, next) => {
    console.log("Critical")
    if (err.severity === 'critical') {
        if (process.env.NODE_ENV === 'development') {
            development.clientResponse(err, req, res, next);
        } else if (process.env.NODE_ENV === 'production') {
            production.clientResponse(err, req, res, next);
            await production.callAdmin(err)
        } else {

        }
    } else
        next(err);
}