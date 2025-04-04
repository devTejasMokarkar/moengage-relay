const mysql2 = require('mysql2');
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = require("../config");

const db = mysql2.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 10,
    waitForConnections: true,
    charset: 'utf8',
});
// charset: 'utf8mb4_unicode_ci'
db.on('acquire', function (connection) {
    // console.log('Connection %d acquired', connection.threadId);
})

db.on('connection', function (connection) {
    console.log('Database Connected');
    // connection.query('SET SESSION auto_increment_increment=1')
})

db.on('enqueue', function () {
    // console.log('Waiting for available connection slot');
})

db.on('release', function (connection) {
    //console.log('Connection %d released', connection.threadId);
});

module.exports = db.promise();