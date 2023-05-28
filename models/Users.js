import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER(6),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  credentials_version: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  },
  username: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  picture: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  salt: {
    type: DataTypes.STRING(120),
    defaultValue: null
  },
  hashedpw: {
    type: DataTypes.STRING(120),
    defaultValue: null
  },
  level: {
    type: DataTypes.STRING(30),
    defaultValue: null
  },
  count: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  },
  group: {
    type: DataTypes.STRING(4096),
    defaultValue: null
  },
  used_key: {
    type: DataTypes.STRING(10),
    defaultValue: null
  },
  public_key: {
    type: DataTypes.STRING(10),
    defaultValue: null
  },
  private_key: {
    type: DataTypes.STRING(10),
    defaultValue: null
  },
  credited: {
    type: DataTypes.INTEGER(11),
    defaultValue: null
  },
  all_keys: {
    type: DataTypes.STRING(14000),
    defaultValue: null
  },
  mobile_auth_key: {
    type: DataTypes.STRING(120),
    defaultValue: null
  },
  follows: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  blocks: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  credits: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  },
  access: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  interested: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  deleted: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: 0
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  realm: {
    type: DataTypes.STRING(45),
    defaultValue: null
  },
  password: {
    type: DataTypes.STRING(45),
    defaultValue: null
  },
  emailVerified: {
    type: DataTypes.INTEGER(1),
    defaultValue: null
  },
  verificationToken: {
    type: DataTypes.STRING(120),
    defaultValue: null
  },
  settings: {
    type: DataTypes.JSON,
    defaultValue: null
  }
}, {
  tableName: 'Users',
  engine: 'InnoDB',
  charset: 'utf8',
  collate: 'utf8_unicode_ci'
});

Users.associate = function(models) {
  Users.hasMany(models.Games, { as: 'gamesGMed', foreignKey: 'gmId' });
  Users.belongsToMany(models.Games, { through: 'GamePlayers', as: 'gamesPlayed', foreignKey: 'userId' });


  Users.hasMany(models.Sessions, { as: 'sessionsGMed', foreignKey: 'gmId' });
  Users.belongsToMany(models.Sessions, { through: 'SessionPlayers', as: 'sessionsPlayed', foreignKey: 'userId' });
}



export default Users;
