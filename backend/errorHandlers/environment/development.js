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

module.exports = {
    clientResponse,
}