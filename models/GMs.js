import Sequelize from 'sequelize';
import sequelize from '../db/sequelize.js';
import Games from './Games.js';

const GMs = sequelize.define('GMs', {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

GMs.hasMany(Games);
Games.belongsTo(GMs);

export default GMs;
