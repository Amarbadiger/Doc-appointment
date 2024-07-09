import React, { useState } from "react";
import { Form, Input, message, Button, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import Layout from "../components/Layout";

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    setLoading(true); // Start loading animation
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/apply-doctor",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Application Submitted Successfully!");
        navigate("/");
      } else {
        message.error(res.data.message || "Failed to submit application");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Unexpected error:", error);
      message.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-5 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full bg-white p-8 shadow-lg rounded-lg ">
          <h1 className="text-3xl font-semibold mb-6 text-center text-black">
            Apply as a Doctor
          </h1>
          <h2 className="text-xl mb-6 text-center text-black">
            Please Provide all the Details to apply as a Doctor
          </h2>
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your First Name" },
                ]}
              >
                <Input type="text" placeholder="Enter your first name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your Last Name" },
                ]}
              >
                <Input type="text" placeholder="Enter your last name" />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Phone Number",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter your contact number" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid Email",
                  },
                ]}
              >
                <Input type="email" placeholder="Enter your email address" />
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input type="text" placeholder="Enter your website" />
              </Form.Item>
              <Form.Item
                label="Address of Clinic"
                name="clinicAddress"
                rules={[
                  {
                    required: true,
                    message: "Please enter the address of your clinic",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter your clinic address" />
              </Form.Item>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[
                  {
                    required: true,
                    message: "Please enter your specialization",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter your specialization" />
              </Form.Item>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[
                  {
                    required: true,
                    message: "Please enter your experience in years",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter your experience" />
              </Form.Item>
              <Form.Item
                label="Consultation Fees"
                name="feesPerConsultation"
                rules={[
                  { required: true, message: "Please enter consultation fees" },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Enter your consultation fees"
                />
              </Form.Item>
              <Form.Item
                label="Timing"
                name="timings"
                rules={[
                  {
                    required: true,
                    message: "Please select consultation timings",
                  },
                ]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
