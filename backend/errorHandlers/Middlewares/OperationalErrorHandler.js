const development = require('../environment/development')
const production = require('../environment/production')
module.exports = async (err, req, res, next) => {
    console.log("OP ERR")
    if (!err.isOperationalError) {
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'development') {
            development.clientResponse(err, req, res, next);
        } else if (process.env.NODE_ENV === 'production') {
            await production.callAdmin(err)
            production.clientResponse(err, req, res, next);
        } else {

        }
    } else
        next(err);

}