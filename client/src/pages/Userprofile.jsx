import React from "react";
import Layout from "./../components/Layout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Userprofile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-4xl mx-auto p-6">
          {user ? (
            <div>
              {/* Profile Section */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <div className="flex items-center mb-6">
                  <div className="ml-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {user.name}
                    </h1>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                {/* <Link
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  to={`/user/edit-profile/${user?._id}`}
                >
                  Edit Profile
                </Link> */}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Userprofile;
