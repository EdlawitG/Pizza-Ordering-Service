const { Model, DataTypes, sequelize } = require("sequelize");
const Pizza = require("./pizza");
const Topping = require("./toppingmodel");

class Pizza_Topping extends Model {}

Pizza_Topping.init(
  {
    pizza_id: {
      type: DataTypes.UUIDV4,
      references: {
        model: Pizza,
        key: id,
      },
    },
    topping_id: {
      type: DataTypes.UUIDV4,
      references: {
        model: Topping,
        key: id,
      }
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Pizza_Topping",
    tableName: "pizza_toppings",
    timestamps: false,
  }
);
module.exports = Pizza_Topping;
