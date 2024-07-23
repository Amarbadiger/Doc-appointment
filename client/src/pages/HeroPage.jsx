import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/images/hero.png";
import logo from "../assets/images/logo.png";
import about from "../assets/images/about.png";
import "../styles/HeroPage.css";

const HeroPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-purple-500 p-4 md:p-10">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-4">
        <img src={logo} alt="logo" className="w-32 md:w-48" />
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row justify-center items-center px-4 md:px-6 py-8 md:py-12 text-white">
        <div className="md:w-1/2 text-center md:text-left space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Welcome to Zeecare
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold">
            Advanced Video Consultant Services
          </h2>
          <p className="text-base md:text-lg">
            ZeeCare Medical Institute is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            ZeeCare, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
        </div>
        <div className="md:w-2/5 mt-6 md:mt-10 flex justify-center">
          <img
            src={HeroImg}
            alt="Hero"
            className="w-[55%] max-w-md h-auto rounded-lg animate-bounce-slow"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col md:flex-row justify-center items-center px-4 md:px-6 py-8 md:py-12 bg-white text-gray-800 rounded-lg shadow-md">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={about}
            alt="About"
            className="w-full max-w-xs md:max-w-md rounded-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
          <h2 className="text-xl md:text-2xl font-semibold">
            Importance and Scope:
          </h2>
          <p className="text-base md:text-lg mt-4">
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

      {/* Contact Form */}
      <div className="bg-white text-gray-800 rounded-lg px-4 md:px-6 py-8 md:py-12 shadow-md mb-10 mt-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Contact Us</h2>
        <form className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full md:w-1/2 p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full md:w-1/2 p-2 border rounded-lg"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            placeholder="Message"
            className="w-full p-2 border rounded-lg"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-800 p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="flex-shrink-0 mb-4 md:mb-0 w-full md:w-1/4 flex justify-center md:justify-start">
            <img src={logo} alt="Zeecare Logo" className="w-40 md:w-48" />
          </div>

          {/* Footer Content */}
          <div className="flex flex-col md:flex-row w-full md:w-3/4 justify-between space-y-6 md:space-y-0 gap-5 ">
            {/* Map */}
            <div className="flex-grow md:w-1/4 flex justify-center ">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.413706912547!2d-118.24368420888354!3d34.05223512043007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7a11f1e3bfb%3A0x14b8c0a0eb313b6b!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1634178937486!5m2!1sen!2sus"
                width="100%"
                height="200" // Increased height for better visibility
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded"
              />
            </div>

            {/* Quick Links */}
            <div className="w-full md:w-1/4 flex flex-col items-center md:items-start ">
              <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/appointment">Appointment</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div className="w-full md:w-1/4 flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-2">Hours</h4>
              <ul className="space-y-2">
                <li>Monday: 9:00 AM - 11:00 PM</li>
                <li>Tuesday: 12:00 PM - 12:00 AM</li>
                <li>Wednesday: 10:00 AM - 10:00 PM</li>
                <li>Thursday: 9:00 AM - 9:00 PM</li>
                <li>Friday: 3:00 PM - 9:00 PM</li>
                <li>Saturday: 9:00 AM - 3:00 PM</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="w-full md:w-1/4 flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold mb-2">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a href="tel:999-999-9999">999-999-9999</a>
                </li>
                <li>
                  <a href="mailto:zeelab@gmail.com">zeelab@gmail.com</a>
                </li>
                <li>Karachi, Pakistan</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroPage;
