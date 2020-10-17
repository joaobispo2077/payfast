const express = require('express');
const morgan = require('morgan');
const consign = require('consign');
const cors = require('cors');
const logger = require('../app/services/logger.js');


module.exports = () => {
    const app = express();
    app.use(cors());
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(express.json());

    consign()
        .include('./src/app/routes')
        .then('./src/app/database')
        .then('./src/app/services')
        .into(app);

    return app;
};