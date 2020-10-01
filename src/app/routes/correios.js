module.exports = function(app) {
    app.post('/correios/calculaPrazo', function(req, res) {
        const deliveryData = req.body;

        const correiosSoapClient = new app.src.app.services.correiosSOAPClient();

        correiosSoapClient.calculaPrazo(deliveryData, function(err, result) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }

            console.log('prazo calculado');

            res.status(200).json(result);
        })
    });
}