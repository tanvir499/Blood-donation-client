import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  MapPin,
  User,
  Droplets,
  Calendar,
  AlertCircle,
  Eye,
  Filter,
  RefreshCw,
  Heart,
  Shield,
  ClockIcon,
} from "lucide-react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import {
  containerVariants,
  cardHoverVariants,
  pulseAnimation,
  floatAnimation,
  buttonHoverAnimation,
} from "../../utils/AnimationUtils";

const DonationRequest = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/all-requests")
      .then((res) => {
        const pendingRequests = res.data.filter(
          (req) => req.status === "pending"
        );
        setAllRequests(pendingRequests);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosInstance]);

  const handleView = (id) => {
    if (!user) {
      navigate("/login", { state: { from: `/donation-request/${id}` } });
    } else {
      navigate(`/donation-request/${id}`);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    axiosInstance
      .get("/all-requests")
      .then((res) => {
        const pendingRequests = res.data.filter(
          (req) => req.status === "pending"
        );
        setAllRequests(pendingRequests);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const filteredRequests =
    filter === "urgent"
      ? allRequests.filter(
          (req) => req.priority === "urgent" || req.urgency === "high"
        )
      : allRequests;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={floatAnimation}
          className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-red-100 to-pink-100 opacity-20 blur-3xl"
        />
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
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-pink-100 to-red-100 opacity-10 blur-3xl"
        />
      </div>

      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="hidden lg:block absolute top-32 left-20 text-4xl opacity-10"
      >
        🩸
      </motion.div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
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
              background: "linear-gradient(90deg, #dc2626, #ef4444, #dc2626)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Pending Donation Requests
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Urgent blood donation requests waiting for your help. Each click
            could save a life.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-4 mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-red-100 shadow-sm"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {allRequests.length}
              </div>
              <div className="text-sm text-gray-600">Pending Requests</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {allRequests.filter((r) => r.priority === "urgent").length}
              </div>
              <div className="text-sm text-gray-600">Urgent</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-red-200"
              }`}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              All Requests ({allRequests.length})
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("urgent")}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === "urgent"
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-red-200"
              }`}
            >
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Urgent Only (
              {allRequests.filter((r) => r.priority === "urgent").length})
            </motion.button>
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
                <Heart className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Loading Requests
              </h3>
              <p className="text-gray-600">
                Fetching urgent blood donation requests...
              </p>
            </motion.div>
          </motion.div>
        )}

        {!loading && filteredRequests.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-red-50 to-pink-50 mb-6">
              <Shield className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Pending Requests
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              All blood donation requests have been fulfilled! Check back later
              for new requests.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Refresh Requests
            </motion.button>
          </motion.div>
        )}

        {!loading && filteredRequests.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredRequests.map((request, index) => (
                  <motion.div
                    key={request._id}
                    variants={cardHoverVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative"
                  >
                    {(request.priority === "urgent" ||
                      request.urgency === "high") && (
                      <motion.div
                        animate={pulseAnimation}
                        className="absolute -top-3 -right-3 z-10"
                      >
                        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          URGENT
                        </div>
                      </motion.div>
                    )}

                    <div className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden h-full">
                      <div className="relative h-32 bg-gradient-to-r from-red-500 to-pink-500 overflow-hidden">
                        <motion.div
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                          }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            background:
                              "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
                            backgroundSize: "50px 50px",
                          }}
                          className="absolute inset-0"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              className="text-5xl font-bold text-white drop-shadow-lg"
                            >
                              {request.bloodGroup}
                            </motion.div>
                            <p className="text-white/90 text-sm mt-2">
                              Blood Group Needed
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-start gap-3 mb-6">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="w-14 h-14 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center border-2 border-red-200 flex-shrink-0"
                          >
                            <User className="w-6 h-6 text-red-500" />
                          </motion.div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              {request.recipientName}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Droplets className="w-4 h-4 text-red-500" />
                              <span className="font-semibold text-red-600">
                                {request.bloodGroup}
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                Need {request.units || 1} unit(s)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-4 h-4 text-blue-500" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium text-gray-800">
                                {request.upazila}, {request.district}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                              <Calendar className="w-4 h-4 text-green-500" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Date & Time
                              </p>
                              <div className="flex items-center gap-4">
                                <span className="font-medium text-gray-800">
                                  {request.donationDate}
                                </span>
                                <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                                  <Clock className="w-4 h-4" />
                                  {request.donationTime || "ASAP"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                              <ClockIcon className="w-4 h-4 text-yellow-500" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Status</p>
                              <div className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                <span className="font-medium text-yellow-600">
                                  Pending Response
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <motion.button
                          {...buttonHoverAnimation}
                          onClick={() => handleView(request._id)}
                          className="w-full mt-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                        >
                          <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          View Full Details
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="ml-1"
                          >
                            →
                          </motion.span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-bold text-gray-800">
                  Privacy Notice
                </h3>
              </div>
              <p className="text-gray-600">
                This page is private and only accessible to logged-in users. All
                donor and recipient information is kept confidential. You must
                be logged in to view request details and contact information.
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DonationRequest;
