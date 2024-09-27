'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create the `restaurants` table
    await queryInterface.createTable('restaurants', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      phonenumber:{
        type:Sequelize.STRING,
        allowNull:false
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the `restaurants` table
    await queryInterface.dropTable('restaurants');
  }
};
