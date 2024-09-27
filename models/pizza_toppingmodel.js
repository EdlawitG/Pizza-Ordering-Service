const { Model, DataTypes, sequelize } = require("sequelize");
const Pizza = require("./pizzamodel");
const Topping = require("./toppingmodel");
module.exports = (sequelize, DataTypes) => {
  class Pizza_Topping extends Model {
    static associate(models) {}
  }
  Pizza_Topping.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      pizza_id: {
        type: DataTypes.UUIDV4,
        references: {
          model: Pizza,
          key: "id",
        },
      },
      topping_id: {
        type: DataTypes.UUIDV4,
        references: {
          model: Topping,
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Pizza_Topping",
      tableName: "pizza_toppings",
      timestamps: false,
    }
  );
  return Pizza_Topping;
};
