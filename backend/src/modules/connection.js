const { Pool } = require('pg');
require('dotenv').config();

try {
    const connection = new Pool({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    module.exports = connection;
} catch (error) {
    console.error('Erro ao criar conexão com o banco de dados:', error);
}