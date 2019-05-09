// TODO: require db
const nodemailer = require('nodemailer');
const { pass } = require('./config.js');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'the.game.swap.app@gmail.com',
    pass: pass
  }
});

const makeMessage = (emails, game, offer, contact) => {
  var mailOptions = {
    from: 'the.game.swap.app@gmail.com',
    to: '',
    bcc: emails,
    subject: 'Sorry, I need to test this',
    text: 'I don\'t mean to spam you, I just need to see if this method works.\nSorry'
  };
  return mailOptions;
}

const list = [];

const controller = {
    post: (req, res) => {
      /*TODO query db for users who have posted
        and structure their info to send templated emails

        expected req.body = {
          userID: number,
          gameID: number,
          offer: ['string'],
          console: string
        }
      */

      //list is temporary, will be replaced with the list of emails to have messages sent to them
      transporter.sendMail(makeMessage(list), function(error, info) {
        if (error) {
          res.status(404).send(error);
        } else {
          res.status(201).send('Emails sent');
        }
      });
    }
}

module.exports = controller;