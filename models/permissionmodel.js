const { Model, DataTypes, sequelize } = require("sequelize");
const Role = require('./role');

class Permission extends Model {}

Permission.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'Permission',
  tableName: 'permissions',
  timestamps: false
});
Permission.belongsToMany(Role, { through: 'role_permissions', foreignKey: 'permission_id' });
module.exports = Permission;
