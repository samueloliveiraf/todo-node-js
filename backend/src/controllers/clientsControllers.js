const clientsModel = require('../modules/ClientsModel');

const validates = require('../utls/validations');

const calculate = require('../utls/optimizeVisite');


const getAllClients = async(request, response) => {
    try {
        const clientsAll = await clientsModel.dbGetAll();

        if (clientsAll.length > 0) {
            return response.status(200).json(clientsAll);
        } else {
            return response.status(404).json({ 'message': 'notFoundDatas' });
        }
    } catch (error) {
        return response.status(500).json({ 'message': `internalServerError ${error}` });
    }
};


const createClient = async(request, response) => {
    try {
        const { name, email, fone, coord_x, coord_y } = request.body;

        if (!name || !email || !fone || coord_x === undefined || coord_y === undefined) {
            return response.status(400).json({ message: 'Missing required fields' });
        }

        if (!validates.validateBrazilianPhoneNumber(fone)) {
            return response.status(400).json({ message: 'Invalid Brazilian phone number' });
        }

        if (!validates.validateEmail(email)) {
            return response.status(400).json({ message: 'Invalid email address' });
        }

        if (typeof coord_x !== 'number' || typeof coord_y !== 'number') {
            return response.status(400).json({ message: 'Invalid coordinates' });
        }

        const client = { name, email, fone, coord_x, coord_y };
        const createdClient = await clientsModel.dbInsertClient(client);

        return response.status(201).json(createdClient);
    } catch (error) {
        return response.status(500).json({ message: `Internal Server Error: ${error}` });
    }
};


const getOptimizedRoute = async(req, res) => {
    try {
        const orderedClients = await calculate.calculateOptimizedRoute();

        return res.status(200).json(orderedClients);
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};


const getFindClient = async(request, response) => {
    try {
        const { email, fone, name } = request.body;
        let field;
        let value;

        if (email) {
            field = 'email';
            value = email;
        } else if (fone) {
            field = 'fone';
            value = fone;
        } else if (name) {
            field = 'name';
            value = name;
        } else {
            return response.status(400).json({ message: 'At least one of email, fone, or name is required in the request body' });
        }

        const client = await clientsModel.dbGetClientByField(field, value);

        if (!client) {
            return response.status(404).json({ message: 'Client not found' });
        }

        return response.status(200).json(client);
    } catch (error) {
        return response.status(500).json({ message: `Internal Server Error: ${error}` });
    }
};


module.exports = {
    getOptimizedRoute,
    getAllClients,
    createClient,
    getFindClient
};