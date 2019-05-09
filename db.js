const Sequelize = require('sequelize');
const pass = require('./config.js').pass;

const sequelize = new Sequelize('gameswap', 'postgres', pass, {
    host: '18.212.114.97',
    dialect: 'postgres',
    logging: false,
    pool: { maxConnections: 20, maxIdleTime: 30 }
  });

sequelize
    .authenticate()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error(err));

module.exports = sequelize;