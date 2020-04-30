const User = require('../models/User');

module.exports = {
  registerForm(req, res) {
    return res.render('user/register');
  },

  async register(req, res) {
    

    return res.send('cadastrado com sucesso!')
  },
};
