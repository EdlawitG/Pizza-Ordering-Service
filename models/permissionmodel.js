// models/Permission.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Permission extends Model {
    static associate(models) {
      Permission.belongsToMany(models.Role, {
        through: 'role_permissions',
        foreignKey: 'permission_id',
      });
    }
  }

  Permission.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions',
    timestamps: false,
  });

  return Permission;
};
