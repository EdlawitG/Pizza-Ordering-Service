const { Model, DataTypes, sequelize } = require("sequelize");
const Permission = require('./permissionmodel');
const Role = require('./rolemodel');

class Role_Permissions extends Model {}

Role.init({
  role_id: {
    type: DataTypes.UUIDV4,
    reference:{
        model: Role,
        key: id,
    }
  },
  permission_id: {
    type: DataTypes.UUIDV4,
    reference:{
        model: Permission,
        key:id
    }
  }
}, {
  sequelize,
  modelName: 'Role_Permissions',
  tableName: 'role_permissions',
  timestamps: false
});
module.exports = Role_Permissions;
