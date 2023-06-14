import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const CoreCharacteristics = sequelize.define('CoreCharacteristics', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  strength: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dexterity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  endurance: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  intelligence: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  education: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  socialStanding: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  psionics: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Characters',
      key: 'id',
    },
  },
});

CoreCharacteristics.associate = function(models) {
  CoreCharacteristics.belongsTo(models.Characters, { foreignKey: 'ownerId' });
};

export default CoreCharacteristics;
