import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Associates = sequelize.define('Associates', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  origin: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Characters',
      key: 'id',
    },
  },
  association: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Associates.associate = function(models) {
  Associates.belongsTo(models.Characters, { foreignKey: 'ownerId' });
  };

export default Associates;
