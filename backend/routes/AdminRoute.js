const express = require("express");
const authMidddleware = require("../middlewares/authMidddleware");
const {
  getAllusersController,
  getAllDoctorsController,
  approveDoctorController,
} = require("../controllers/AdminCtrl");
const router = express.Router();

router.get("/getAllUsers", authMidddleware, getAllusersController);

router.get("/getAllDoctors", authMidddleware, getAllDoctorsController);

router.post("/approveDoctor", authMidddleware, approveDoctorController);

module.exports = router;
