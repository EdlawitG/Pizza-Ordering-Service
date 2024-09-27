const hashPassword = require("../middleware/hashPassword");
const fs = require("fs");
const { z } = require("zod");
const cloudinary = require("../config/cloudinary");
const { defineSuperadminAbilities } = require("../service/ability");
const db = require("../models/index");
const superAdminSchema = require("../validation/superadminSchema");
const { assignPermissionsToRole } = require("../service/permission");
const createSuperadminAndRestaurant = async (req, res) => {
  const parsedData = superAdminSchema.parse(req.body);
  try {
    const { adminName, email, password, phonenumber, restaurantName, address } =
      parsedData;
    const hashedPassword = await hashPassword(password);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const logoPath = req.file.path;
    const uploader = async (path) => await cloudinary.uploads(path, "Images");
    const logoUrl = await uploader(logoPath);
    fs.unlinkSync(logoPath);

    const existingResturant = await db.Restaurant.findOne({
      where: { name: restaurantName },
    });
    if (existingResturant) {
      return res.status(400).json({ message: "Resturant already exists" });
    }
    const restaurant = await db.Restaurant.create({
      name: restaurantName,
      address,
      phonenumber,
      logo: logoUrl.url,
    });
    const role = await db.Role.create({
      name: "superAdmin",
      restaurant_id: restaurant.dataValues.id,
    });
    const existingAdmin = await db.Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const superadmin = await db.Admin.create({
      name: adminName,
      email,
      password: hashedPassword,
      role_id: role.dataValues.id,
    });
    const superadminPermissions = [
      { action: "see order" },
      { action: "update status" },
      { action: "see customer" },
      { action: "create role" },
      { action: "add users" },
    ];
    for (const permissionData of superadminPermissions) {
      let permission = await db.Permission.create(permissionData);
      await db.Role_Permissions.create({
        role_id: role.dataValues.id,
        permission_id: permission.dataValues.id,
      });
    }
    const q = await assignPermissionsToRole(
      role.dataValues.id,
      superadminPermissions
    );
    defineSuperadminAbilities();
    return res.status(201).json({
      message: "Superadmin and restaurant created successfully",
      superadmin: {
        name: superadmin.name,
        email: superadmin.email,
      },
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        location: restaurant.location,
        logo: restaurant.logo,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else if (error.name === "SequelizeValidationError") {
      return res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
};
module.exports = {
  createSuperadminAndRestaurant,
};
