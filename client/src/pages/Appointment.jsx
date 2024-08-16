import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/user-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        console.log("Failed to fetch appointments:", res.data.message);
      }
    } catch (error) {
      console.log("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handlePayFees = (appointmentId) => {
    // Update the status to "paid" in the local state
    const updatedAppointments = appointments.map((appointment) =>
      appointment._id === appointmentId
        ? { ...appointment, status: "paid" }
        : appointment
    );
    setAppointments(updatedAppointments);
    message.success("Payment status updated successfully");

    // Redirect to payment page
    navigate("/user/payment");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Patient Name",
      dataIndex: "userId",
      render: (text, record) => <span>{record.userId?.name || "N/A"}</span>,
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorId",
      render: (text, record) => (
        <span>{record.doctorId?.firstName || "N/A"}</span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>{moment(record.date).format("DD-MM-YYYY")} &nbsp;</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) =>
        record.status === "approved" ? (
          <Button
            type="primary"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handlePayFees(record._id)}
          >
            Pay Fees
          </Button>
        ) : record.status === "paid" ? (
          <span className="text-green-500 font-bold">Paid</span>
        ) : null,
    },
  ];

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-8 w-full max-w-screen-lg">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Appointments List
          </h1>
          <div className="overflow-x-auto w-full">
            <Table
              columns={columns}
              dataSource={appointments}
              pagination={false}
              rowKey="_id"
              className="min-w-full"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Appointments;
