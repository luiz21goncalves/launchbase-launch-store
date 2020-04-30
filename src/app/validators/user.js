const User = require('../models/User');

async function post(req, req, next) {  
  const keys = Object.keys(req.body);
  
  for (key of keys) {
    if (req.body[key] == '')
    return res.send('Por favor, preencha todos os campos!');
  }
  
  let { email, cpf_cnpj, password, passwordRepeat } = req.body;
  
  cfp_cnpj = cpf_cnpj.replace(/\D/g, '');
  
  const user = await User.findOne({
    where: { email },
    or: { cpf_cnpj }
  });
  
  if (user) return res.send('Usuário já existente!')
  
  if (password != passwordRepeat) res.send('Senhas não conferem!')

  next();
};

module.exports = {
  post
};
