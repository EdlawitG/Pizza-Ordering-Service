const { Model, DataTypes, sequelize } = require("sequelize");
const Topping = require("./toppingmodel");
module.exports = (sequelize, DataTypes) => {
  class Pizza extends Model {
    static associate(models) {
      Pizza.belongsToMany(models.Topping, {
        through: "pizza_toppings",
        foreignKey: "pizza_id",
      });
    }
  }
  Pizza.init(
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
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      pizzaphoto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Pizza",
      tableName: "pizzas",
      timestamps: false,
    }
  );


  return Pizza;
};
