const fs = require('fs');
const winston = require('winston');

if (!fs.existsSync('../logs')) {
    fs.mkdirSync('../logs');
}

module.exports = new winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: '../logs/payfast.log',
            maxsize: 100000,
            maxFiles: 10
        })
    ]
});


// const logger = new winston.createLogger({
//     level: 'info',
//     defaultMeta: { service: 'user-service' },
//     format: winston.format.json(),
//     transports: [
//         new winston.transports.File({
//             filename: '../logs/payfast.log',
//             maxsize: 100000,
//             maxFiles: 10

//         })
//     ]
// });


// logger.log('info', `consultando o pagamento de id: 300`);
// module.exports = () => {
//     return logger;
// }