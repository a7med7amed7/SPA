const winston = require('winston');
const { stack } = require('../routes/product');
const { combine, timestamp, json, cli, printf, colorize, errors } = winston.format;

const text = printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}]`);

const myFormat = combine(
    // colorize({ all: true }), // add colors to console only
    timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    text
);
const errorFilter = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
})

const infoFilter = winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
});
const errorStackFormat = winston.format(info => {
    if (info instanceof Error) {
        return Object.assign({}, info, {
            stack: info.stack,
            message: info.message
        })
    }
    return info
})
const logger = winston.createLogger({
    level: 'debug', // process.env_LOG_LEVEL
    format: myFormat,
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({
            filename: './logger/logs/error.log',
            level: 'error',
            format: combine(errorFilter(), timestamp(), json())
        }),
        new winston.transports.Console({
            level: 'error',
            format: combine(errorStackFormat(), timestamp(), json())
        }),
        new winston.transports.File({
            filename: './logger/logs/combined.log',
            level: 'info',
            format: combine(infoFilter(), timestamp(), json())
        }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
// }

module.exports = logger;