import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import axios from "axios";
import Layout from "../components/Layout";
const HomePage = () => {
  //Login User Data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/getUserdata",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <Layout />
    </div>
  );
};

export default HomePage;
