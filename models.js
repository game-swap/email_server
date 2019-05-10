const Sequelize = require('sequelize');
const sequelize = require('./db.js');

const Users = sequelize.define('users', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  tradeRequestsLeft: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

const Games = sequelize.define('games', {
  game_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  cover: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  popularity: {
    type: Sequelize.DOUBLE
  },
  summary: {
    type: Sequelize.TEXT
  },
  total_rating: {
    type: Sequelize.DOUBLE
  },
  offers: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

const Consoles = sequelize.define('consoles', {
  console_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

const Offers = sequelize.define('offers', {
  offer_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  game_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  console_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: true,
  updatedAt: false
});

sequelize.sync()
.then(() => console.log('schemas have been synced'))
.catch(err => console.log('unable to sync schemas: ', err))

module.exports = { Users, Games, Consoles, Offers };