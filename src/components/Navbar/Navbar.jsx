import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();

  const renderRole = (role) => {
    if (!role) return "";
    if (role === "admin") return "Admin";
    if (role === "salesexecutive") return "Sales Executive";
    if (role === "support") return "Support";
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  const roleFromStorage = localStorage.getItem("role");
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const role = renderRole(roleFromStorage);

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (!decodedToken.exp) {
        navigate("/");
        return;
      }
      const expirationTime = decodedToken.exp * 1000; // convert expiration to ms

      const updateTimer = () => {
        const currentTime = Date.now();
        const remainingTime = expirationTime - currentTime;
        if (remainingTime <= 0) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          setTimeLeft(0);
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
    if (seconds === null || seconds <= 0) return "00:00:00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const formattedHrs = hrs.toString().padStart(2, "0");
    const formattedMins = mins.toString().padStart(2, "0");
    const formattedSecs = secs.toString().padStart(2, "0");
    return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
  };

  return (
    <div className="bg-[#F47515] text-white grid grid-cols-[1fr_min-content] items-center p-4 shadow-md">
      {/* Logo / Title */}
      <h1 className="text-lg sm:text-xl capitalize sm:transform sm:translate-x-12 font-bold text-center justify-self-center">
        Rafiki Solutions Pvt. Ltd.
      </h1>

      <div className="flex gap-2">
        <span className="px-2 rounded bg-white text-black hidden sm:block">
          {formatTime(timeLeft)}
        </span>

        <div className="hidden sm:grid grid-cols-[max-content_min-content] items-center justify-center grid-rows-2 gap-x-2 gap-y-3">
          <FaUserCircle
            className="text-white col-start-2 col-span-1 row-start-1 row-span-2"
            size={25}
          />
          <span className="text-white col-start-1 font-semibold col-span-1 leading-0">
            {user}
          </span>
          <span className="text-white col-start-1 text-sm capitalize col-span-1 leading-0">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
