const Sequelize = require('sequelize');
const pass = require('./config.js').pass;
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '18.212.114.97',
  database: 'gameswap',
  password: pass,
  port: 5432
})

pool.connect();

module.exports = pool;