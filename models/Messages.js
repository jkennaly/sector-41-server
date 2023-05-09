import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Message = sequelize.define('Messages', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  fromuser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  touser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: -1,
  },
  subject: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  base_message: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  tableName: 'messages',
  timestamps: false,
  indexes: [
    {
      name: 'users',
      fields: ['fromuser', 'touser'],
    },
    {
      name: 'subject_type',
      fields: ['subject_type', 'subject', 'message_type'],
    },
  ],
});

export default Message;
