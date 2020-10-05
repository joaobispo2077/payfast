const { log } = require('console');
const os = require('os');

const cluster = require('cluster');


const cpus = os.cpus();
// console.log(cpus);
console.log('executando thread');

if (cluster.isMaster) {
    console.log('executando thread master');

    cpus.forEach(() => {

        cluster.fork();
    });

    cluster.on('listening', (worker) => {
        console.log(`cluster conectado: ${worker.process.pid}`);
    });

    cluster.on('exit', (worker) => {
        console.log(`cluster desconectado: ${worker.process.pid}`);
        cluster.fork();
    })
} else {
    console.log('thread slave');
    require('./index');
}