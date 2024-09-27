"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("permissions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("permissions");
  },
};
