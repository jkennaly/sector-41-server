import { DataTypes } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

export const UniverseContext = sequelize.define('UniverseContext', {
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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
});

UniverseContext.associate = function(models) {
    UniverseContext.belongsTo(models.Games, {
      foreignKey: 'gameId',
      as: 'game', 
    });
    UniverseContext.belongsTo(models.Users, {
      foreignKey: 'creatorId',
      as: 'creator', 
    });
};

export default UniverseContext;
