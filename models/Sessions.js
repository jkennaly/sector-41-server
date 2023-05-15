import Sequelize from 'sequelize';
import sequelize from '../db/sequelize.js';

import Games from './Games.js';
import Users from './Users.js';


const Sessions = sequelize.define('Sessions', {
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
});



Sessions.belongsTo(Games, { as: 'game', foreignKey: 'gameId' });
Sessions.belongsTo(Users, { as: 'gm', foreignKey: 'gmId' });
Sessions.belongsToMany(Users, { through: 'SessionPlayers', as: 'players', foreignKey: 'sessionId' });



export default Sessions;
