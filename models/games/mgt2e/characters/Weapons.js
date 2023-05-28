import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Weapon = sequelize.define('Weapon', {
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
  Damage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Mass: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  MagazineSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  MagazineCurrent: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  MagazineCost: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Range: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Traits: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  sourceId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'SourceReferences',
      key: 'id',
    },
  },
});

Weapon.associate = function(models) {
  Weapon.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false });
};

export default Weapon;
