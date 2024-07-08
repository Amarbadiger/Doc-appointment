import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/images/hero.png";
import logo from "../assets/images/logo.png";
import about from "../assets/images/about.png";
import "../styles/HeroPage.css";

const HeroPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-purple-500 p-10">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div>
          <img src={logo} alt="logo" className="w-48" />
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 lg:px-6 rounded-lg transition duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 lg:px-6 rounded-lg transition duration-300 ease-in-out"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row justify-center items-center px-6 lg:px-16 py-10 lg:py-24">
        <div className="lg:w-1/2 text-white space-y-6 lg:space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Welcome to Zeecare
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold">
            Advanced Video Consultant Services
          </h2>
          <p className="text-lg lg:text-xl">
            ZeeCare Medical Institute is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            ZeeCare, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end">
          <img
            src={HeroImg}
            alt="Hero"
            className="w-80 h-auto max-w-md lg:max-w-lg rounded-lg animate-bounce-slow"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center px-6 lg:px-16 py-12 lg:py-24 bg-white text-gray-800 rounded-lg">
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-start">
          <img
            src={about}
            alt="About"
            className="w-full h-auto max-w-md lg:max-w-lg rounded-lg"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-12">
          <h2 className="text-2xl lg:text-3xl font-semibold">
            Importance and Scope:
          </h2>
          <p className="text-lg lg:text-xl mt-4">
            The significance of our project lies in its ability to bridge the
            gap between patients and healthcare providers, especially in
            situations where physical access to healthcare facilities is limited
            or inconvenient. By leveraging the power of telemedicine, our
            platform will enable users to connect with qualified doctors,
            receive medical advice, and obtain prescriptions without the need
            for in-person visits. This not only saves time and resources but
            also enhances accessibility to healthcare services, particularly for
            individuals with mobility issues, busy schedules, or residing in
            remote areas. Furthermore, our platform will facilitate a seamless
            user experience, allowing registered users to easily search for
            specific doctors based on their medical needs and preferences.
            Whether it's a general physician, specialist, or therapist, users
            will have access to a diverse pool of healthcare professionals
            catering to various medical specialties and conditions.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-8 text-white">
        &copy; 2024 Doctor Appointments. All rights reserved.
      </footer>
    </div>
  );
};

export default HeroPage;
