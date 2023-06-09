import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const PreCareerTerms = sequelize.define('PreCareerTerms', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  graduated: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  honored: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  commissioned: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  skillsAdded: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  entryAttempted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  graduationAttempted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  event: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  skillsSelected: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
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

PreCareerTerms.associate = function(models) {
    PreCareerTerms.belongsTo(models.LifePaths, { foreignKey: 'lifePathId' });
  PreCareerTerms.belongsTo(models.Characters, { foreignKey: 'ownerId' });
  PreCareerTerms.hasMany(models.Connections, { as: 'connections', foreignKey: 'termId', scope: { termType: 'PreCareerTerms' } });
  PreCareerTerms.hasMany(models.Effects, { as: 'effects', foreignKey: 'termId', scope: { termType: 'PreCareerTerms' } });
};

export default PreCareerTerms;
