import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Users = sequelize.define('UserAliases', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  alias: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'user_aliases',
  engine: 'InnoDB',
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
});

export default Users;
