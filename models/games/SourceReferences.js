import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../db/sequelize.js';

export const SourceReferences = sequelize.define('SourceReferences', {
    
  page: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  book: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  });

export default SourceReferences