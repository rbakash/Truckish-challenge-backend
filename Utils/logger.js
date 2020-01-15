const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const logger = createLogger({
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        prettyPrint()
      ),
    transports: [
        new transports.File({
            level: 'info',
            filename: './Logs/logs.log',
            handleExceptions: false,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true,
        }),

        new transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            
        }),
        new transports.File({
            level: 'error',
            filename: './Logs/errors.log',
            handleExceptions: false,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true,
        }),
    ],
    exceptionHandlers: [
        new transports.File({
            filename: './Logs/exceptions.log',
            handleExceptions: true,
            json: true,
            colorize: true,
        })
    ],
    exitOnError: false
});

module.exports = logger;

module.exports.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};