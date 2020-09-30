const restify = require('restify-clients');


const client = restify.createJsonClient({
    url: 'http://localhost:3001'
});

client.post('/cartoes/autoriza', (err, req, res, obj) => {
    // err ? console.log(err) : console.log('não tem erro')
    console.log('Consumindo serviço de cartões');
    console.log(obj);
});