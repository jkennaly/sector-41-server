import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const FactionType = sequelize.define('FactionType', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

FactionType.associate = function(models) {
  // Associations can be defined here, depending on the relations with other models
  FactionType.hasMany(models.Faction, { foreignKey: 'typeId' });
};

export default FactionType;
