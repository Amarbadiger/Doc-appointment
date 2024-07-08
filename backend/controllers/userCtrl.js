const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");

// Register Controller
const registerController = async (req, res) => {
  try {
    // Check if the user already exists in the database
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      // If user exists, return a response indicating the user already exists
      return res
        .status(200)
        .send({ success: false, message: "User already exists" });
    }

    // Hash the password before saving it to the database
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    // Create a new user instance using the userModel and save it to the database
    const newUser = new userModel(req.body);
    await newUser.save();

    // Send a success response upon successful registration
    res.status(201).send({ success: true, message: "Registration successful" });
  } catch (error) {
    // Handle errors if registration fails
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller Error: ${error.message}`,
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email in the database
    const user = await userModel.findOne({ email: email });
    if (!user) {
      // If user not found, return a response indicating user not found
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // If passwords do not match, return a response indicating invalid email or password
      return res
        .status(200)
        .send({ message: "Invalid email or password", success: false });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send a success response with the token upon successful login
    res.status(200).send({ success: true, message: "Login successful", token });
  } catch (error) {
    // Handle errors if login fails
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Login Controller Error: ${error.message}`,
    });
  }
};

//auth Controller
const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not Found", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "auth error", success: false });
  }
};

// Doctor controller
const applyDoctorController = async (req, res) => {
  try {
    // Create a new doctor object with status "pending"
    const newDoctor = new doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save(); // Save the new doctor object to the database

    // Find the admin user
    const adminUser = await userModel.findOne({ isAdmin: true });

    if (!adminUser) {
      return res.status(404).send({
        success: false,
        message: "Admin user not found",
      });
    }

    // Update the admin user's notification array
    adminUser.notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: `${newDoctor.firstName} ${newDoctor.lastName}`,
        onClickPath: "/admin/doctors",
      },
    });
    await adminUser.save(); // Save the updated admin user object to the database

    // Respond with success message
    res.status(201).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error); // Log the error for debugging

    // Respond with error message
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for doctor",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
};
