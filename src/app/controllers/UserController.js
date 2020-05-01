const User = require('../models/User');
const { formatCpfCnpj, formatCep } = require('../../lib/utils');

module.exports = {
  registerForm(req, res) {
    return res.render('user/register');
  },

  async show(req, res) {
    const { user } = req;

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
    user.cep = formatCep(user.cep);

    return res.render('user/index', { user });
  },

  async register(req, res) {
    const userId = await User.create(req.body);

    req.session.userId = userId;

    return res.redirect('/users');
  },

  async update(req, res) {
    try {
      let { name, email, cpf_cnpj, cep, address } = req.body;

      cpf_cnpj = cpf_cnpj.replace(/\D/g, '');
      cep = cep.replace(/\D/g, '');

      await User.update(user.id, {
        name,
        email,
        cpf_cnpj,
        cep,
        address
      });

      return res.render('user/index', {
        success: 'Conta atualizada com sucesso!'
      });

    } catch(err) {
      console.log('UserController update', err);

      return res.render('user/index', {
        error: 'Ocorreu algum erro, tente novamente.'
      });
    }
  }
};
