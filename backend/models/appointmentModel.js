const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // References the 'users' collection
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // References the 'users' collection
      required: true,
    },
    doctorInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // References the 'users' collection
      required: true,
    },
    userInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // References the 'users' collection
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);

module.exports = appointmentModel;
