const userModel = require("../models/userModels");

const doctorModel = require("../models/doctorModel");

const getAllusersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Data Fetched Successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Users Data",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctor Data Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Fetching Doctors Data",
      error,
    });
  }
};

// approve Doctor
const approveDoctorController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    // Validate doctorId and status
    if (!doctorId || !["approved", "pending"].includes(status)) {
      return res.status(400).send({
        message: "Invalid doctorId or status",
        success: false,
      });
    }

    // Find and update the doctor
    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).send({
        message: "Doctor not found",
        success: false,
      });
    }

    // Find the associated user
    const user = await userModel.findById(doctor.userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    // Update user notifications
    user.notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has Been ${status}`,
      onclickPath: "/notification",
    });

    // Update user isDoctor status
    user.isDoctor = status === "approved";
    await user.save();

    // Respond with success
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while Approving doctor",
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllusersController,
  getAllDoctorsController,
  approveDoctorController,
};
