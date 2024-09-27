const Permission = require("../models/permissionmodel.js");
const Role_Permissions = require("../models/role_permissions");
const { Sequelize } = require("sequelize");

const db = require("../models/index");
async function getPermissionsForRole(roleId) {
  const rolePermissions = await RolePermission.findAll({
    where: { role_id: roleId },
    include: Permissions,
  });
  const permissionNames = rolePermissions.map((rp) => rp.Permission.action);
  return permissionNames;
}
async function assignPermissionsToRole(roleId, permissionNames) {
  if (!Array.isArray(permissionNames)) {
    throw new Error("permissionNames should be an array");
  }
  // Extract the actions from the array of objects
  const actionNames = permissionNames.map((permission) => permission.action);

  const permissions = await db.Permission.findAll({
    where: {
      action: {
        [Sequelize.Op.in]: actionNames, // actionNames is now an array of strings
      },
    },
  });

  const existingRolePermissions = await db.Role_Permissions.findAll({
    where: {
      role_id: roleId,
      permission_id: {
        [Sequelize.Op.in]: permissions.map((permission) => permission.id),
      },
    },
  });
  const existingPermissionIds = existingRolePermissions.map(
    (rp) => rp.permission_id
  );
  const newPermissions = permissions.filter(
    (permission) => !existingPermissionIds.includes(permission.id)
  );
  const rolePermissions = await Promise.all(
    newPermissions.map((permission) =>
      db.Role_Permissions.create({
        role_id: roleId,
        permission_id: permission.id,
      })
    )
  );

  return {
    message: "New permissions assigned to role successfully",
    rolePermissions,
  };
}

module.exports = { getPermissionsForRole, assignPermissionsToRole };
