const express = require('express');
const SurvivorsController = require('./controllers/SurvivorsController');
const ItemsController = require('./controllers/ItemsController');
const MarkSurvivorAsInfectedController = require('./controllers/MarkSurvivorAsInfectedController');
const ReportsController = require('./controllers/ReportsController');

const routes = express.Router();
const survivorsController = new SurvivorsController();
const itemsController = new ItemsController();
const markSurvivorAsInfectedController = new MarkSurvivorAsInfectedController();
const reportsController = new ReportsController();

routes.get('/items', itemsController.index);

routes.post('/survivors', survivorsController.create);
routes.get('/survivors', survivorsController.index);
routes.get('/survivor/', survivorsController.show);
routes.put('/survivor/:id/update-location', survivorsController.put);

routes.post('/survivors/mark-as-infected', markSurvivorAsInfectedController.create);

routes.get('/reports', reportsController.index);

module.exports = routes;