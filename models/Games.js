import Sequelize from 'sequelize';
import sequelize from '../db/sequelize.js';

const Games = sequelize.define('Games', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('completed', 'inProgress', 'upcoming'),
    allowNull: false,
  },
  gmId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // assuming your User model is named 'Users' in the database
      key: 'id',
    },
  },
  completedAt: {
    type: Sequelize.DATE,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  maxPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gameLength: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  gameType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Games.associate = function(models) {
  Games.belongsTo(models.Users, { as: 'gm', foreignKey: 'gmId' });
  Games.belongsToMany(models.Users, { through: 'GamePlayers', as: 'players', foreignKey: 'gameId' });
  Games.hasMany(models.Sessions, { as: 'sessions', foreignKey: 'gameId' });
  Games.hasOne(models.UniverseContext, {
    foreignKey: 'gameId',
    as: 'universe', 
  });
};


export default Games;
