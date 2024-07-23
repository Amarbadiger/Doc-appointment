const doctorModel = require("../models/doctorModel");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Doctor data fetched successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching Doctor Details",
    });
  }
};

const updateDoctorInfoController = async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: userId },
      updateData
    );
    res.status(200).send({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating Doctor Details",
    });
  }
};

module.exports = { getDoctorInfoController, updateDoctorInfoController };
