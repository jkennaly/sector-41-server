import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const CareerTerms = sequelize.define('CareerTerms', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  term: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  finishingRank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  howEntered: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  advanced: {
    type: DataTypes.BOOLEAN,
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

CareerTerms.associate = function(models) {
    CareerTerms.belongsTo(models.LifePaths, { foreignKey: 'lifePathId' });
    CareerTerms.belongsTo(models.Characters, { foreignKey: 'ownerId' });
  CareerTerms.hasMany(models.Connections, { as: 'connections', foreignKey: 'termId', scope: { termType: 'CareerTerms' } });
  CareerTerms.hasMany(models.Effects, { as: 'effects', foreignKey: 'termId', scope: { termType: 'CareerTerms' } });
};

export default CareerTerms;
