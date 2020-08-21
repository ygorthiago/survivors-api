const express = require('express');
const SurvivorsController = require('./controllers/SurvivorsController');
const ItemsController = require('./controllers/ItemsController');
const MarkSurvivorAsInfectedController = require('./controllers/MarkSurvivorAsInfectedController');

const routes = express.Router();
const survivorsController = new SurvivorsController();
const itemsController = new ItemsController();
const markSurvivorAsInfectedController = new MarkSurvivorAsInfectedController();

routes.get('/items', itemsController.index);

routes.post('/survivors', survivorsController.create);
routes.get('/survivors', survivorsController.index);
routes.get('/survivor/', survivorsController.show);
routes.put('/survivor/:id/update-location', survivorsController.put);

routes.post('/survivors/mark-as-infected', markSurvivorAsInfectedController.create);

module.exports = routes;