const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Restaurant extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  Restaurant.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Restaurant', // Ensure this matches the model name used in index.js
      tableName: 'restaurants',
      timestamps: false,
    }
  );

  return Restaurant;
};
