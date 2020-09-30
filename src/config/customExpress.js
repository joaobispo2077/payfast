const express = require('express');
const consign = require('consign');



module.exports = () => {
    const app = express();

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