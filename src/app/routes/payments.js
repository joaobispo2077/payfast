module.exports = (app) => {

    app.get('/pagamentos', (req, res) => {
        res.status(200).json('00')
    });

    app.post('/pagamentos/pagamento', (req, res) => {
        const pagamento = req.body;
        console.log(pagamento);
        res.status(201).json('created');
    })

}