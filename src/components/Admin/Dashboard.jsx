import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";
import BarLoader from "react-spinners/BarLoader";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Filtering and pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  // For rows expansion on mobile: only one row can be expanded at once
  const [expandedRow, setExpandedRow] = useState(null);

  // Detect mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []); 

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users`
      );
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users.");
    }
    setLoadingUsers(false);
  };

  // Filtering users by search term and role (user.userType)
  const filteredUsers = useMemo(() => {
    let filtered = [...users];
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        [user.username, user.email, user.mobile, user.location, user.userType]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm)
      );
    }
    if (selectedRole !== "All") {
      filtered = filtered.filter(
        (user) => user.userType?.toLowerCase() === selectedRole.toLowerCase()
      );
    }
    return filtered;
  }, [users, searchTerm, selectedRole]);

  // Pagination calculation on filtered data
  const offset = currentPage * itemsPerPage;
  const currentPageData = useMemo(
    () => filteredUsers.slice(offset, offset + itemsPerPage),
    [filteredUsers, offset]
  );
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Add user handler
  const handleAddUser = async (newUser) => {
    setIsAddingUser(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users`,
        newUser
      );
      setUsers([...users, response.data.user]);
      toast.success("User added successfully!");
      setShowAddUser(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding user.");
    }
    setIsAddingUser(false);
  };

  // Edit user handler – opens modal with selected user
  const handleEditUser = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  // Callback after user is updated in the modal
  const handleUserUpdated = (updatedUser) => {
    setUsers(
      users.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
  };

  // SweetAlert2 confirmation for deletion
  const confirmDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: { popup: "custom-swal" },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(id);
      }
    });
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(
        `https://localhost:5000/api/users/${id}`
      );
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  // Toggle row expansion: allow only one expanded row at a time
  const toggleRowExpansion = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  // Roles filter buttons (using userType)
  const roles = [
    { display: "All", search: "All" },
    { display: "Admin", search: "admin" },
    { display: "Editor", search: "editor" },
    { display: "User", search: "user" },
  ];

 const renderRole = (role) => {
  if (typeof role !== "string" || !role.trim()) {
    // fallback if role is undefined, null, or empty string
    return <span className="text-gray-500 font-semibold">Unknown</span>;
  }

  let formatted = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  let colorClass = "";

  if (role.toLowerCase() === "admin") {
    formatted = "Admin";
    colorClass = "text-blue-600 font-semibold";
  } else if (role.toLowerCase() === "editor") {
    formatted = "Editor";
    colorClass = "text-green-600 font-semibold";
  } else if (role.toLowerCase() === "user") {
    formatted = "User";
    colorClass = "text-orange-600 font-semibold";
  } else {
    // fallback for unexpected roles
    colorClass = "text-gray-500 font-semibold";
  }

  return <span className={colorClass}>{formatted}</span>;
};


  return (
    <>
      <div className="p-2">
        <h4 className="text-lg font-semibold">
          All Users <span className="text-sm">({users.length})</span>
        </h4>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value.toLowerCase());
              setCurrentPage(0);
            }}
            className="px-2 py-1 border sm:w-1/3 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                key={role.search}
                onClick={() => {
                  setSelectedRole(role.search);
                  setCurrentPage(0);
                }}
                className={`px-4 py-2 text-xs sm:text-sm cursor-pointer font-medium rounded-md ${
                  selectedRole === role.search
                    ? "bg-[#4f8089] text-white"
                    : "bg-gray-200"
                }`}
              >
                {role.display}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="px-4 py-1.5 bg-[#4f8089] cursor-pointer text-white rounded-md hover:bg-red-700 focus:outline-none"
          >
            Add User
          </button>
        </div>
        <div
          className="overflow-x-auto shadow-md rounded-lg border border-gray-300 max-h-[40rem]"
          style={{ scrollbarWidth: "thin" }}
        >
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-[#232121] text-left text-[#F8EDED] sticky top-0 z-10">
              <tr className="text-xs">
                <th className="px-2 py-2 font-medium">S. No.</th>
                <th className="px-2 py-2 font-medium">Username</th>
                <th className="px-2 py-2 font-medium hidden sm:table-cell">
                  Email
                </th>
                <th className="px-2 py-2 font-medium">User Role</th>
                <th className="px-2 py-2 text-center font-medium min-w-16">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loadingUsers ? (
                <tr>
                  <td colSpan="12">
                    <div className="flex justify-center py-4">
                      <BarLoader color="#b91c1c" />
                    </div>
                  </td>
                </tr>
              ) : currentPageData.length > 0 ? (
                currentPageData.map((user, index) => (
                  <React.Fragment key={user._id}>
                    <tr
                      className="border-b text-sm border-gray-200 text-[13px] hover:bg-gray-50 cursor-pointer"
                      onClick={
                        isMobile
                          ? () => toggleRowExpansion(user._id)
                          : undefined
                      }
                    >
                      <td className="px-2 py-0.5">{offset + index + 1}</td>
                      <td className="px-2 py-0.5">{user.username}</td>
                      <td className="px-2 py-0.5 hidden sm:table-cell">
                        {user.email}
                      </td>
                      <td className="px-2 py-0.5">
                        {renderRole(user.userRole)}
                      </td>
                      <td className="px-2 py-0.5 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditUser(user);
                          }}
                          className="text-blue-600 cursor-pointer hover:text-blue-800 mr-2"
                        >
                          <HiOutlinePencil size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDeleteUser(user._id);
                          }}
                          className="text-red-600 cursor-pointer hover:text-red-800"
                        >
                          <HiOutlineTrash size={18} />
                        </button>
                      </td>
                    </tr>
                    {/* Expanded row: only render on mobile */}
                    {expandedRow === user._id && (
                      <tr className="bg-gray-50 sm:hidden">
                        <td colSpan="7" className="px-2 py-2">
                          <div className="text-xs">
                            <p>
                              <strong>Email:</strong> {user.email}
                            </p>
                            <p>
                              <strong>Mobile:</strong> {user.mobile}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredUsers.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-4">
            <div className="text-sm text-gray-700">
              Showing {filteredUsers.length === 0 ? 0 : offset + 1} to{" "}
              {offset + currentPageData.length} of {filteredUsers.length}{" "}
              entries
            </div>
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"pagination flex space-x-2"}
              pageClassName={
                "px-2 border border-gray-500 rounded-md cursor-pointer"
              }
              activeClassName={"bg-gray-300 text-black"}
              previousClassName={
                "px-2 border border-gray-500 rounded-md cursor-pointer"
              }
              nextClassName={
                "px-2 border border-gray-500 rounded-md cursor-pointer"
              }
            />
          </div>
        )}
      </div>

      <ToastContainer />

      {showAddUser && (
        <AddUser
          show={showAddUser}
          onClose={() => setShowAddUser(false)}
          onSubmit={handleAddUser}
          isLoading={isAddingUser}
        />
      )}

      {showEditModal && editUser && (
        <EditModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          member={editUser}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </>
  );
}

export default Dashboard;