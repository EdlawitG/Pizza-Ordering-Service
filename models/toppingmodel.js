const { Model, DataTypes, sequelize } = require("sequelize");
const Pizza = require("./pizzamodel");
module.exports = (sequelize, DataTypes) => {
  class Topping extends Model {
    static associate(models) {
      Topping.belongsToMany(models.Pizza, {
        through: "pizza_toppings",
        foreignKey: "topping_id",
      });
    }
  }
  Topping.init(
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
    },
    {
      sequelize,
      modelName: "Topping",
      tableName: "toppings",
      timestamps: false,
    }
  );
  return Topping;
};
