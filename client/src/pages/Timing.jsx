import React from "react";
import { useTimer } from "react-timer-hook";
import { useNavigate } from "react-router-dom";

const Timing = () => {
  const navigate = useNavigate();

  // Get the current time
  const time = new Date();
  // Set the expiry time to 60 seconds from now
  time.setSeconds(time.getSeconds() + 60);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      console.warn("Time expired");
      navigate("/user/video"); // Navigate to /user/video when time expires
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-500 text-white">
      <div className="text-8xl font-bold">
        {hours}:{minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <p className="mt-8 text-2xl">Wait until you get your time</p>
    </div>
  );
};

export default Timing;
