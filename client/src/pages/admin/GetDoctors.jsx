import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";

const GetDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  const getallDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        // Add a unique key to each doctor
        const doctorsWithKeys = Array.isArray(res.data.data)
          ? res.data.data.map((doctor, index) => ({
              ...doctor,
              key: doctor._id || index, // Using _id or index as key
            }))
          : [];
        setDoctors(doctorsWithKeys);
      }
    } catch (error) {
      console.log("Error fetching doctors data:", error);
      message.error("Failed to fetch doctors data");
    }
  };

  // Handle Click on Button
  const handleAccountStatus = async (record, status) => {
    try {
      console.log("Updating status for:", record._id, "to:", status);
      const res = await axios.post(
        "http://localhost:8000/api/v1/admin/approveDoctor",
        { doctorId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getallDoctors(); // Reload the doctors list instead of refreshing the whole page
      } else {
        message.error("Failed to update status");
      }
    } catch (error) {
      console.log("Error updating account status:", error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getallDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" ? (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-600 transition duration-300"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
              onClick={() => handleAccountStatus(record, "pending")}
            >
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="bg-white text-gray-800 p-4 sm:p-8 rounded-lg shadow-lg w-full min-h-screen border border-blue-500">
        <h1 className="text-center m-2 text-xl sm:text-2xl">Doctors List</h1>
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={doctors}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GetDoctors;
