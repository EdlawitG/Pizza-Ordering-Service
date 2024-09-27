const { AbilityBuilder, createMongoAbility } = require('@casl/ability');
const { getPermissionsForRole } = require('./permission');

async function defineAbilitiesForRole(roleId) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility); // Updated to use createMongoAbility
  const permissions = await getPermissionsForRole(roleId);

  permissions.forEach(permission => {
    switch (permission.action) {
      case "see order":
        can('read', 'Order');
        break;
      case "update status":
        can('update', 'Order');
        break;
      case "see customer":
        can('read', 'Customer');
        break;
      case "create role":
        can('create', 'Role');
        break;
      case "add users":
        can('create', 'Admin');
        break;
      default:
        break;
    }
  });

  // Return the built ability object
  return build();
}

function defineSuperadminAbilities() {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility); // Updated to use createMongoAbility

  can('manage', 'all');  // Superadmin can manage everything
  return build();
}

module.exports = {
  defineSuperadminAbilities,
  defineAbilitiesForRole,
};
