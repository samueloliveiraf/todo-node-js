const tspSolver = require('salesman.js');

const clientsModel = require('../modules/ClientsModel');


const calculateOptimizedRoute = async() => {
    try {
        const clients = await clientsModel.dbGetAll();
        const validClients = clients.filter(client => client.coord_x != null && client.coord_y != null);

        let coordinates = [
            [0, 0], ...validClients.map(client => [client.coord_x, client.coord_y]), [0, 0]
        ];

        let points = coordinates.map(coord => new tspSolver.Point(coord[0], coord[1]));

        const optimizedRouteIndices = tspSolver.solve(points);
        const orderedClients = optimizedRouteIndices.slice(1, -1).map(index => validClients[index - 1]);

        return orderedClients;
    } catch (error) {
        throw new Error(`Failed to calculate optimized route: ${error}`);
    }
};

module.exports = {
    calculateOptimizedRoute
};