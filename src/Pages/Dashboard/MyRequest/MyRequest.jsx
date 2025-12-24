import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hospital,
  Droplets,
  Calendar,
  Clock,
  MapPin,
  Eye,
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  AlertCircle,
  Search,
  RefreshCw,
  TrendingUp,
  PlusCircle,
  Filter,
  BarChart3,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequest = () => {
  const [totalRequest, seTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request);
        seTotalRequest(res.data.totalRequest);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request);
        seTotalRequest(res.data.totalRequest);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Filter and search functionality
  const filteredRequests = myRequest.filter((request) => {
    const matchesSearch =
      searchTerm === "" ||
      request.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.hospital?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200";
      case "inprogress":
        return "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200";
      case "completed":
        return "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200";
      case "cancelled":
        return "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200";
    }
  };

  const handleExportData = () => {
    toast.info("Export feature coming soon!", {
      position: "top-right",
      theme: "colored",
    });
  };

  const handleAddRequest = () => {
    window.location.href = "/dashboard/add-request";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
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
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <motion.h1
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, #dc2626, #ef4444, #dc2626)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                  className="text-3xl md:text-4xl font-bold mb-2"
                >
                  My Donation Requests
                </motion.h1>
                <p className="text-gray-600">
                  Track and manage all your blood donation requests in one place
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddRequest}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  New Request
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRefresh}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <RefreshCw
                    className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Requests</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {totalRequest}
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
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Showing</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {myRequest.length}
                    </p>
                  </div>
                  <motion.div
                    animate={pulseAnimation}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center"
                  >
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Current Page</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {currentPage}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center"
                  >
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search requests by name, hospital, or blood group..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={pulseAnimation}
                className="inline-flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center mb-4">
                  <Droplets className="w-8 h-8 text-red-500 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Loading Your Requests
                </h3>
                <p className="text-gray-600">
                  Fetching your donation requests...
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Table Section */}
          {!loading && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="lg:hidden space-y-4 mb-8">
                <AnimatePresence>
                  {filteredRequests.map((request, index) => (
                    <motion.div
                      key={request._id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -5 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                              className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center border-2 border-red-200"
                            >
                              <User className="w-6 h-6 text-red-600" />
                            </motion.div>
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

                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Hospital className="w-4 h-4 text-gray-400" />
                            <span>{request.hospital}</span>
                          </div>

                          {request.donationDate && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>{request.donationDate}</span>
                            </div>
                          )}

                          {request.donationTime && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{request.donationTime}</span>
                            </div>
                          )}

                          {request.district && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>
                                {request.district}, {request.upazila}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                          <span className="text-sm text-gray-500">
                            Request #
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white rounded-xl shadow-lg border border-red-100 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-red-50 to-pink-50">
                        <th className="p-6 text-left">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-700">
                              #
                            </span>
                          </div>
                        </th>
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
                            <Hospital className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold text-gray-700">
                              Hospital
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
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="font-semibold text-gray-700">
                              Date
                            </span>
                          </div>
                        </th>
                        <th className="p-6 text-left">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-gray-500" />
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
                        {filteredRequests.map((request, index) => (
                          <motion.tr
                            key={request._id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{
                              backgroundColor: "rgba(239, 68, 68, 0.05)",
                            }}
                            className="border-b border-gray-100 hover:bg-red-50/50 transition-colors duration-300"
                          >
                            <td className="p-6">
                              <span className="font-medium text-gray-800">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                              </span>
                            </td>
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
                                    {request.upazila || "N/A"}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-6">
                              <p className="font-medium text-gray-800">
                                {request.hospital}
                              </p>
                              {request.district && (
                                <p className="text-sm text-gray-500">
                                  {request.district}
                                </p>
                              )}
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
                              {request.donationDate ? (
                                <div className="space-y-1">
                                  <p className="font-medium text-gray-800">
                                    {request.donationDate}
                                  </p>
                                  {request.donationTime && (
                                    <p className="text-sm text-gray-500">
                                      {request.donationTime}
                                    </p>
                                  )}
                                </div>
                              ) : (
                                <span className="text-gray-400">Not set</span>
                              )}
                            </td>
                            <td className="p-6">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                  request.status
                                )}`}
                              >
                                {request.status || "Unknown"}
                              </span>
                            </td>
                            <td className="p-6">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>

                {filteredRequests.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-gray-100 to-blue-100 mb-6">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      No Requests Found
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      {searchTerm || filterStatus !== "all"
                        ? "No requests match your search criteria. Try adjusting your filters."
                        : "You haven't created any donation requests yet."}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddRequest}
                      className="mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <PlusCircle className="w-5 h-5" />
                      Create Your First Request
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Pagination */}
          {!loading && filteredRequests.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8"
            >
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold">
                  {Math.min(currentPage * itemsPerPage, totalRequest)}
                </span>{" "}
                of <span className="font-semibold">{totalRequest}</span>{" "}
                requests
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </motion.button>

                <div className="flex items-center gap-1">
                  {pages.map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        page === currentPage
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                          : "bg-white border border-gray-300 text-gray-700 hover:border-red-300"
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  disabled={currentPage === pages.length}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    currentPage === pages.length
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600"
                  }`}
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Go to page:</span>
                <input
                  type="number"
                  min="1"
                  max={pages.length}
                  value={currentPage}
                  onChange={(e) => {
                    const page = Math.min(
                      Math.max(1, Number(e.target.value)),
                      pages.length
                    );
                    setCurrentPage(page);
                  }}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-center outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequest;
