import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const ArmorOptions = sequelize.define('ArmorOptions', {
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
    armorId: {
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
  
  
  ArmorOptions.associate = function(models) {
    ArmorOptions.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false, scope: { source: 'ArmorOptions' } });
  ArmorOptions.belongsTo(models.Armors, { foreignKey: 'armorId' });
  };

  export default ArmorOptions;