const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function connect() {
    try {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    return connection;
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }

}

async function disconnect(connection) {
    try {
        await connection.end();
    } catch (error) {
        console.error('Error disconnecting from the database: ', error);
    }
}

module.exports = {
    connect,
    disconnect
}