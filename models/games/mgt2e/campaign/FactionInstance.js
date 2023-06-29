import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const FactionInstance = sequelize.define('FactionInstance', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  factionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Faction',
      key: 'id',
    },
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentPower: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentLeader: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  relationships: {
    type: DataTypes.TEXT,  // or JSON type, if suitable
    allowNull: true,
  },
  assets: {
    type: DataTypes.TEXT,  // or JSON type, if suitable
    allowNull: true,
  },
  events: {
    type: DataTypes.TEXT,  // or JSON type, if suitable
    allowNull: true,
  },
});

FactionInstance.associate = function(models) {
  // Associations can be defined here, depending on the relations with other models
  FactionInstance.belongsTo(models.Faction, { foreignKey: 'factionId' });
  //FactionInstance.belongsTo(models.Campaigns, { foreignKey: 'campaignId' });
};

export default FactionInstance;
