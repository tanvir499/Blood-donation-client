import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import {
  User,
  Mail,
  Droplets,
  MapPin,
  Hospital,
  Calendar,
  Clock,
  FileText,
  Send,
  PlusCircle,
  AlertCircle,
  CheckCircle,
  Shield,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  pageVariants,
  cardVariants,
  pulseAnimation,
  floatAnimation,
  buttonHoverAnimation,
} from "../../../utils/AnimationUtils";

const AddRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    Promise.all([axios.get("/upazila.json"), axios.get("/district.json")])
      .then(([upazilaRes, districtRes]) => {
        setUpazilas(upazilaRes.data.upazilas || []);
        setDistricts(districtRes.data.districts || []);
        setFilteredUpazilas(upazilaRes.data.upazilas || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilas.filter(
        (u) =>
          u.district &&
          u.district.toLowerCase() === selectedDistrict.toLowerCase()
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas(upazilas);
    }
  }, [selectedDistrict, upazilas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: form.recipientName.value,
      bloodGroup: form.bloodGroup.value,
      district: form.district.value,
      upazila: form.upazila.value,
      hospital: form.hospital.value,
      address: form.address.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      message: form.message.value,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    const loadingToast = toast.loading("Submitting your request...", {
      position: "top-center",
      theme: "colored",
    });

    axiosSecure
      .post("/requests", requestData)
      .then((res) => {
        toast.update(loadingToast, {
          render: "Request submitted successfully! ",
          type: "success",
          isLoading: false,
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
          closeButton: true,
        });

        toast.success(
          `Your blood donation request for ${requestData.recipientName} has been posted.`,
          {
            position: "top-right",
            autoClose: 6000,
            theme: "colored",
          }
        );
        form.reset();
        setSelectedDistrict("");

        setTimeout(() => {
          toast.info("Your request is now visible to potential donors.", {
            position: "bottom-right",
            autoClose: 4000,
            theme: "colored",
          });
        }, 1000);
      })
      .catch((err) => {
        console.error("Error submitting request:", err);

        toast.update(loadingToast, {
          render: "Failed to submit request. Please try again.",
          type: "error",
          isLoading: false,
          position: "top-center",
          autoClose: 5000,
          theme: "colored",
          closeButton: true,
        });

        toast.error(
          "Something went wrong. Please check your connection and try again.",
          {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          }
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
          <div className="max-w-4xl mx-auto">
            <motion.div variants={cardVariants} className="text-center mb-10">
              <motion.div
                animate={floatAnimation}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-pink-100 mb-6"
              >
                <Droplets className="w-10 h-10 text-red-500" />
              </motion.div>
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
                className="text-3xl md:text-4xl font-bold mb-3"
              >
                Create Blood Donation Request
              </motion.h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Fill out the form below to request blood donation. Your request
                could save a life.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-8">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <PlusCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      New Donation Request
                    </h2>
                    <p className="text-white/80">
                      Please provide all necessary details accurately
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Requester Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4 text-red-500" />
                          Requester Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-red-500" />
                          Requester Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={user?.email || ""}
                            readOnly
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Recipient Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Recipient Full Name *
                        </label>
                        <input
                          name="recipientName"
                          type="text"
                          placeholder="Enter recipient's full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-red-500" />
                          Required Blood Group *
                        </label>
                        <div className="relative">
                          <select
                            name="bloodGroup"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white"
                            required
                          >
                            <option value="">Select blood group</option>
                            {bloodGroups.map((group) => (
                              <option key={group} value={group}>
                                {group}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <Droplets className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Location Details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          District *
                        </label>
                        <div className="relative">
                          <select
                            name="district"
                            value={selectedDistrict}
                            onChange={(e) =>
                              setSelectedDistrict(e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white"
                            required
                          >
                            <option value="">Select district</option>
                            {districts.map((d) => (
                              <option key={d.id} value={d.name}>
                                {d.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <MapPin className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Upazila *
                        </label>
                        <div className="relative">
                          <select
                            name="upazila"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white"
                            required
                            disabled={!selectedDistrict}
                          >
                            <option value="" disabled>
                              Select your Upazila
                            </option>
                            {filteredUpazilas.map((u) => (
                              <option value={u.name} key={u.id}>
                                {u.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <MapPin className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Hospital className="w-4 h-4 text-red-500" />
                          Hospital Name *
                        </label>
                        <input
                          name="hospital"
                          type="text"
                          placeholder="Enter hospital name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Full Address *
                        </label>
                        <input
                          name="address"
                          type="text"
                          placeholder="Enter complete address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Donation Schedule
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-red-500" />
                          Donation Date *
                        </label>
                        <input
                          name="donationDate"
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-red-500" />
                          Donation Time *
                        </label>
                        <input
                          name="donationTime"
                          type="time"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-yellow-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Additional Information
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Request Message *
                      </label>
                      <textarea
                        name="message"
                        rows="4"
                        placeholder="Please provide details about why blood is needed, patient condition, any special requirements..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Clear information helps donors understand the urgency
                        and respond quickly.
                      </p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-1">
                          Important Information
                        </h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>
                            • Please ensure all information is accurate before
                            submitting
                          </li>
                          <li>
                            • Your request will be visible to registered donors
                            in your area
                          </li>
                          <li>
                            • You will be notified when a donor responds to your
                            request
                          </li>
                          <li>
                            • For emergencies, please contact hospital
                            authorities directly
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    {...buttonHoverAnimation}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span>Submit Donation Request</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <motion.div
                  animate={pulseAnimation}
                  className="bg-white rounded-2xl p-8 shadow-2xl text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center mb-4 mx-auto">
                    <Droplets className="w-10 h-10 text-red-500 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Processing Your Request
                  </h3>
                  <p className="text-gray-600">
                    Please wait while we save your donation request...
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddRequest;
