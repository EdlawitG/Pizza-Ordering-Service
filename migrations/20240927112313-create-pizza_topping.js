"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pizza_toppings", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      pizza_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'pizza',
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      topping_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'toppings',
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    // Drop the `restaurants` table
    await queryInterface.dropTable("pizza_toppings");
  },
};
