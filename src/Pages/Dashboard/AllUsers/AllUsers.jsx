import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  Users as UsersIcon,
  Eye,
  MoreVertical,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  pageVariants,
  cardVariants,
  pulseAnimation,
} from "../../../utils/AnimationUtils";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const roles = ["admin", "volunteer", "donor", "user"];

  const fetchUsers = () => {
    setLoading(true);
    axiosSecure
      .get("/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users", {
          position: "top-right",
          theme: "colored",
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = [...users];

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.role !== "all") {
      filtered = filtered.filter((user) => user.role === filters.role);
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((user) => user.status === filters.status);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, filters]);

  const handleStatusChange = (email, status, userName) => {
    const action = status === "active" ? "unblock" : "block";

    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        console.log(res.data);
        fetchUsers();

        toast.success(`${userName} has been ${action}ed successfully!`, {
          position: "top-right",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error(`Failed to ${action} user`, {
          position: "top-right",
          theme: "colored",
        });
      });
  };

  const handleResetFilters = () => {
    setFilters({
      role: "all",
      status: "all",
    });
    setSearchTerm("");
    setFilteredUsers(users);
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200";
      case "volunteer":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200";
      case "donor":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200";
      case "user":
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200";
      case "block":
      case "blocked":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200";
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center">
        <motion.div animate={pulseAnimation} className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center mb-4">
            <UsersIcon className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Loading Users</h3>
          <p className="text-gray-600 mt-2">Fetching user information...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-b from-white to-red-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ["0%", "100%", "0%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-100 to-pink-100 opacity-10 blur-3xl"
        />
      </div>

      <div className="lg:ml-72">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div variants={cardVariants} transition={{ delay: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
                <p className="text-gray-600">
                  Manage user accounts and permissions
                </p>
              </div>
            </div>

            {filteredUsers.length > 0 ? (
              <>
                <div className="hidden lg:block">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-red-50 to-pink-50">
                          <th className="p-6 text-left">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-700">
                                User
                              </span>
                            </div>
                          </th>
                          <th className="p-6 text-left">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-700">
                                Email
                              </span>
                            </div>
                          </th>
                          <th className="p-6 text-left">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-700">
                                Role
                              </span>
                            </div>
                          </th>
                          <th className="p-6 text-left">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-700">
                                Status
                              </span>
                            </div>
                          </th>
                          <th className="p-6 text-left">
                            <span className="font-semibold text-gray-700">
                              Actions
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {filteredUsers.map((user, index) => (
                            <motion.tr
                              key={user._id || index}
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: index * 0.1 }}
                              whileHover={{
                                backgroundColor: "rgba(239, 68, 68, 0.05)",
                              }}
                              className="border-b border-gray-100 hover:bg-red-50/50 transition-colors duration-300"
                            >
                              <td className="p-6">
                                <div className="flex items-center gap-3">
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-pink-100 overflow-hidden border-2 border-red-200"
                                  >
                                    <img
                                      src={
                                        user?.mainPhotoUrl ||
                                        `https://ui-avatars.com/api/?name=${user.fullName}&background=random`
                                      }
                                      alt={user.fullName}
                                      className="w-full h-full object-cover"
                                    />
                                  </motion.div>
                                  <div>
                                    <p className="font-bold text-gray-800">
                                      {user.fullName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Joined{" "}
                                      {new Date(
                                        user.createdAt || Date.now()
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-6">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  <span className="text-gray-800">
                                    {user.email}
                                  </span>
                                </div>
                              </td>
                              <td className="p-6">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                                    user.role
                                  )}`}
                                >
                                  {user.role || "user"}
                                </span>
                              </td>
                              <td className="p-6">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                    user.status
                                  )}`}
                                >
                                  {user.status || "active"}
                                </span>
                              </td>
                              <td className="p-6">
                                <div className="flex items-center gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedUser(user)}
                                    className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors flex items-center justify-center"
                                    title="View Details"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </motion.button>

                                  {user.status === "active" ? (
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        handleStatusChange(
                                          user.email,
                                          "block",
                                          user.fullName
                                        )
                                      }
                                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                                    >
                                      <XCircle className="w-4 h-4" />
                                      Block
                                    </motion.button>
                                  ) : (
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        handleStatusChange(
                                          user.email,
                                          "active",
                                          user.fullName
                                        )
                                      }
                                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      Activate
                                    </motion.button>
                                  )}

                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center"
                                    title="More Actions"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </motion.button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:hidden space-y-4">
                  <AnimatePresence>
                    {filteredUsers.map((user, index) => (
                      <motion.div
                        key={user._id || index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                                className="w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-pink-100 overflow-hidden border-2 border-red-200"
                              >
                                <img
                                  src={
                                    user?.mainPhotoUrl ||
                                    `https://ui-avatars.com/api/?name=${user.fullName}&background=random`
                                  }
                                  alt={user.fullName}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                              <div>
                                <h3 className="font-bold text-gray-800">
                                  {user.fullName}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Role:</span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                                  user.role
                                )}`}
                              >
                                {user.role || "user"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Status:</span>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                  user.status
                                )}`}
                              >
                                {user.status || "active"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Joined:</span>
                              <span className="text-gray-800">
                                {new Date(
                                  user.createdAt || Date.now()
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedUser(user)}
                                className="px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </motion.button>
                            </div>

                            <div className="flex items-center gap-2">
                              {user.status === "active" ? (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleStatusChange(
                                      user.email,
                                      "block",
                                      user.fullName
                                    )
                                  }
                                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Block
                                </motion.button>
                              ) : (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleStatusChange(
                                      user.email,
                                      "active",
                                      user.fullName
                                    )
                                  }
                                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Activate
                                </motion.button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-gray-100 to-blue-100 mb-6">
                  <UsersIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Users Found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  {searchTerm || Object.values(filters).some((f) => f !== "all")
                    ? "No users match your search criteria. Try adjusting your filters."
                    : "No users are currently registered in the system."}
                </p>
                {(searchTerm ||
                  Object.values(filters).some((f) => f !== "all")) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetFilters}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset Filters
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>

          <AnimatePresence>
            {selectedUser && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedUser(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white sticky top-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden">
                          <img
                            src={
                              selectedUser?.mainPhotoUrl ||
                              `https://ui-avatars.com/api/?name=${selectedUser.fullName}&background=random`
                            }
                            alt={selectedUser.fullName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">
                            {selectedUser.fullName}
                          </h3>
                          <p className="text-white/80">{selectedUser.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedUser(null)}
                        className="text-white hover:text-white/80"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            Full Name
                          </label>
                          <p className="text-lg font-semibold text-gray-800">
                            {selectedUser.fullName}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            Email
                          </label>
                          <p className="text-lg font-semibold text-gray-800">
                            {selectedUser.email}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            Role:
                          </label>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getRoleColor(
                              selectedUser.role
                            )}`}
                          >
                            {selectedUser.role || "user"}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            Status:
                          </label>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                              selectedUser.status
                            )}`}
                          >
                            {selectedUser.status || "active"}
                          </span>
                        </div>
                      </div>

                      {selectedUser.phone && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            Phone Number
                          </label>
                          <p className="text-gray-800">{selectedUser.phone}</p>
                        </div>
                      )}

                      {selectedUser.address && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">
                            Address
                          </label>
                          <p className="text-gray-800">
                            {selectedUser.address}
                          </p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">
                          Account Created
                        </label>
                        <p className="text-gray-800">
                          {new Date(
                            selectedUser.createdAt || Date.now()
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedUser(null)}
                          className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                        >
                          Close
                        </motion.button>

                        {selectedUser.status === "active" ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleStatusChange(
                                selectedUser.email,
                                "block",
                                selectedUser.fullName
                              );
                              setSelectedUser(null);
                            }}
                            className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                          >
                            Block User
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleStatusChange(
                                selectedUser.email,
                                "active",
                                selectedUser.fullName
                              );
                              setSelectedUser(null);
                            }}
                            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                          >
                            Activate User
                          </motion.button>
                        )}
                      </div>

                      <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-yellow-800 mb-1">
                              Important Note
                            </h4>
                            <p className="text-sm text-yellow-700">
                              Blocking a user will prevent them from accessing
                              their account. Activating will restore their
                              access immediately.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AllUsers;
