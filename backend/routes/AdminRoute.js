const express = require("express");
const authMidddleware = require("../middlewares/authMidddleware");
const {
  getAllusersController,
  getAllDoctorsController,
} = require("../controllers/AdminCtrl");
const router = express.Router();

router.get("/getAllUsers", authMidddleware, getAllusersController);

router.get("/getAllDoctors", authMidddleware, getAllDoctorsController);

module.exports = router;
