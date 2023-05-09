import Sequelize from 'sequelize';
import sequelize from '../db/sequelize.js';


console.log('models: ', Object.keys(sequelize.models));
const { Players, Games, Gms } = sequelize.models;

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
Sessions.belongsTo(Gms, { foreignKey: 'gmId' });
Sessions.belongsToMany(Players, { through: 'session_players' });


export default Sessions;
