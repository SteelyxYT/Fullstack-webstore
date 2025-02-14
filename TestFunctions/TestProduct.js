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
    
    const [results, fields] = await connection.query('SELECT * FROM `users` WHERE UserID = 1;');
    console.log(results);
    console.log(fields);

    await connection.end();

    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }

}

connect();