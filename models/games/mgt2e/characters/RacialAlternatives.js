// RacialAlternatives Model
import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const RacialAlternatives = sequelize.define('RacialAlternatives', {
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
    coreCharacteristicsId: {
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
  
  RacialAlternatives.associate = function(models) {
    RacialAlternatives.belongsTo(models.CoreCharacteristics, { foreignKey: 'coreCharacteristicsId' });
    RacialAlternatives.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false, scope: { source: 'RacialAlternatives' } });
  };
  
  export default RacialAlternatives;