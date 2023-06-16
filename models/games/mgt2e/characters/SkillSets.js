import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const SkillSets = sequelize.define('SkillSets', {
  changes: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Characters',
      key: 'id',
    },
  },

});

SkillSets.associate = function(models) {
  SkillSets.belongsTo(models.Characters, { as: 'character', foreignKey: 'characterId' });
};

export default SkillSets;
