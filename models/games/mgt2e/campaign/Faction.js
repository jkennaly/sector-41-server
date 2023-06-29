import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Faction = sequelize.define('Faction', {
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
  alignment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startingSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startingPower: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  technologyLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  homeworld: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  leadership: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'FactionTypes',
      key: 'id',
    },
  },
});

Faction.associate = function(models) {
  // Associations can be defined here, depending on the relations with other models
  Faction.belongsTo(models.FactionType, { foreignKey: 'typeId' });
  Faction.hasMany(models.FactionInstance, { foreignKey: 'factionId' });
};

export default Faction;
