const express = require("express");
const upload = require("../config/multer");
const {
  createSuperadminAndRestaurant,
  loginAdmins,
} = require("../controllers/superadmin-controller");
const router = express.Router();

router.post(
  "/register-admin",
  upload.single("logo"),
  createSuperadminAndRestaurant
);
router.post("login-admins", loginAdmins);
module.exports = router;
