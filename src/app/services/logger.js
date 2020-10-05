const winston = require('winston');

const logger = new winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({
            filename: '../logs/payfast.log',
            maxsize: 100000,
            maxFiles: 10

        })
    ]
});

logger.log('info', 'log utiliazndo winston e info');
logger.info('log mais maroto')