const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const router = require('./router.js');
const port = 3000;
const server = express();

server.use(morgan('dev'));
server.use(parser.json())
server.use(parser.urlencoded({extended: true}))

server.use('/api', router)

server.listen(port, () => console.log(`connected at ${port}`));