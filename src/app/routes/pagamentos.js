const { body, validationResult } = require('express-validator');

module.exports = (app) => {

    app.get('/pagamentos', (req, res) => {
        const connection = app.src.app.database.connection();
        const pagamentoDAO = new app.src.app.database.PagamentoDAO(connection);
        pagamentoDAO.listAll((err, result) => {
            console.log(result);
            res.status(200).json(...result);
        });

    });

    app.post('/pagamentos/pagamento', [
        body('forma_de_pagamento').notEmpty(),
        body('valor').notEmpty().isFloat(),
    ], (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const payment = req.body;
        console.log(payment);

        payment.status = 'CRIADO';
        payment.data = new Date;


        const connection = app.src.app.database.connection();
        const pagamentoDAO = new app.src.app.database.PagamentoDAO(connection);

        console.log(connection);
        console.log(payment);
        pagamentoDAO.create(payment, (err, result) => {
            if (err) {
                res.status(400).json({ message: err.sqlMessage });
            }

            if (!err) {
                console.log('Pagamento criado');
                console.log(result);
                res.location('/pagamentos/pagamento/' + result.insertId);
                res.status(201).json(payment);

            }
        });

    })

}