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
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ['alias'],
      name: 'alias'
    }
  ]
});

export default Users;
