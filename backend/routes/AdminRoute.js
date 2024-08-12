const express = require("express");
const authMidddleware = require("../middlewares/authMidddleware");
const {
  getAllusersController,
  getAllDoctorsController,
  approveDoctorController,
  toggleBlockStatus,
} = require("../controllers/AdminCtrl");
const router = express.Router();

router.get("/getAllUsers", authMidddleware, getAllusersController);

router.get("/getAllDoctors", authMidddleware, getAllDoctorsController);

router.post("/approveDoctor", authMidddleware, approveDoctorController);

router.post("/block", authMidddleware, toggleBlockStatus);
module.exports = router;
