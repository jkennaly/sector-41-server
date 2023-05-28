import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Connections = sequelize.define('Connections', {
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
  linkedCharacterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Characters',
      key: 'id',
    },
  },
});

Connections.associate = function(models) {
  Connections.belongsTo(models.Characters, { foreignKey: 'ownerId' });
  Connections.belongsTo(models.Characters, { foreignKey: 'linkedCharacterId', as: 'linkedCharacter' });
};

export default Connections;
