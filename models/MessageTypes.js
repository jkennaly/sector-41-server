import sequelize from '../db/sequelize.js';
import { DataTypes } from 'sequelize';

const MessageTypes = sequelize.define('message_types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  center: {
    type: DataTypes.INTEGER,
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
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'message_types',
  timestamps: false,
});

export default MessageTypes;
