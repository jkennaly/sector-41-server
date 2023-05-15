'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SessionPlayers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      sessionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sessions',
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

    // Adding a unique constraint for sessionId and userId to prevent duplicates
    await queryInterface.addConstraint('SessionPlayers', {
      fields: ['sessionId', 'userId'],
      type: 'unique',
      name: 'sessionplayer_unique_constraint'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('SessionPlayers', 'sessionplayer_unique_constraint');
    await queryInterface.dropTable('SessionPlayers');
  }
};
