const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
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

// notification
router.post(
  "/get-all-notification",
  authMidddleware,
  getAllNotificationController
);

// delete notification
router.post(
  "/delete-all-notification",
  authMidddleware,
  deleteAllNotificationController
);

// Get all Doc
router.get("/getAllDoctors", authMidddleware, getAllDocotrsController);

module.exports = router;
