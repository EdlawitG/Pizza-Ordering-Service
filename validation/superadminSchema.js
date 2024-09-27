const { z } = require("zod");
const superAdminSchema = z.object({
  adminName: z.string().min(1, "Admin name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phonenumber: z.string().min(10, "Phone number must be valid"),
  restaurantName: z.string().min(1, "Restaurant name is required"),
  address: z.string().min(1, "Location is required"),
});

module.exports = superAdminSchema;
