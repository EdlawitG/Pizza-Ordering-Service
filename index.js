const express = require("express");
const { config } = require("dotenv");
const cors = require("cors");
const path = require('path'); // To handle file paths
const fs = require('fs'); // To handle file system operations
const AdminRoute = require("./routes/adminRoutes");
const { sequelize } = require("./models/index");
config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(AdminRoute);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const PORT = process.env.PORT || 5000;

const connectDb = async () => {
  console.log("Checking database connection...");

  try {
    await sequelize.authenticate();
    console.log("Database connection established.");
  } catch (e) {
    console.log("Database connection failed", e);
    process.exit(1);
  }
};

(async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`port is listening http://localhost:${PORT}`);
  });
})();
