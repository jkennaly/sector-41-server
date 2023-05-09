import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const InteractionTypes = sequelize.define('InteractionTypes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  deleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'interaction_types',
  timestamps: false,
});

export default InteractionTypes;
