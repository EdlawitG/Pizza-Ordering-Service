const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Pizza = require("./pizzamodel");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    pizza_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Pizza,
        key: "id",
      },
    },
    topping_ids: {
      type: DataTypes.ARRAY(DataTypes.UUID), // Use UUID instead of UUIDV4
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Preparing", "Ready", "Delivered"),
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Order;
