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
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
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
};

export default Portrait;
