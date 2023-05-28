import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Finances = sequelize.define('Finances', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  monthlyShipPayments: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shipDebt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  otherDebt: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monthlyPension: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cashOnHand: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monthlyLivingCost: {
    type: DataTypes.INTEGER,
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
});

Finances.associate = function(models) {
  Finances.belongsTo(models.Characters, { foreignKey: 'ownerId' });
};

export default Finances;
