const express = require("express");
const {
  getDoctorInfoController,
  updateDoctorInfoController,
} = require("../controllers/doctorctrl");
const authMidddleware = require("../middlewares/authMidddleware");
const router = express.Router();

router.post("/getDoctorInfo", authMidddleware, getDoctorInfoController);

router.post("/updateDoctorInfo", authMidddleware, updateDoctorInfoController);

module.exports = router;
