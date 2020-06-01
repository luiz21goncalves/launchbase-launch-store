const express = require('express');
const routes = express.Router();

const OrderController = require('../app/controllers/OrderController');

const { onlyUsers } = require('../app/middlewares/session');

routes.use(onlyUsers);

routes.get('/', OrderController.index);
routes.get('/sales', OrderController.sales);
routes.post('/', OrderController.post);
routes.get('/:id', OrderController.show);
routes.post('/:id/:action', OrderController.update);

module.exports = routes;
