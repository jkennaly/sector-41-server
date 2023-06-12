import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../db/sequelize.js';

export const Portrait = sequelize.define('Portrait', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  personalDataFileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PersonalDataFiles',
      key: 'id',
    },
  },
});


Portrait.associate = function(models) {
  Portrait.belongsTo(models.PersonalDataFile, { foreignKey: 'personalDataFileId' });
  Portrait.hasOne(models.S3Image, { foreignKey: 'imageId' })
};

export default Portrait;
