const express = require('express');
const routes = express.Router();

const HomeController = require('../app/controllers/HomeController');

const products = require('./products');
const users = require('./users');
const cart = require('./cart');
const order = require('./order');

routes.get('/', HomeController.index);

routes.use('/products', products);
routes.use('/users', users);
routes.use('/cart', cart);
routes.use('/orders', order);

routes.get('/ads/create', (req, res) => res.redirect('/products/create'));
routes.get('/accounts', (req, res) => res.redirect('/users/login'));

module.exports = routes;
