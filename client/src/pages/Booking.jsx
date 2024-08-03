import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Booking = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
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

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("this is time", time, "this is data", date);
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        setIsAvailable(false);
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/book-appoinment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h3 className="text-2xl font-bold mb-6">Booking Page</h3>
          {doctors && (
            <div>
              <h4 className="text-xl font-semibold">
                Dr. {doctors.firstName} {doctors.lastName}
              </h4>
              <p className="text-gray-700">
                Fees: {doctors.feesPerConsultation}
              </p>
              <p className="text-gray-700">
                Timings:{" "}
                {doctors.timings && doctors.timings.length === 2
                  ? `${moment(doctors.timings[0]).format("hh:mm A")} - ${moment(
                      doctors.timings[1]
                    ).format("hh:mm A")}`
                  : "Not Available"}
              </p>
              <div className="flex flex-col mt-4">
                <DatePicker
                  aria-required="true"
                  className="m-2"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setDate(moment(value).format("YYYY-MM-DD"));
                  }}
                />
                <TimePicker
                  aria-required="true"
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setTime(moment(value).format("HH:mm"));
                  }}
                />
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAvailability}
                >
                  Check Availability
                </button>
                <button
                  className="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
                  onClick={handleBooking}
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
