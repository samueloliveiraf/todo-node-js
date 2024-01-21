const express = require('express');
const clientsController = require('./controllers/clientsControllers');

const router = express.Router();

router.get('/clients-optimeze', clientsController.getOptimizedRoute);
router.post('/client-find', clientsController.getFindClient);
router.get('/clients', clientsController.getAllClients);
router.post('/client-create', clientsController.createClient);


module.exports = router;