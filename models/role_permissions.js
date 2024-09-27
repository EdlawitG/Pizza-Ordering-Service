const Permission = require("./permissionmodel");
const Role = require("./rolemodel");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Role_Permissions = sequelize.define('Role_Permissions', 
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.UUID,
        // reference: {
        //   model: Role,
        //   key: "id",
        // },
      },
      permission_id: {
        type: DataTypes.UUID,
        // reference: {
        //   model: Permission,
        //   key: "id",
        // },
      },
    },
    {
      sequelize,
      modelName: "Role_Permissions",
      tableName: "role_permissions",
      timestamps: false,
    }
  );
  return Role_Permissions;
};

