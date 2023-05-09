import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Interactions = sequelize.define('Interactions', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subject_type: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subject: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'interactions',
  timestamps: false
});

export default Interactions;
