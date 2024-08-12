import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Function to fetch appointments
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/doctor/doctor-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Patient Name",
      dataIndex: "userId",
      render: (user) => user.name, // Render the name of the patient
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
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          {record.status === "pending" && (
            <div className="flex space-x-2">
              <button
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-8 w-full max-w-screen-lg">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            Appointments List
          </h1>
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={appointments.map((appointment) => ({
                ...appointment,
                key: appointment._id, // Use a unique identifier from your data as the key
              }))}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorAppointments;
