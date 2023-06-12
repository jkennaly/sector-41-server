import { DataTypes } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

export const SubdivisionContext = sequelize.define('SubdivisionContext', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  prompt: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  scale: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Galaxy',
  },
  uwp: {
    type: DataTypes.STRING,
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
  superId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'SubdivisionContexts', // name of your model for games
      key: 'id',
    },
  },
});

SubdivisionContext.associate = function(models) {
    SubdivisionContext.belongsTo(models.Games, {
      foreignKey: 'gameId',
      as: 'game', 
    });
    SubdivisionContext.belongsTo(models.Users, {
      foreignKey: 'creatorId',
      as: 'creator', 
    });
    SubdivisionContext.belongsTo(models.UniverseContext, {
      foreignKey: 'universeId',
      as: 'universe', 
    });
    SubdivisionContext.belongsTo(models.SubdivisionContext, {
      foreignKey: 'superId',
      as: 'super', 
    });
};

export default SubdivisionContext;
