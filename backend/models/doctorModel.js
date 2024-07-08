const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    website: {
      type: String,
    },
    clinicAddress: {
      type: String,
      required: [true, "Clinic address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    feesPerConsultation: {
      type: Number,
      required: [true, "fee is required"],
    },
    timings: {
      type: Object,
      required: [true, "time is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const doctorModel = mongoose.model("Doctor", doctorSchema);

module.exports = doctorModel;
