const { body, validationResult } = require('express-validator');

module.exports = (app) => {

    app.get('/pagamentos', (req, res) => {
        const connection = app.src.app.database.connection();
        const pagamentoDAO = new app.src.app.database.PagamentoDAO(connection);
        pagamentoDAO.listAll((err, result) => {
            console.log(result);
            res.status(200).json(result);
        });

    });

    app.post('/pagamentos/pagamento', [
        body('forma_de_pagamento').notEmpty(),
        body('valor').notEmpty().isFloat(),
    ], async(req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const payment = req.body;
        console.log(payment);

        payment.status = 'CRIADO';
        payment.data = new Date;

        const connection = await app.src.app.database.connection();
        const pagamentoDAO = new app.src.app.database.PagamentoDAO(connection);

        console.log(payment);
        await pagamentoDAO.create(payment, (err, result) => {
            if (err) {
                res.status(400).json({ message: err.sqlMessage });
            }

            if (!err) {
                payment.id = result.insertId
                console.log('Pagamento criado');
                console.log(result);
                res.location('/pagamentos/pagamento/' + payment.id);

                const response = {
                    data_payment: payment,
                    links: [{
                            href: "http://localhost:3000/pagamentos/pagamento/" + payment.id,
                            rel: "confirmar",
                            method: 'PATCH'
                        },
                        {
                            href: "http://localhost:3000/pagamentos/pagamento/" + payment.id,
                            rel: "cancelar",
                            method: "DELETE"
                        }
                    ]
                }

                res.status(201).json(response);

            }
        });

    });

    app.patch('/pagamentos/pagamento/:id', (req, res) => {
        const { id } = req.params;
        // const status = req.body.status;


        const payment = {};
        payment.id = id;
        payment.status = 'APROVADO'; //status

        const connection = app.src.app.database.connection();
        const pagamentoDAO = new app.src.app.database.PagamentoDAO(connection);

        pagamentoDAO.update(payment, (err, result) => {
            if (err) {
                res.status(400).json(err);
            }

            res.status(200).json(result);
            console.log('Pagamento Aprovado');
        });
    });

    app.delete('/pagamentos/pagamento/:id', (req, res) => {
        const { id } = req.params;
        // const status = req.body.status;


        const payment = {};
        payment.id = id;
        payment.status = 'CANCELADO'; //status

        const connection = app.src.app.database.connection();
        const pagamentoDAO = new app.src.app.database.PagamentoDAO(connection);

        pagamentoDAO.update(payment, (err, result) => {
            if (err) {
                res.status(400).json(err);
            }

            res.status(204).json(result);
            console.log('Pagamento Cancelado');
        });
    });

}