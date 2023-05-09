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
  status: {
    type: Sequelize.ENUM('completed', 'inProgress', 'upcoming'),
    allowNull: false,
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

export default Games;
