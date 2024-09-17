"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Remove 'created_at' column
    await queryInterface.removeColumn("users", "created_at");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "password");

    // Add 'created_at' column back
    await queryInterface.addColumn("users", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
