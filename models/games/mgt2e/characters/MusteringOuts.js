import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const MusteringOuts = sequelize.define('MusteringOuts', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  rollCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cashRolls: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cashModifier: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cashGained: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
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
  lifePathId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'LifePaths',
      key: 'id',
    },
  },
});

MusteringOuts.associate = function(models) {
    MusteringOuts.belongsTo(models.LifePaths, { foreignKey: 'lifePathId' });
    MusteringOuts.belongsTo(models.Characters, { foreignKey: 'ownerId' });
    MusteringOuts.hasMany(models.Effects, { as: 'effects', foreignKey: 'termId', scope: { termType: 'MusteringOuts' } });
};

export default MusteringOuts;
