const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
} = require("../controllers/userCtrl");
const authMidddleware = require("../middlewares/authMidddleware");

//Router Object
const router = express.Router();

//Routes

//Login || POST
router.post("/login", loginController);

//Register || POST
router.post("/register", registerController);

//Home Page || Auth
router.post("/getUserData", authMidddleware, authController);

//Apply Doctor || POST
router.post("/apply-doctor", authMidddleware, applyDoctorController);

module.exports = router;
