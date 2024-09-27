const { User } = require("../models/User"); // Adjust path if necessary
const bcrypt = require("bcrypt");
const userSchema = require("../validation/userSchema");
const hashPassword = require("../middleware/hashPassword");


const createUser = async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const hashedPassword = await hashPassword(validatedData.password);
    const user = await User.create({
      ...validatedData,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "created_at"],
    });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "created_at"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const validatedData = userSchema.partial().parse(req.body);
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (validatedData.password) {
      validatedData.password = await hashPassword(validatedData.password);
    }

    await user.update(validatedData);

    return res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
