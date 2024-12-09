const development = require('./development');
let logger = null;
if (process.env.NODE_ENV === 'development') {
    logger = development;
} else if (process.env.NODE_ENV === 'production') {

} else {

}

module.exports = logger;