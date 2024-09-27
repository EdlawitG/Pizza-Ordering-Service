'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("orders", "topping_ids", {
      type: Sequelize.ARRAY(Sequelize.UUID),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'topping_ids');
  },
};
