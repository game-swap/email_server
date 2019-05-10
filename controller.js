const db = require('./db.js');
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

        db.query(`\
          SELECT email FROM users u\
          INNER JOIN offers o\
          ON u.user_id = o.user_id\
          INNER JOIN games g\
          ON o.game_id = g.game_id\
          WHERE g.game_id = ${req.body.game_id}\
          AND o.platform_id = ${req.body.platform_id}\
          `)
          .then(data => {
            var emails = [];
            for (var x = 0; x < data.rows.length; x++) {
              emails.push(data.rows[x].email)
            }
            transporter.sendMail(makeMessage(emails), function(error, info) {
              if (error) {
                res.status(404).send(error);
              } else {
                //TODO decrease user's number of emails remaining
                res.status(201).send('Emails sent');
              }
            });
          })
          .catch(err => res.status(404).send(err))
        }
      }

module.exports = controller;