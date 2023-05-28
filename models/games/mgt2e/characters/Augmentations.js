import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Augmentations = sequelize.define('Augmentations', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tl: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mass: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  effects: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  limitations: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sourceId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'SourceReferences',
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
});

Augmentations.associate = function(models) {
  Augmentations.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false, scope: { source: 'Augmentations' } });
  Augmentations.belongsTo(models.Characters, { foreignKey: 'ownerId' });
};

export default Augmentations;
