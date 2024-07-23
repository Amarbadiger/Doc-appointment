import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div
      className="m-2 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
    >
      <div className="border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold">
          Dr. {doctor.firstName} {doctor.lastName}
        </h2>
      </div>
      <div>
        <p className="mb-1">
          <span className="font-bold">Specialization:</span>{" "}
          {doctor.specialization}
        </p>
        <p className="mb-1">
          <span className="font-bold">Experience:</span> {doctor.experience}{" "}
          years
        </p>
        <p className="mb-1">
          <span className="font-bold">Fees Per Consultation:</span>{" "}
          {doctor.feesPerConsultation}
        </p>
        <p className="mb-1">
          <span className="font-bold">Timings:</span> {doctor.timings[0]} -{" "}
          {doctor.timings[1]}
        </p>
      </div>
    </div>
  );
};

export default DoctorList;
