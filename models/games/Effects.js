import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../db/sequelize.js';

export const Effects = sequelize.define('Effects', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  effects: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  appliedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  sourceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'SourceReferences',
      key: 'id',
    },
  },
  description: {
    type: DataTypes.STRING,
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
});

Effects.associate = function(models) {
  Effects.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false, scope: { source: 'Effects' } });
  Effects.belongsTo(models.Characters, { foreignKey: 'ownerId' });
};

export default Effects;
