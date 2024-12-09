const APIError = require('../services/API/index');
const DatabaseError = require('../services/Database/index');

const clientResponse = (err, req, res, next) => {
    if (res.headersSent) {
        // Response already sent to the end user
        return next(err); // if exists
    }
    return res.status(err.statusCode).json({
        status: 0,
        message: err.message,
    })
}

const callAdmin = async (err) => {
    if (err instanceof APIError.BaseAPIError) {
        setTimeout(() => {
            console.log("Email sent to development admin")
        }, 1000)
    } else if (err instanceof DatabaseError.BaseDatabaseError) {
        setTimeout(() => {
            console.log("Email sent to database admin")
        }, 1000)
    } else {
        setTimeout(() => {
            console.log("Email sent to CEO")
        }, 1000)
    }
}

module.exports = {
    clientResponse,
    callAdmin
}