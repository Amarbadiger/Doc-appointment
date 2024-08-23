import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timing = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      // If the OTP is valid, navigate to the video page
      navigate("/user/video");
    } else {
      // Show error if OTP is not valid
      setError("Please enter a valid 6-digit OTP.");
    }
  };

  useEffect(() => {}, [useNavigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-500 text-white">
      <p className="mt-8 text-2xl">Enter OTP On the given time</p>
      <div className="text-xl font-bold mt-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="mt-2 p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={6}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className="bg-blue-600 p-2 rounded-md m-4 hover:bg-blue-700 transition duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Timing;
