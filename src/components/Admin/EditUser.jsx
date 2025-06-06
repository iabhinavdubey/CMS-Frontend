import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { toast } from "react-toastify";

function EditUser({ show, onClose, member, onUserUpdated }) {
  const [formData, setFormData] = useState({
    _id: "",
    username: "",
    userType: "",
    mobile: "",
    email: "",
    location: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (member) {
      setFormData({
        _id: member._id,
        username: member.username || "",
        userType: member.userType || "",
        mobile: member.mobile || "",
        email: member.email || "",
        location: member.location || "",
        password: "",
      });
    }
  }, [member]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (!payload.password) {
      delete payload.password;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `https://cms-backend.onrender.com/users/${formData._id}`, 
        payload
      );
      toast.success("User updated successfully!");
      if (onUserUpdated) onUserUpdated(response.data.user);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating user.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 m-4 rounded-lg shadow-lg w-full sm:w-[25rem] max-h-[90vh] overflow-x-auto space-y-6">
        {isSubmitting && (
          <div className="absolute inset-0 flex justify-center items-center bg-white/30 z-10">
            <HashLoader size={40} color="#B43F3F" />
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-red-600">Edit User</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-600 cursor-pointer hover:text-gray-800"
          >
            <HiOutlineX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B43F3F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile No. <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B43F3F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email ID <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B43F3F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Type <span className="text-red-500">*</span>
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B43F3F]"
            >
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Update Password (optional)"
                disabled={isSubmitting}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="mt-1 p-1 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B43F3F]"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;