const express = require('express');
const routes = express.Router();

const SessionController = require('../app/controllers/SessionController');
const UserController = require('../app/controllers/UserController');

// routes.get('/login', SessionController.loginFrom);
// routes.post('/login', SessionController.login);
// routes.post('/logout', SessionController.logout);

// routes.get('/forgot-password', SessionController.forgotForm);
// routes.get('/password-reset', SessionController.resetForm);
// routes.post('/forgot-password', SessionController.forgot);
// routes.post('/password-reset', SessionController.reset);

// routes.get('/register', SessionControler.registerForm);
// routes.post('/register', SessionControler.register);

// routes.get('/', UserController.show);
// routes.put('/', UserController.put);
// routes.delete('/', UserController.delete);

module.exports = routes;