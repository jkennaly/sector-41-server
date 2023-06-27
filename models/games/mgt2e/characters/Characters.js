import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Characters = sequelize.define('Characters', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sourceId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'SourceReferences',
      key: 'id',
    },
  },
  history: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  location: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  coreCharacteristicsId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'CoreCharacteristics',
      key: 'id',
    },
  },
  financesId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Finances',
      key: 'id',
    },
  },
  personalDataFileId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'PersonalDataFiles',
      key: 'id',
    },
  },
  ownerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // assuming your User model is named 'Users' in the database
      key: 'id',
    },
  },
});

Characters.associate = function(models) {
  Characters.belongsTo(models.Users, { as: 'player', foreignKey: 'ownerId' });
  Characters.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false });
  Characters.hasMany(models.Armors, { as: 'armor', foreignKey: 'characterId' });
  Characters.hasMany(models.Augmentations, { as: 'augmentations', foreignKey: 'characterId' });
  Characters.belongsTo(models.CoreCharacteristics, { as: 'coreCharacteristics', foreignKey: 'coreCharacteristicsId' });
  Characters.hasMany(models.Equipment, { as: 'equipment', foreignKey: 'characterId' });
  Characters.belongsTo(models.Finances, { as: 'finances', foreignKey: 'financesId' });
  Characters.hasMany(models.LifePaths, { as: 'lifePaths', foreignKey: 'ownerId' });
  Characters.belongsTo(models.PersonalDataFile, { as: 'personalDataFile', foreignKey: 'personalDataFileId' });
  Characters.hasMany(models.SkillSets, { as: 'skills', foreignKey: 'characterId' });
  Characters.hasMany(models.Weapons, { as: 'weapons', foreignKey: 'characterId' });
  Characters.hasMany(models.Associates, { as: 'associates', foreignKey: 'ownerId' });
};

export default Characters;
