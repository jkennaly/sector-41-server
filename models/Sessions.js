import Sequelize from 'sequelize';
import sequelize from '../db/sequelize.js';

import Games from './Games.js';
import Players from './Players.js';
import GMs from './GMs.js';


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



// Define many-to-many relationship with Sessions model
const PlayerSessions = sequelize.define('PlayerSessions', {});
Players.belongsToMany(Sessions, { through: PlayerSessions });

Sessions.belongsTo(Games, { foreignKey: 'gameId' });
Sessions.belongsTo(GMs, { foreignKey: 'gmId' });
Sessions.belongsToMany(Players, { through: 'session_players' });



export default Sessions;
