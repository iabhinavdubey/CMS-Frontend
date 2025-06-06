import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { toast } from "react-toastify";

function AddUser({ show, onClose, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    username: "",
    userRole: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding user.");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 m-4 rounded-lg shadow-lg w-full sm:w-[25rem] max-h-[90vh] overflow-x-auto space-y-6">
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/30 z-10">
            <HashLoader size={40} color="#B43F3F" />
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-red-600">Add New User</h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-600 cursor-pointer hover:text-red-800"
          >
            <HiOutlineX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username <span className="text-lg text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B43F3F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email ID <span className="text-lg text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B43F3F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Role <span className="text-lg text-red-500">*</span>
            </label>
            <select
              name="userRole"
              value={formData.userRole}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B43F3F]"
            >
              <option value="">Select User Role</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-lg text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B43F3F] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 px-3 flex items-center"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-red-600 cursor-pointer text-white rounded-md hover:bg-red-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;