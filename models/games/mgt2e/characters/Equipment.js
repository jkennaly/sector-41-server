import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Equipment = sequelize.define('Equipment', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mass: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tl: {
    type: DataTypes.INTEGER,
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

Equipment.associate = function(models) {
  Equipment.hasMany(models.EquipmentTraits, { as: 'traits', foreignKey: 'equipmentId', onDelete: 'CASCADE' });
  Equipment.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false, scope: { source: 'Equipment' } });
  Equipment.belongsTo(models.Characters, { foreignKey: 'ownerId' });
};

export default Equipment;
