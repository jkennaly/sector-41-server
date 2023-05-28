import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Armors = sequelize.define('Armors', {
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
    protection: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tl: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    radiation: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mass: {
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
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Characters',
        key: 'id',
      },
    },
  });
  
  Armors.associate = function(models) {
    Armors.hasMany(models.ArmorOptions, { as: 'options', foreignKey: 'armorId', onDelete: 'CASCADE' });
    Armors.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false, scope: { source: 'Armors' } });
  Armors.belongsTo(models.Characters, { foreignKey: 'ownerId' });
  };
  
  export default Armors;