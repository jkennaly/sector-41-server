import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../db/sequelize.js';

export const LoreObject = sequelize.define('LoreObject', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  lore: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Games', // 'games' refers to the table name
      key: 'id',
    },
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // 'users' refers to the table name
      key: 'id',
    },
  },
  sourceType: {
    type: DataTypes.ENUM,
    values: ['player', 'gm', 'generator'],
    allowNull: false,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  params: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
    sourceId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'SourceReferences',
        key: 'id',
      },
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twist: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  
  LoreObject.associate = function(models) {
    LoreObject.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false, scope: { source: 'LoreObject' } });
    LoreObject.belongsTo(models.Users, { foreignKey: 'creatorId' });
    LoreObject.belongsTo(models.Games, { foreignKey: 'gameId' });
  };
  
  export default LoreObject;