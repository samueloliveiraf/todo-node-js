const connection = require('./connection');


const dbGetAll = async() => {
    const query = 'SELECT * FROM clients';
    const { rows } = await connection.query(query);
    return rows;
};


const dbInsertClient = async(client) => {
    try {
        const { name, email, fone, coord_x, coord_y } = client;

        const query = 'INSERT INTO clients (name, email, fone, coord_x, coord_y) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [name, email, fone, coord_x, coord_y];

        const { rows } = await connection.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error(`Failed to create client, ${error}`);
    }
};


const dbGetClientByField = async(field, value) => {
    try {
        let query;
        let values;

        switch (field) {
            case 'email':
                query = 'SELECT * FROM clients WHERE email = $1';
                values = [value];
                break;
            case 'fone':
                query = 'SELECT * FROM clients WHERE fone = $1';
                values = [value];
                break;
            case 'name':
                query = 'SELECT * FROM clients WHERE name = $1';
                values = [value];
                break;
            default:
                throw new Error('Invalid field for client search');
        }

        const { rows } = await connection.query(query, values);

        if (rows.length === 0) {
            return null;
        }

        return rows[0];
    } catch (error) {
        throw new Error(`Failed to fetch client by ${field}: ${error}`);
    }
};


module.exports = {
    dbGetAll,
    dbInsertClient,
    dbGetClientByField
};