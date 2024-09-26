const { Model, DataTypes, sequelize } = require("sequelize");
class Restaurant extends Model {}

Restaurant.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    sequelize,
    modelName: "Restaurants",
    tableName: "restaurants",
    timestamps: false,
  }
);

module.exports = Restaurant;
