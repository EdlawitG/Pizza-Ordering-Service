const { Model, DataTypes, sequelize } = require("sequelize");
const Pizza = require('./pizza');

class Topping extends Model {}

Topping.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Topping',
  tableName: 'toppings',
  timestamps: false
});
Topping.belongsToMany(Pizza, { through: 'pizza_toppings', foreignKey: 'topping_id' });

module.exports = Topping;
