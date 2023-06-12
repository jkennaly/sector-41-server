import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const PersonalDataFile = sequelize.define('PersonalDataFile', {
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
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeworld: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  distinguishingFeatures: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  traits: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  currentPortraitId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Portraits',
      key: 'id',
    },
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Characters',
      key: 'id',
    },
  },
  backgroundNotes: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

PersonalDataFile.associate = function(models) {
  PersonalDataFile.belongsTo(models.Characters, { foreignKey: 'ownerId' });
  PersonalDataFile.belongsTo(models.Portrait, { as: 'currentPortrait', foreignKey: 'currentPortraitId' });
};

export default PersonalDataFile;
