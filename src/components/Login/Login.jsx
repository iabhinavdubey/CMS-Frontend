import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import sideImage from "../../assets/logo.png";  
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", user.username);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("role", user.userRole);

      if (user.userRole === "admin") {
        navigate("/dashboard");
      } else if (
        user.userRole === "editor" ||
        user.userRole === "user"
      ) {
        navigate("/users");
      } else {
        navigate("/users");
      }
      toast.success("Login successful!");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      toast.error("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden">
      {/* Login Form - Covers full display */}
      <motion.div
        className="w-full flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 px-2 py-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="bg-white shadow-lg rounded-lg px-8 py-12 w-96 border border-gray-200 flex flex-col items-center relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sideImage && (
            <img
              src={sideImage}
              className="w-16 rounded-md mb-8 shadow-lg"
              alt="Decorative background"
            />
          )}
          <h2
            className="text-3xl font-bold text-orange-400 text-center mb-4"
            style={{ fontFamily: "Borel, serif" }}
          >
            Welcome Back
          </h2>
          {error && (
            <motion.p
              className="text-red-500 text-md bg-red-100 border-red-300 border px-2 py-1 rounded-full mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}
          <motion.form
            onSubmit={handleLogin}
            className="w-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-normal tracking-wide mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-normal tracking-wide mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-gray-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </motion.form>
          <p className="text-sm text-center mt-6">
            Designed with ❤️ and crafted with care by Team{" "}
            <a
              href="https://www.rafiki.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 font-bold block sm:inline hover:text-yellow-600"
            >
              Rafiki Solutions Pvt. Ltd.
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Animated Particles in the Center */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full backdrop-blur-3xl"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              top: `${Math.random() * 140 - 20}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: "rgba(255, 255, 255, 0.30)",
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/30 z-20">
          <HashLoader size="60px" color="#f87171" />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Login;
