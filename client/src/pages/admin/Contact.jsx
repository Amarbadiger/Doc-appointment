import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import Layout from "../../components/Layout";
const Contact = () => {
  const [contactData, setContactData] = useState([]);

  const fetchContactData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/v1/hero/contactData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setContactData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return (
    <Layout>
      <div className="p-5 rounded-md border border-gray-300 bg-gray-50">
        <h1 className="text-2xl mb-6">Contact Us Submissions</h1>
        {contactData.length > 0 ? (
          <ul className="space-y-4">
            {contactData.map((contact, i) => (
              <li key={i} className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-bold">{contact.name}</h2>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-gray-800">{contact.message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No contact submissions available.</p>
        )}
      </div>
    </Layout>
  );
};

export default Contact;
