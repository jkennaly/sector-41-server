
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';


// EquipmentTraits Model
const EquipmentTraits = sequelize.define('EquipmentTraits', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  effect: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  equipmentId: {
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
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

EquipmentTraits.associate = function(models) {
  EquipmentTraits.belongsTo(models.Equipment, { foreignKey: 'equipmentId' });
  EquipmentTraits.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false, scope: { source: 'EquipmentTraits' } });
};

export default EquipmentTraits;
