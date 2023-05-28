import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../../../db/sequelize.js';

const Skills = sequelize.define('Skills', {
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
  level: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  parentSkillId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Skills',
      key: 'id',
    },
  },
  specializations: {
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

Skills.associate = function(models) {
  Skills.belongsTo(Skills, { as: 'parentSkill', foreignKey: 'parentSkillId' });
  Skills.belongsTo(models.SourceReferences, { as: 'source', foreignKey: 'sourceId', constraints: false });
};

export default Skills;
