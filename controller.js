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

const controller = {
    post: (req, res) => {
      /*TODO query db for users who have posted
        and structure their info to send templated emails
      */

     var mailOptions = {
      from: 'the.game.swap.app@gmail.com',
      to: 'adam_reback@yahoo.com',
      cc: ['Liezelanne9@gmail.com', 'Nathanaelmullins@gmail.com', 'Davidfred1994@gmail.com'],
      subject: 'I did the thing',
      text: 'I figured out how to send automated emails.  The mandrill thing didn\'t work, but this method does. :) \n --Adam'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(404).send(error);
      } else {
        res.status(201).send('Email sent: ' + info.response);
      }
    });
    }
}

module.exports = controller;