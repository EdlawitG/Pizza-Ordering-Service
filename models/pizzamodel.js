const { Model, DataTypes, sequelize } = require("sequelize");
const Topping = require("./topping");

class Pizza extends Model {}

Pizza.init(
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    pizzaphoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Pizza",
    tableName: "pizzas",
    timestamps: false,
  }
);
Pizza.belongsToMany(Topping, {
  through: "pizza_toppings",
  foreignKey: "pizza_id",
});

module.exports = Pizza;
