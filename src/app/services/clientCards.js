const restify = require('restify-clients');

function ClientCards() { //this is a constructor wtf.
    this._client = restify.createJsonClient({
        url: 'http://localhost:3001'
    });

}

ClientCards.prototype.authenticate = function(card, callback) {
    this._client.post('/cartoes/autoriza', card, callback);
}

module.exports = function() {
    return ClientCards;
}