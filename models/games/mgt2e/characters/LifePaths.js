import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const LifePaths = sequelize.define('LifePaths', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  finalAge: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  term: {
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
});

LifePaths.associate = function(models) {
  LifePaths.belongsTo(models.Characters, { foreignKey: 'ownerId' });
  LifePaths.hasOne(models.CareerTerms, { as: 'careerTerms', foreignKey: 'lifePathId' });
  LifePaths.hasOne(models.PreCareerTerms, { as: 'preCareerTerms', foreignKey: 'lifePathId' });
  LifePaths.hasOne(models.MusteringOuts, { as: 'musteringOut', foreignKey: 'lifePathId' });
};

export default LifePaths;
