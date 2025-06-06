const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'prefeitura_cidadaos',
    port: 3307,
    })

module.exports = db;