const mysql = require('mysql');

function connection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'payfast'
    });
}

module.exports = function() {
    return connection;
}