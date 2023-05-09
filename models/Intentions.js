import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Intentions = sequelize.define('intentions', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  deleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'intentions',
  engine: 'InnoDB',
});

export default Intentions;
