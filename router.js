const express = require('express');
const controller = require('./controller.js');
const router = express.Router();

router
    .route('/email')
    .post(controller.post)
    .get(controller.get)

module.exports = router;