const express = require('express');
const routes = express.Router();

const OrderController = require('../app/controllers/OrderController');

const { onlyUsers } = require('../app/middlewares/session');

routes.use(onlyUsers);

routes.get('/', OrderController.index);
routes.post('/', OrderController.post);
routes.get('/sales', OrderController.sales)

module.exports = routes;
