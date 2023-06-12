import { DataTypes } from 'sequelize';
import sequelize from '../../../db/sequelize.js';

export const FeatureContext = sequelize.define('FeatureContext', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // name of your model for games
      key: 'id',
    },
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Games', // name of your model for games
      key: 'id',
    },
  },
  universeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'UniverseContexts', // name of your model for games
      key: 'id',
    },
  },
  subdivisionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'SubdivisionContexts', // name of your model for games
      key: 'id',
    },
  },
});

FeatureContext.associate = function(models) {
    FeatureContext.belongsTo(models.Games, {
      foreignKey: 'gameId',
      as: 'game', 
    });
    FeatureContext.belongsTo(models.Users, {
      foreignKey: 'creatorId',
      as: 'creator', 
    });
    FeatureContext.belongsTo(models.UniverseContext, {
      foreignKey: 'universeId',
      as: 'universe', 
    });
    FeatureContext.belongsTo(models.SubdivisionContext, {
      foreignKey: 'subdivisionId',
      as: 'sub', 
    });
};

export default FeatureContext;
