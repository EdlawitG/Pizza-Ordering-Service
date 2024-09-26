const { Model, DataTypes, sequelize } = require("sequelize");
const Restaurant = require("./resturantmodel");

class Role extends Model {}

Role.init(
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
    resturant_id: {
      type: DataTypes.UUIDV4,
      references: {
        model: Restaurant,
        key: id,
      },
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: false,
  }
);

// Define the many-to-many relationship with Permission
Role.belongsToMany(Permission, { through: 'role_permissions', foreignKey: 'role_id' });
module.exports = Role;
