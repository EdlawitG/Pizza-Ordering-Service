const Role = require("./rolemodel");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {}
  }

  Admin.init(
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.UUID,
        references: {
          model: Role,
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "admins",
      timestamps: false,
    }
  );

  return Admin;
};
