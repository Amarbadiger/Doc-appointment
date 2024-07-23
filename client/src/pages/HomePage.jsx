import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row, Col } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <Row gutter={[16, 16]}>
          {doctors &&
            doctors.map((doctor) => (
              <Col xs={24} sm={12} md={8} lg={6} key={doctor._id}>
                <DoctorList doctor={doctor} />
              </Col>
            ))}
        </Row>
      </div>
    </Layout>
  );
};

export default HomePage;
