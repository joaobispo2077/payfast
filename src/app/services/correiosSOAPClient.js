const soap = require('soap');

function CorreiosSOAPClient() {
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';
}

CorreiosSOAPClient.prototype.calculaPrazo = function(deliveryData, callback) {

    soap.createClient(this._url,
        function(err, client) {
            console.log('Created client soap');
            client.CalcPrazo(deliveryData, callback);
        }

    );
}

module.exports = function() {
    return CorreiosSOAPClient;
}