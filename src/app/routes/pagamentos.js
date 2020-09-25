module.exports = (app) => {

    app.get('/pagamentos', (req, res) => {
        const connection = app.src.app.database.connection();
        const pagamentoDAO = new app.src.app.database.PagamentoDAO(connection);
        pagamentoDAO.listAll((err, result) => {
            console.log(result);
            res.status(200).json(...result);
        });

    });

    app.post('/pagamentos/pagamento', (req, res) => {
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
                res.status(201).json(payment);

            }
        });

    })

}