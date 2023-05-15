'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GamePlayers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Games',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Adding a unique constraint for gameId and userId to prevent duplicates
    await queryInterface.addConstraint('GamePlayers', {
      fields: ['gameId', 'userId'],
      type: 'unique',
      name: 'gameplayer_unique_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('GamePlayers', 'gameplayer_unique_constraint');
    await queryInterface.dropTable('GamePlayers');
  }
};
