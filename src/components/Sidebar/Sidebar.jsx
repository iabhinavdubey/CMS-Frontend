import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUsers,
  FaBoxOpen,
  FaWhatsapp,
} from "react-icons/fa";
import { IoIosTv, IoMdHome } from "react-icons/io";
import { MdDashboardCustomize, MdLogout } from "react-icons/md";
import { FaUsers as FaClients } from "react-icons/fa6";
import { HiOutlineX } from "react-icons/hi";
import logo from "/src/assets/logo.png";
// import rafiki from "/src/assets/rafiki.png";
// import rafiki1 from "/src/assets/rafiki1.png";
import { PiCertificateFill, PiEyedropperSampleFill } from "react-icons/pi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState(null); // for dropdowns
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [timeLeft, setTimeLeft] = useState(null);

  const linkClass = ({ isActive }) =>
    `flex gap-3 items-center hover:bg-gray-200 p-2 rounded-md transition ${
      isActive ? "bg-gray-300 font-semibold" : "text-gray-600"
    }`;

  const toggleDropdown = (menu) => {
    setExpanded(expanded === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;

      const updateTimer = () => {
        const currentTime = Date.now();
        const remainingTime = expirationTime - currentTime;
        if (remainingTime <= 0) {
          localStorage.clear();
          navigate("/");
        } else {
          setTimeLeft(Math.floor(remainingTime / 1000));
        }
      };

      updateTimer();
      const intervalId = setInterval(updateTimer, 1000);
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error("Token decoding error:", error);
      navigate("/");
    }
  }, [token, navigate]);

  const formatTime = (seconds) => {
    if (!seconds || seconds <= 0) return "00:00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`h-screen bg-white transition-all ${
        isOpen ? "min-w-60 max-w-60" : "min-w-20 max-w-20"
      } flex flex-col border-r border-gray-200 shadow-lg`}
    >
          <div className="flex justify-between items-center px-4 py-3 h-[72px]">
              <img
          src={logo}
          alt="Rafiki Logo"
          className={`h-23 rounded-md object-contain transition-all ${
            isOpen ? "block" : "hidden"
          }`}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl cursor-pointer text-black-600 hover:text-orange-900"
        >
          {isOpen ? <HiOutlineX size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      <nav className={`flex flex-col mt-4 text-md gap-2 ${isOpen ? "px-4" : "px-2"}`}>
        {/* {userRole === "admin" && ( */}
          <NavLink to="/dashboard" className={linkClass}>
            <MdDashboardCustomize size={18} />
            {isOpen && <span>Dashboard</span>}
        </NavLink>
        
        <NavLink to="/home" className={linkClass}>
            <IoMdHome size={18} />
            {isOpen && <span>Home</span>}
          </NavLink>
        {/* )} */}

        {/* {userRole === "admin" && (
          <NavLink to="/users" className={linkClass}>
            <FaUsers size={18} />
            {isOpen && <span>Users</span>}
          </NavLink>
        )} */}

        {/* CLIENTS DROPDOWN */}
        <div>
          <button
            onClick={() => toggleDropdown("multimedia")}
            className="w-full text-left flex items-center gap-3 hover:bg-gray-200 p-2 rounded-md text-gray-600"
          >
            <IoIosTv size={18} />
            {isOpen && <span>Multimedia</span>}
          </button>
          {expanded === "multimedia" && (
            <div className="pl-8 text-sm text-gray-500 space-y-1">
              <NavLink to="/multimedia/customVideo" className={linkClass}>Custom Video</NavLink>
              <NavLink to="/multimedia/illustrations" className={linkClass}>Illustrations</NavLink>
              <NavLink to="/multimedia/whiteboard" className={linkClass}>White Board Animations</NavLink>
              <NavLink to="/multimedia/GIF" className={linkClass}>GIF's</NavLink>
              <NavLink to="/multimedia/Animation" className={linkClass}>2D Animation</NavLink>
              <NavLink to="/multimedia/Motion" className={linkClass}>Motion Graphics</NavLink>
              <NavLink to="/multimedia/CustomVideos" className={linkClass}>Custom Videos</NavLink>
              <NavLink to="/multimedia/VirtualReality" className={linkClass}>AR/VR/3D/Gamification</NavLink>
            </div>
          )}
        </div>

        {/* PRODUCTS DROPDOWN */}
        <div>
          <button
            onClick={() => toggleDropdown("products")}
            className="w-full text-left flex items-center gap-3 hover:bg-gray-200 p-2 rounded-md text-gray-600"
          >
            <FaBoxOpen size={18} />
            {isOpen && <span>Products</span>}
          </button>
          {expanded === "products" && (
            <div className="pl-8 text-sm text-gray-500 space-y-1">
              <NavLink to="/products/add" className={linkClass}>Add Product</NavLink>
              <NavLink to="/products/manage" className={linkClass}>Manage Products</NavLink>
            </div>
          )}
        </div>

        {/* Samples (static link) */}
        <NavLink to="/orders" className={linkClass}>
          <PiEyedropperSampleFill size={18} />
          {isOpen && <span>Samples</span>}
        </NavLink>

        {/* Certificates (Admin only) */}
        {userRole === "admin" && (
          <NavLink to="/certificate-dist" className={linkClass}>
            <AiFillSafetyCertificate size={18} />
            {isOpen && <span>Cert. Dist.</span>}
          </NavLink>
        )}

        {/* Logout */}
        <NavLink
          to="/"
          onClick={handleLogout}
          className="flex gap-3 items-center bg-[#4f8089] hover:bg-red-500 p-2 rounded-md text-white"
        >
          <MdLogout size={18} />
          {isOpen && <span>Logout</span>}
          {isOpen && (
            <span className="ml-auto px-2 rounded bg-white text-black text-xs">
              {formatTime(timeLeft)}
            </span>
          )}
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
