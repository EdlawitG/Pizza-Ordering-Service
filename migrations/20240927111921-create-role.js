"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the `roles` table
    await queryInterface.createTable("roles", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resturant_id: {
        
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
        references: {
          model: "restaurants",
          key: "id",
        },
          onDelete: "CASCADE", 
          onUpdate: "CASCADE",
      
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("roles");
  },
};
