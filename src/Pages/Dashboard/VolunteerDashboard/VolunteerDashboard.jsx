import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  User,
  Mail,
  Camera,
  Droplets,
  MapPin,
  ChevronDown,
  ChevronUp,
  Shield,
  CheckCircle,
  Upload,
  Users,
  ArrowRight,
  Heart,
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  pageVariants,
  cardVariants,
  pulseAnimation,
  textGradientAnimation,
  buttonHoverAnimation,
  rotateAnimation,
} from "../../../utils/AnimationUtils";

const VolunteerDashboard = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showUpazilaDropdown, setShowUpazilaDropdown] = useState(false);
  const [showBloodDropdown, setShowBloodDropdown] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    blood: "",
    district: "",
    upazila: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const axiosInstance = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([axios.get("/upazila.json"), axios.get("/district.json")])
      .then(([upazilaRes, districtRes]) => {
        setUpazilas(upazilaRes.data.upazilas || []);
        setDistricts(districtRes.data.districts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
        toast.error("Failed to load location data");
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddvolunteer = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const fullName = e.target.fullName.value;
    const photoURL = e.target.photoURL;
    const file = photoURL.files[0];
    const blood = e.target.blood.value;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;

    const loadingToast = toast.loading("Processing volunteer registration...", {
      position: "top-center",
      theme: "colored",
    });

    try {
      let mainPhotoUrl = "";

      if (file) {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=4ef5a5f7c97e1a04cc960bb3d1e91b93`,
          { image: file },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        mainPhotoUrl = res.data.data.display_url;
      }

      const formData = {
        email,
        fullName,
        mainPhotoUrl,
        blood,
        district,
        upazila,
        role: "volunteer",
      };

      await axiosInstance.post("/add-volunteers", formData);

      toast.update(loadingToast, {
        render: "Volunteer Added successfully! 🎉",
        type: "success",
        isLoading: false,
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        closeButton: true,
      });

      setTimeout(() => {
        navigate("/volunteers");
      }, 1500);
    } catch (error) {
      console.error("Error adding volunteer:", error);
      toast.update(loadingToast, {
        render: "Failed to add volunteer. Please try again.",
        type: "error",
        isLoading: false,
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
        closeButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <div className="lg:ml-72">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={cardVariants} className="text-center mb-10">
              <motion.div
                animate={pulseAnimation}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-pink-100 mb-6"
              >
                <UserPlus className="w-10 h-10 text-red-500" />
              </motion.div>
              <motion.h1
                animate={textGradientAnimation.animate}
                transition={textGradientAnimation.transition}
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
                Join as a Volunteer
              </motion.h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Become a volunteer and help save lives by connecting donors with
                those in need
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-8">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <motion.div
                    animate={rotateAnimation.animate}
                    transition={rotateAnimation.transition}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Shield className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white">
                      Volunteer Registration
                    </h2>
                    <p className="text-white/80">
                      Fill out the form below to join our volunteer team
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAddvolunteer} className="p-8">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-red-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Personal Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <User className="w-4 h-4 text-red-500" />
                          Full Name *
                        </label>
                        <input
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-red-500" />
                          Email Address *
                        </label>
                        <input
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Camera className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Profile Photo
                      </h3>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                      {previewImage && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative"
                        >
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-200 shadow-lg">
                            <img
                              src={previewImage}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      )}

                      <div className="w-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Upload className="w-4 h-4 text-red-500" />
                          Upload Profile Photo
                        </label>
                        <div className="relative">
                          <input
                            name="photoURL"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Upload a clear profile picture (max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Droplets className="w-5 h-5 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Medical & Location Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-red-500" />
                          Blood Group *
                        </label>
                        <div className="relative">
                          <select
                            name="blood"
                            value={formData.blood}
                            onChange={handleInputChange}
                            onFocus={() => setShowBloodDropdown(true)}
                            onBlur={() =>
                              setTimeout(() => setShowBloodDropdown(false), 200)
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white cursor-pointer"
                            required
                          >
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map((group) => (
                              <option key={group} value={group}>
                                {group}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            {showBloodDropdown ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          District *
                        </label>
                        <div className="relative">
                          <select
                            name="district"
                            value={formData.district}
                            onChange={handleInputChange}
                            onFocus={() => setShowDistrictDropdown(true)}
                            onBlur={() =>
                              setTimeout(
                                () => setShowDistrictDropdown(false),
                                200
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white cursor-pointer"
                            required
                          >
                            <option value="">Select District</option>
                            {districts.map((d) => (
                              <option key={d.id} value={d.name}>
                                {d.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            {showDistrictDropdown ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          Upazila *
                        </label>
                        <div className="relative">
                          <select
                            name="upazila"
                            value={formData.upazila}
                            onChange={handleInputChange}
                            onFocus={() => setShowUpazilaDropdown(true)}
                            onBlur={() =>
                              setTimeout(
                                () => setShowUpazilaDropdown(false),
                                200
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white cursor-pointer"
                            required
                          >
                            <option value="">Select Upazila</option>
                            {upazilas.map((u) => (
                              <option key={u.id} value={u.name}>
                                {u.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            {showUpazilaDropdown ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                  >
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-blue-800 mb-2">
                          Volunteer Responsibilities
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Verify donation requests and donor information
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Connect donors with recipients in your area
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Monitor donation status and provide updates
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Ensure safe and ethical donation practices
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
                          animate={rotateAnimation.animate}
                          transition={rotateAnimation.transition}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Processing Registration...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        <span>Join as Volunteer</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                >
                  <motion.div
                    animate={pulseAnimation}
                    className="bg-white rounded-2xl p-8 shadow-2xl text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center mb-4 mx-auto">
                      <Heart className="w-10 h-10 text-red-500 animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Registering Volunteer
                    </h3>
                    <p className="text-gray-600">
                      Please wait while we process your registration...
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
