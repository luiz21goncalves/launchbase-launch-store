const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '3c99ba236e9b27',
    pass: '0a677764e6968d'
  }
});
