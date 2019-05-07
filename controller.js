// TODO: require db
const $ = require('jquery');
const axios = require('axios');
const API = require('./config.js').API;

const controller = {
    post: (req, res) => {
        axios({
            method: 'POST',
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
              'key': API,
              'message': {
                'from_email': 'the.game.swap.app@gmail.com',
                'from_name': 'Game Swap',
                'to': [
                    // {
                    //   'email': 'RECIPIENT_NO_1@EMAIL.HERE',
                    //   'type': 'to'
                    // },
                    {
                      'email': 'adam_reback@yahoo.com',
                      'type': 'to'
                    }
                  ],
                'autotext': 'true',
                'subject': 'You have a trade offer!',
                'text': 'The world says hello back',
                'async': false
              }
            }
        })
        .then(res.send('sent'))
        .catch(err => console.error(err))

        // $.ajax({
        //     type: "POST",
        //     url: "https://mandrillapp.com/api/1.0/messages/send.json",
        //     data: {
        //       'key': API,
        //       'message': {
        //         'from_email': 'the.game.swap.app@gmail.com',
        //         'from_name': 'Game Swap',
        //         'to': [
        //             // {
        //             //   'email': 'RECIPIENT_NO_1@EMAIL.HERE',
        //             //   'type': 'to'
        //             // },
        //             {
        //               'email': 'adam_reback@yahoo.com',
        //               'type': 'to'
        //             }
        //           ],
        //         'autotext': 'true',
        //         'subject': 'You have a trade offer!',
        //         'text': 'The world says hello back'
        //       }
        //     }
        //    }).done(function(response) {
        //      console.log(response); // if you're into that sorta thing
        //    });
        // res.status(201).send(req.body)
    }
}

module.exports = controller;