'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Games', 'playerExperiencePreference', {
      type: Sequelize.ENUM('Beginner-friendly', 'Intermediate', 'Advanced'),
      allowNull: true,
    });

    await queryInterface.addColumn('Games', 'additionalNotes', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Games', 'playerExperiencePreference');
    await queryInterface.removeColumn('Games', 'additionalNotes');
  },
};
