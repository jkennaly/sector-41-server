import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const MessagesMonitor = sequelize.define('messages_monitor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  message: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'messages_monitor',
  underscored: true,
  timestamps: false
});

export default MessagesMonitor;
