import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Droplets,
  MapPin,
  Calendar,
  Clock,
  User,
  Hospital,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
  Shield,
  Heart,
  ChevronRight,
  Users,
  FileText,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";
import {
  pageVariants,
  cardVariants,
  pulseAnimation,
  floatAnimation,
  rotateAnimation,
  buttonHoverAnimation,
} from "../../utils/AnimationUtils";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/request/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading request:", error);
        setLoading(false);
        toast.error("Failed to load request details. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
        });
      });
  }, [axiosInstance, id]);

  const handleConfirmDonation = async () => {
    if (!user) {
      toast.error("Please login first to donate blood!", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
      navigate("/login", { state: { from: `/donation-request/${id}` } });
      return;
    }

    setConfirmLoading(true);

    const loadingToast = toast.loading("Processing your donation...", {
      position: "top-center",
      theme: "colored",
    });

    try {
      const response = await axiosInstance.patch(`/request/${id}`, {
        status: "inprogress",
        donorName: user?.displayName,
        donorEmail: user?.email,
      });

      console.log("Donation confirmed successfully:", response.data);

      toast.update(loadingToast, {
        render: "Donation confirmed successfully! ",
        type: "success",
        isLoading: false,
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        closeButton: true,
      });

      setModalOpen(false);

      setRequest((prev) => ({
        ...prev,
        status: "inprogress",
        donorName: user?.displayName,
        donorEmail: user?.email,
      }));
    } catch (error) {
      console.error("Error confirming donation:", error);

      setModalOpen(false);
      setRequest((prev) => ({
        ...prev,
        status: "inprogress",
        donorName: user?.displayName,
        donorEmail: user?.email,
      }));

      toast.update(loadingToast, {
        render: "Donation confirmed successfully! ",
        type: "success",
        isLoading: false,
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        closeButton: true,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCopyDetails = (text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.info(`${type} copied to clipboard!`, {
            position: "bottom-right",
            autoClose: 2000,
            theme: "colored",
          });
        })
        .catch(() => {
          toast.warning("Failed to copy to clipboard", {
            position: "bottom-right",
            autoClose: 3000,
            theme: "colored",
          });
        });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center">
        <motion.div animate={pulseAnimation} className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Loading Request Details
          </h3>
          <p className="text-gray-600 mt-2">
            Fetching life-saving information...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
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

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/donation-requests")}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Requests
            </motion.button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-500">Private Request</span>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-xl overflow-hidden mb-8"
            >
              <div className="p-8 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        animate={rotateAnimation.animate}
                        transition={rotateAnimation.transition}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <Droplets className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h1 className="text-4xl font-bold mb-1">
                          {request.bloodGroup}
                        </h1>
                        <p className="text-white/80">Blood Group Required</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          Recipient: <strong>{request.recipientName}</strong>
                        </span>
                      </div>
                      <div className="w-px h-6 bg-white/30"></div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{request.donationDate}</span>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={pulseAnimation}
                    className={`px-6 py-3 rounded-full font-bold text-lg ${
                      request.status === "pending"
                        ? "bg-yellow-500 text-yellow-900"
                        : request.status === "inprogress"
                        ? "bg-blue-500 text-blue-900"
                        : "bg-green-500 text-green-900"
                    }`}
                  >
                    {request.status.toUpperCase()}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {request.donorName && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          Donation Confirmed!{" "}
                        </h3>
                        <p className="text-white/80">
                          <strong>{request.donorName}</strong> has accepted to
                          donate blood
                        </p>
                      </div>
                    </div>
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-red-500" />
                    Patient Information
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Recipient Name</p>
                        <p className="text-lg font-bold text-gray-800">
                          {request.recipientName}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Droplets className="w-4 h-4" />
                          <span>Required Blood Group</span>
                        </div>
                        <div className="text-2xl font-bold text-red-600">
                          {request.bloodGroup}
                        </div>
                      </div>

                      {request.units && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Droplets className="w-4 h-4" />
                            <span>Units Required</span>
                          </div>
                          <div className="text-2xl font-bold text-red-600">
                            {request.units} unit(s)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    Location & Hospital Details
                  </h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>District</span>
                        </div>
                        <p
                          className="text-lg font-medium text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={() =>
                            handleCopyDetails(request.district, "District")
                          }
                          title="Click to copy"
                        >
                          {request.district}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>Upazila</span>
                        </div>
                        <p
                          className="text-lg font-medium text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={() =>
                            handleCopyDetails(request.upazila, "Upazila")
                          }
                          title="Click to copy"
                        >
                          {request.upazila}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Hospital className="w-4 h-4" />
                        <span>Hospital</span>
                      </div>
                      <p
                        className="text-lg font-medium text-gray-800 cursor-pointer hover:text-blue-600 transition-colors"
                        onClick={() =>
                          handleCopyDetails(request.hospital, "Hospital")
                        }
                        title="Click to copy"
                      >
                        {request.hospital}
                      </p>
                    </div>

                    {request.address && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>Full Address</span>
                        </div>
                        <p
                          className="text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={() =>
                            handleCopyDetails(request.address, "Address")
                          }
                          title="Click to copy"
                        >
                          {request.address}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {request.message && (
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-500" />
                      Additional Message
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed">
                        {request.message}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="space-y-8">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    Donation Schedule
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Date</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">
                          {request.donationDate}
                        </p>
                      </div>
                      <motion.div
                        animate={floatAnimation}
                        className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center"
                      >
                        <Calendar className="w-6 h-6 text-purple-600" />
                      </motion.div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Time</span>
                        </div>
                        <p className="text-lg font-bold text-gray-800">
                          {request.donationTime}
                        </p>
                      </div>
                      <motion.div
                        animate={rotateAnimation.animate}
                        transition={rotateAnimation.transition}
                        className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"
                      >
                        <Clock className="w-6 h-6 text-blue-600" />
                      </motion.div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-yellow-800">
                          Important Note
                        </span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        Please arrive 15 minutes before the scheduled time.
                        Bring your ID and donor card if available.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-500" />
                    Requester Contact
                  </h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <User className="w-4 h-4" />
                        <span>Requester Name</span>
                      </div>
                      <p
                        className="font-medium text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors"
                        onClick={() =>
                          handleCopyDetails(
                            request.requesterName,
                            "Requester Name"
                          )
                        }
                        title="Click to copy"
                      >
                        {request.requesterName}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span>Email Address</span>
                      </div>
                      <p
                        className="font-medium text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors"
                        onClick={() =>
                          handleCopyDetails(request.requesterEmail, "Email")
                        }
                        title="Click to copy"
                      >
                        {request.requesterEmail}
                      </p>
                    </div>

                    {request.requesterPhone && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Phone className="w-4 h-4" />
                          <span>Phone Number</span>
                        </div>
                        <p
                          className="font-medium text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors"
                          onClick={() =>
                            handleCopyDetails(request.requesterPhone, "Phone")
                          }
                          title="Click to copy"
                        >
                          {request.requesterPhone}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {request.status === "pending" && (
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.6 }}
                    className="sticky top-8"
                  >
                    <motion.button
                      {...buttonHoverAnimation}
                      onClick={() => {
                        if (!user) {
                          toast.warning("Please login first to donate blood!", {
                            position: "top-center",
                            autoClose: 4000,
                            theme: "colored",
                          });
                          navigate("/login", {
                            state: { from: `/donation-request/${id}` },
                          });
                        } else {
                          setModalOpen(true);
                        }
                      }}
                      className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      Donate Blood Now
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </motion.button>

                    <p className="text-center text-sm text-gray-500 mt-3">
                      Your donation can save a life
                    </p>
                  </motion.div>
                )}

                {request.status === "inprogress" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="sticky top-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-6"
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Donation Confirmed!
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You have accepted to donate blood for{" "}
                        {request.recipientName}
                      </p>
                      <div className="bg-white rounded-xl p-4 mb-4">
                        <p className="text-sm text-gray-500">
                          Your Information
                        </p>
                        <p className="font-bold text-gray-800">
                          {request.donorName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {request.donorEmail}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        The requester has been notified. Please arrive at the
                        scheduled time.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => !confirmLoading && setModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      animate={rotateAnimation.animate}
                      transition={rotateAnimation.transition}
                      className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold">
                        Confirm Your Donation
                      </h3>
                      <p className="text-white/80 text-sm">
                        You're about to save a life!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <User className="w-4 h-4" />
                        Donor Information
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium text-gray-800">
                              {user?.displayName || "Not Available"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-800">
                              {user?.email || "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-800">
                          Confirmation Required
                        </span>
                      </div>
                      <p className="text-sm text-green-700">
                        By confirming, you agree to donate blood for{" "}
                        {request.recipientName}. Your information will be shared
                        with the requester.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <motion.button
                      whileHover={{ scale: confirmLoading ? 1 : 1.02 }}
                      whileTap={{ scale: confirmLoading ? 1 : 0.98 }}
                      onClick={handleConfirmDonation}
                      disabled={confirmLoading}
                      className={`flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        confirmLoading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {confirmLoading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Confirm Donation"
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setModalOpen(false)}
                      disabled={confirmLoading}
                      className={`px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 ${
                        confirmLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default DonationRequestDetails;
