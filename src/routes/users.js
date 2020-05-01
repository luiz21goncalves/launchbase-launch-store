const express = require('express');
const routes = express.Router();

const SessionController = require('../app/controllers/SessionController');
const UserController = require('../app/controllers/UserController');

const Validator = require('../app/validators/user');

// routes.get('/login', SessionController.loginFrom);
// routes.post('/login', SessionController.login);
// routes.post('/logout', SessionController.logout);

// routes.get('/forgot-password', SessionController.forgotForm);
// routes.get('/password-reset', SessionController.resetForm);
// routes.post('/forgot-password', SessionController.forgot);
// routes.post('/password-reset', SessionController.reset);

routes.get('/register', UserController.registerForm);
routes.post('/register', Validator.post, UserController.register);

routes.get('/', Validator.show, UserController.show);
routes.put('/', UserController.update);
// routes.delete('/', UserController.delete);

module.exports = routes;