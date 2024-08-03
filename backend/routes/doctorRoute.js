const express = require("express");
const {
  getDoctorInfoController,
  updateDoctorInfoController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorctrl");
const authMidddleware = require("../middlewares/authMidddleware");
const router = express.Router();

router.post("/getDoctorInfo", authMidddleware, getDoctorInfoController);

router.post("/updateDoctorInfo", authMidddleware, updateDoctorInfoController);

router.post("/getDoctorById", authMidddleware, getDoctorByIdController);

router.get(
  "/doctor-appointments",
  authMidddleware,
  doctorAppointmentsController
);

//POST Update Status
router.post("/update-status", authMidddleware, updateStatusController);

module.exports = router;
