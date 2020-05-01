const User = require('../models/User');

async function post(req, res, next) {  
  const keys = Object.keys(req.body);
  
  for (key of keys) {
    if (req.body[key] == '')
    return res.render('user/register.njk',{
      error: 'Por favor, preencha todos os campos!'
    });
  }
  
  let { email, cpf_cnpj, password, passwordRepeat } = req.body;
  
  cfp_cnpj = cpf_cnpj.replace(/\D/g, '');
  
  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj }
  });
  
  if (user) return res.render('user/register.njk', {
    user: req.body,
    error: 'Usuário já existente!'
  });
  
  if (password != passwordRepeat) return res.render('user/register.njk',{
    user: req.body,
    error :'Senhas não conferem!'
  });

  next();
};

module.exports = {
  post
};
