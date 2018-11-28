const mailer = require('nodemailer');
const fs = require('fs');
const { purchase } = require('./purchase_template');
const { resetPwd } = require('./resetpass_template');

require('dotenv').config();

const sendEmail = (to, name, token, type, actionData = null) => {
  const smtpTranport = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'the.key.max@gmail.com',
      pass: process.env.SMTP_EMAIL_PWD
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTranport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent');
    }
    smtpTranport.close();
  });
};

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;

  switch (template) {
    case 'welcome':
      data = {
        from: 'Greetings from Waves Guitar Shop! <the.key.max@gmail.com>',
        to,
        subject: `Welcome to waves ${name}`,
        text: 'Testing our waves mails',
        html: fs.readFileSync('./server/utils/mail/welcome_template.html', { encoding: 'utf-8' })
      };

      break;

    case 'purchase':
      data = {
        from: 'Waves Guitar Shop <the.key.max@gmail.com>',
        to,
        subject: `Thanks for shopping with us ${name}`,
        text: 'Testing our waves mails',
        html: purchase(actionData)
      };

      break;

    case 'reset_password':
      data = {
        from: 'Waves Guitar Shop <the.key.max@gmail.com>',
        to,
        subject: `Hey ${name}, reset your password`,
        text: 'Testing our waves mails',
        html: resetPwd(actionData)
      };

      break;

    default:
      data;
  }

  return data;
};

module.exports = { sendEmail };
