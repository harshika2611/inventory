require('dotenv').config();
const mysql = require('mysql');
const logger = require('../logs.js');

var connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});


connection.connect((err) => {
    if (!err) {
        logger.info("connected..");
    } else {
        logger.logError("Error In Database Connection: " + err);
    }
});

module.exports = connection;