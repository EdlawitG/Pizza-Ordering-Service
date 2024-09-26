"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pizza_toppings", {
      pizza_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: "pizza", // Assumes `pizzas` table already exists
          key: "id",
        },
        onDelete: "CASCADE", // Deletes associated entries in `pizza_toppings` if a pizza is deleted
        onUpdate: "CASCADE",
      },
      topping_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: "toppings",
          key: "id",
        },
        onDelete: "CASCADE", // Deletes associated entries in `pizza_toppings` if a topping is deleted
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
