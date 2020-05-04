const crypto = require('crypto');
const mailer = require('../../lib/mailer');

const User = require('../models/User');

module.exports = {
  loginForm(req, res) {
    return res.render('session/login');
  },

  login(req, res) {
    req.session.userId = req.user.id;

    return res.redirect('/users');
  },

  logout(req, res) {
    req.session.destroy();

    return res.redirect('/');
  },

  forgotForm(req, res) {
    return res.render('session/forgot-password');
  },

  async forgot(req, res) {
    const user = req.user;

    try {
      const token = crypto.randomBytes(20).toString('hex');

      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now,
      })

      await mailer.sendMail({
        to: user.email,
        from: 'no-replay@launchstore.com.br',
        subject: 'Recuperação de senha',
        html: `
          <h2>Perdeu a chave?</h2>
          <p>Não se preocupe, clique no link abaixo para recuperar sua senha.</p>
          <p>
            <a href="${req.protocol}://localhost:3000/password-reset?token=${token}" target="_blank">
              Recuperar senha.
            </a>
          </p>
        `,
      });

      return res.render('session/forgot-password', {
        success: "Verifique seu email para recuperar sua senha!"
      });
    } catch(err) {
      console.error('SessionControler forgot', err);
      
      return res.render('session/forgot-password', {
        error: 'Ocorreu um erro, tente novamente!'
      });
    }
  }
}
