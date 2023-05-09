import Sequelize from 'sequelize';
import sequelize from '../db/sequelize.js';

const { Games } = sequelize.models;

const Players = sequelize.define('Players', {
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
});

// Define many-to-many relationship with Games model
const PlayerGames = sequelize.define('PlayerGames', {});
Players.belongsToMany(Games, { through: PlayerGames });
Games.belongsToMany(Players, { through: PlayerGames });

export default Players;
