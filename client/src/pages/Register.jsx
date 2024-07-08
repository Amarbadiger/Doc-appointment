import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import logo from "../assets/images/logo.png";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    setLoading(true); // Start loading animation
    try {
      dispatch(showLoading());
      // Send a POST request to the backend API endpoint for user registration
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        values
      );
      dispatch(hideLoading());
      // Check if registration was successful based on response data
      if (res.data.success) {
        // Display a success message to the user
        message.success("Registered Successfully!");

        // Navigate the user to the login page after successful registration
        navigate("/login");
      } else {
        // Display an error message to the user based on the response data
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // Log any unexpected errors to the console
      console.log(error);

      // Display a generic error message to the user for any unexpected issues
      message.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bg-gradient-to-br from-blue-400 to-purple-500 p-10">
      <nav className="flex justify-between items-center px-6 py-4 ">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-2xl font-semibold text-gray-800">
              <img src={logo} alt="logo" className="w-48" />
            </h1>
          </Link>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg m-4">
          <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
          <Form layout="vertical" onFinish={onFinishHandler}>
            <Form.Item label="Name" name="name">
              <Input type="text" className="w-full" required />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" className="w-full" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" className="w-full" required />
            </Form.Item>
            <Form.Item>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Sign Up"
                )}
              </button>
            </Form.Item>
          </Form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
