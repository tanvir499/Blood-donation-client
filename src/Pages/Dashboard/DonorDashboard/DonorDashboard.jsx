import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  MapPin,
  Calendar,
  Clock,
  Droplets,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  Eye,
  ArrowRight,
  PlusCircle,
  Activity,
  Heart,
  AlertCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  pageVariants,
  cardVariants,
  pulseAnimation,
  floatAnimation,
  buttonHoverAnimation,
} from "../../../utils/AnimationUtils";

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [recentRequests, setRecentRequests] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  });
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    requestId: null,
  });

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/user-requests/${user.email}?limit=3`)
        .then((res) => {
          setRecentRequests(res.data.requests || []);
          setStats(
            res.data.stats || {
              totalRequests: 0,
              pending: 0,
              inProgress: 0,
              completed: 0,
              cancelled: 0,
            }
          );
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching requests:", error);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  const handleStatusUpdate = (requestId, newStatus) => {
    axiosSecure
      .patch(`/request-status/${requestId}`, { status: newStatus })
      .then(() => {
        toast.success(`Request marked as ${newStatus}!`, {
          position: "top-right",
          theme: "colored",
        });

        setRecentRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: newStatus } : req
          )
        );

        setStats((prev) => {
          const oldStatus = recentRequests.find(
            (r) => r._id === requestId
          )?.status;
          const newStats = { ...prev };

          if (oldStatus && newStats[oldStatus] > 0) {
            newStats[oldStatus]--;
          }

          newStats[newStatus]++;

          return newStats;
        });
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error("Failed to update status", {
          position: "top-right",
          theme: "colored",
        });
      });
  };

  const handleDeleteRequest = () => {
    if (!deleteModal.requestId) return;

    axiosSecure
      .delete(`/request/${deleteModal.requestId}`)
      .then(() => {
        toast.success("Request deleted successfully!", {
          position: "top-right",
          theme: "colored",
        });

        setRecentRequests((prev) =>
          prev.filter((req) => req._id !== deleteModal.requestId)
        );

        const deletedRequest = recentRequests.find(
          (r) => r._id === deleteModal.requestId
        );
        if (deletedRequest) {
          setStats((prev) => ({
            ...prev,
            totalRequests: prev.totalRequests - 1,
            [deletedRequest.status]: prev[deletedRequest.status] - 1,
          }));
        }

        setDeleteModal({ open: false, requestId: null });
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
        toast.error("Failed to delete request", {
          position: "top-right",
          theme: "colored",
        });
      });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200";
      case "inprogress":
        return "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200";
      case "done":
        return "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200";
      case "cancelled":
        return "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString || "Not specified";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center">
        <motion.div animate={pulseAnimation} className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center mb-4">
            <Droplets className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Loading Dashboard</h3>
          <p className="text-gray-600 mt-2">
            Getting your information ready...
          </p>
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
          <motion.div variants={cardVariants} className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Welcome back, {user?.displayName}! 👋
                </h1>
                <p className="text-gray-600">
                  Here's an overview of your blood donation activities
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Requests</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.totalRequests}
                    </p>
                  </div>
                  <motion.div
                    animate={floatAnimation}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center"
                  >
                    <FileText className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Pending</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.pending}
                    </p>
                  </div>
                  <motion.div
                    animate={pulseAnimation}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 flex items-center justify-center"
                  >
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">In Progress</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.inProgress}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center"
                  >
                    <Activity className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Completed</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.completed}
                    </p>
                  </div>
                  <motion.div
                    animate={pulseAnimation}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Cancelled</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.cancelled}
                    </p>
                  </div>
                  <motion.div
                    animate={floatAnimation}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center"
                  >
                    <XCircle className="w-6 h-6 text-red-600" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {recentRequests.length > 0 ? (
            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.6 }}
              className="mb-10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Recent Donation Requests
                    </h2>
                    <p className="text-gray-600">
                      Your last 3 donation requests
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/dashboard/my-request")}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
                >
                  View All Requests
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-red-50 to-pink-50">
                        <th className="p-6 text-left">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold text-gray-700">
                              Recipient
                            </span>
                          </div>
                        </th>
                        <th className="p-6 text-left">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold text-gray-700">
                              Location
                            </span>
                          </div>
                        </th>
                        <th className="p-6 text-left">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold text-gray-700">
                              Date & Time
                            </span>
                          </div>
                        </th>
                        <th className="p-6 text-left">
                          <div className="flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold text-gray-700">
                              Blood Group
                            </span>
                          </div>
                        </th>
                        <th className="p-6 text-left">
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-gray-500" />
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
                        {recentRequests.map((request, index) => (
                          <motion.tr
                            key={request._id}
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
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                                  <span className="font-bold text-red-600">
                                    {request.recipientName?.charAt(0) || "?"}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {request.recipientName}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Requested by you
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <div>
                                  <p className="font-medium text-gray-800">
                                    {request.district}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {request.upazila}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  <span className="font-medium text-gray-800">
                                    {formatDate(request.donationDate)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-500">
                                    {formatTime(request.donationTime)}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="p-6">
                              <motion.div
                                animate={pulseAnimation}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full"
                              >
                                <Droplets className="w-4 h-4 text-red-600" />
                                <span className="font-bold text-red-600">
                                  {request.bloodGroup}
                                </span>
                              </motion.div>
                            </td>
                            <td className="p-6">
                              <div className="space-y-2">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                    request.status
                                  )}`}
                                >
                                  {request.status || "Unknown"}
                                </span>

                                {request.status === "inprogress" && (
                                  <div className="flex gap-2 mt-2">
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        handleStatusUpdate(request._id, "done")
                                      }
                                      className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                    >
                                      <CheckCircle className="w-3 h-3" />
                                      Mark Done
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() =>
                                        handleStatusUpdate(
                                          request._id,
                                          "cancelled"
                                        )
                                      }
                                      className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                    >
                                      <XCircle className="w-3 h-3" />
                                      Cancel
                                    </motion.button>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    navigate(`/edit-request/${request._id}`)
                                  }
                                  className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors flex items-center justify-center"
                                  title="Edit Request"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </motion.button>

                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    setDeleteModal({
                                      open: true,
                                      requestId: request._id,
                                    })
                                  }
                                  className="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center justify-center"
                                  title="Delete Request"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>

                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    navigate(`/request/${request._id}`)
                                  }
                                  className="w-8 h-8 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors flex items-center justify-center"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
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
                  {recentRequests.map((request, index) => (
                    <motion.div
                      key={request._id}
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
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center border-2 border-red-200">
                              <User className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800">
                                {request.recipientName}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Droplets className="w-4 h-4 text-red-500" />
                                <span className="font-semibold text-red-600">
                                  {request.bloodGroup}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status || "Unknown"}
                          </span>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>
                              {request.upazila}, {request.district}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{formatDate(request.donationDate)}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{formatTime(request.donationTime)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                          <div className="flex items-center gap-2">
                            {request.status === "inprogress" && (
                              <div className="flex gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleStatusUpdate(request._id, "done")
                                  }
                                  className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  Done
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() =>
                                    handleStatusUpdate(request._id, "cancelled")
                                  }
                                  className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                >
                                  <XCircle className="w-3 h-3" />
                                  Cancel
                                </motion.button>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                navigate(`/edit-request/${request._id}`)
                              }
                              className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors flex items-center justify-center"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                setDeleteModal({
                                  open: true,
                                  requestId: request._id,
                                })
                              }
                              className="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center justify-center"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                navigate(`/request/${request._id}`)
                              }
                              className="w-8 h-8 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors flex items-center justify-center"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-8 text-center">
                <motion.button
                  {...buttonHoverAnimation}
                  onClick={() => navigate("/dashboard/my-request")}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                >
                  <Eye className="w-5 h-5" />
                  View All My Requests
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.6 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-gray-100 to-blue-100 mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Requests Yet
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                You haven't created any donation requests yet. Create your first
                request to find blood donors.
              </p>
              <motion.button
                {...buttonHoverAnimation}
                onClick={() => navigate("/dashboard/add-request")}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <PlusCircle className="w-5 h-5" />
                Create Your First Request
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {deleteModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setDeleteModal({ open: false, requestId: null })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-12 h-12 text-white/80" />
                  <div>
                    <h3 className="text-xl font-bold">Delete Request</h3>
                    <p className="text-white/80">
                      Are you sure you want to delete this request?
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700">
                      This action cannot be undone. The request and all
                      associated data will be permanently removed.
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setDeleteModal({ open: false, requestId: null })
                      }
                      className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      {...buttonHoverAnimation}
                      onClick={handleDeleteRequest}
                      className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      Delete Request
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DonorDashboard;
