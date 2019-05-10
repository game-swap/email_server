const db = require('./db.js');
const nodemailer = require('nodemailer');
const { pass } = require('./config.js');

//config for nodemailer to send email
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'the.game.swap.app@gmail.com',
    pass: pass
  }
});

//creates email template
const makeMessage = (emails, buyer, gameName, offer, contact) => {
  var offerStr = '\n';
  for (var y = 0; y < offer.length; y++) {
    offerStr += offer[y] + '\n'
  }
  var mailOptions = {
    from: 'the.game.swap.app@gmail.com',
    to: '',
    bcc: emails,
    subject: 'Trade Offer',
    text: 
      `Good news!\n\
      \nThere is someone interested in trading for your copy of ${gameName}! ${buyer} is offering: \n${offerStr}\nIf you're interested in this deal, contact ${buyer} at ${contact}.\n\nKeep swappin'\nGame Swap\
      `
  };
  return mailOptions;
}

const controller = {

    //route to send email to all sellers
    post: (req, res) => {

      let { buyer, user_id, game, offer, email, game_id, platform_id } = req.body;

      //Updates user's number of requests left
      db
        .query(`\
                SELECT requests_left FROM users
                WHERE user_id = ${user_id}
                `)
        .then(data => {
          if (data.rows[0].requests_left === 0) {
            res.status(201).send('Out of requests');
          } else {
            var updatedVal = data.rows[0].requests_left - 1;
            db
            .query(`UPDATE users
            SET requests_left = ${updatedVal}
            WHERE user_id = ${user_id}
            `)
            .then(data => {
                //queryies database for all sellers' emails
                db.query(`
                  SELECT email FROM users u
                  INNER JOIN offers o
                  ON u.user_id = o.user_id
                  INNER JOIN games g
                  ON o.game_id = g.game_id
                  WHERE g.game_id = ${game_id}
                  AND o.platform_id = ${platform_id}
                  `)
                  .then(data => {
                    var emails = [];
                    for (var x = 0; x < data.rows.length; x++) {
                      emails.push(data.rows[x].email)
                    }
                    //sends email
                    transporter.sendMail(makeMessage(emails, buyer, game, offer, email), function(error, info) {
                      if (error) {
                        res.status(404).send(error);
                      } else {
                        res.status(201).send('Emails sent')
                      }
                    });
                  })
                  .catch(err => res.status(404).send(err))
              })
              .catch(err => res.status(404).send(err))
          }
        })
        .catch(err => res.status(404).send(err))


      }
    }

module.exports = controller;