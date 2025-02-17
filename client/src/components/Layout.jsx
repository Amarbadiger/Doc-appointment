import React, { useState, useEffect } from "react";
import { userMenu, AdminMenu } from "../Data/data";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  //============= Doctor Menu=============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor/appoinments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navigationMenu, setNavigationMenu] = useState(
    user?.isAdmin ? AdminMenu : user?.isDoctor ? doctorMenu : userMenu
  );

  useEffect(() => {
    setNavigationMenu(
      user?.isAdmin ? AdminMenu : user?.isDoctor ? doctorMenu : userMenu
    );
  }, [user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/Hero");
    if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Close mobile menu after logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-10">
      <div className="flex flex-col h-full">
        {/* Navigation bar */}
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo section */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="no-underline text-2xl font-bold text-gray-800"
            >
              <img src={logo} alt="logo" className="w-48" />
            </Link>
          </div>
          {/* Hamburger icon for mobile */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <i className="fa fa-bars text-2xl"></i>
            </button>
          </div>
          {/* Navigation links and notification icon */}
          <div className="hidden lg:flex space-x-6 items-center text-white">
            {navigationMenu.map((menu) => (
              <Link
                key={menu.name}
                to={menu.path}
                className="flex items-center space-x-2 no-underline text-xl text-white hover:text-violet-800 transition duration-300"
              >
                <i className={`${menu.icon} text-2xl`}></i>
                <span>{menu.name}</span>
              </Link>
            ))}
            <div onClick={handleLogout}>
              <span className="flex items-center space-x-2 no-underline text-xl text-white hover:text-violet-800 transition duration-300 cursor-pointer">
                <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                <span>Logout</span>
              </span>
            </div>
            <div>
              <Badge
                count={user?.notification.length}
                className="m-3"
                onClick={() => {
                  navigate("/notification");
                }}
              >
                <i className="fa-solid fa-bell text-white text-2xl hover:text-violet-800 transition duration-300 cursor-pointer"></i>
              </Badge>

              <Link
                className="capitalize no-underline text-xl text-white hover:text-violet-800 transition duration-300 ml-2 shadow-md p-2"
                to="/user/profile"
              >
                {user?.name}
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-md overflow-hidden">
            {navigationMenu.map((menu) => (
              <Link
                key={menu.name}
                to={menu.path}
                className="block py-2 px-4 no-underline text-lg text-gray-800 hover:bg-gray-100 transition duration-300"
                onClick={toggleMobileMenu}
              >
                <i className={`${menu.icon} mr-2`}></i>
                {menu.name}
              </Link>
            ))}
            <div
              className="block py-2 px-4 no-underline text-lg text-gray-800 hover:bg-gray-100 transition duration-300 cursor-pointer"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
            </div>
            <div
              className="block py-2 px-4 no-underline text-lg text-gray-800 hover:bg-gray-100 transition duration-300 cursor-pointer"
              onClick={() => navigate("/notification")}
            >
              <i className="fa-solid fa-bell mr-2"></i> Notifications
            </div>
          </div>
        )}
        {/* Main content area */}
        <div className="min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
