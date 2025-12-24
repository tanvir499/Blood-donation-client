import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Droplets,
  Phone,
  Calendar,
  Edit2,
  Save,
  X,
  Shield,
  Upload,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  pageVariants,
  cardVariants,
  pulseAnimation,
  buttonHoverAnimation,
} from "../../../utils/AnimationUtils";

const MainDashboard = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [stats, setStats] = useState({
    donations: 0,
    requests: 0,
    savedLives: 0,
    pendingRequests: 0,
    completedRequests: 0,
    recentActivity: [],
  });

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photoURL: "",
    district: "",
    upazila: "",
    bloodGroup: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    lastDonation: "",
    gender: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genders = ["Male", "Female", "Other"];

  useEffect(() => {
    if (user?.email) {
      setLoading(true);

      axiosSecure
        .get(`/user/${user.email}`)
        .then((res) => {
          const userData = res.data;
          setProfileData({
            name: userData.name || user.displayName || "",
            email: userData.email || user.email || "",
            photoURL:
              userData.photoURL ||
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${
                user.displayName || "User"
              }&background=random`,
            district: userData.district || "",
            upazila: userData.upazila || "",
            bloodGroup: userData.bloodGroup || "",
            phone: userData.phone || "",
            address: userData.address || "",
            dateOfBirth: userData.dateOfBirth || "",
            lastDonation: userData.lastDonation || "",
            gender: userData.gender || "",
          });
        })
        .catch(() => {
          setProfileData({
            name: user.displayName || "",
            email: user.email || "",
            photoURL:
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${
                user.displayName || "User"
              }&background=random`,
            district: "",
            upazila: "",
            bloodGroup: "",
            phone: "",
            address: "",
            dateOfBirth: "",
            lastDonation: "",
            gender: "",
          });
        });

      axiosSecure
        .get(`/user-stats/${user.email}`)
        .then((res) => {
          setStats(res.data);
        })
        .catch(() => {
          setStats({
            donations: 0,
            requests: 0,
            savedLives: 0,
            pendingRequests: 0,
            completedRequests: 0,
            recentActivity: [],
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    axiosSecure
      .get("/districts")
      .then((res) => setDistricts(res.data))
      .catch(() => {
        const fallbackDistricts = [
          "Dhaka",
          "Chittagong",
          "Rajshahi",
          "Khulna",
          "Barisal",
          "Sylhet",
          "Rangpur",
          "Mymensingh",
          "Cumilla",
          "Noakhali",
        ].map((name, idx) => ({ id: idx + 1, name }));
        setDistricts(fallbackDistricts);
      });

    axiosSecure
      .get("/upazilas")
      .then((res) => setUpazilas(res.data))
      .catch(() => {
        const fallbackUpazilas = [
          { id: 1, name: "Gulshan", district: "Dhaka" },
          { id: 2, name: "Banani", district: "Dhaka" },
          { id: 3, name: "Kotwali", district: "Chittagong" },
          { id: 4, name: "Chandgaon", district: "Chittagong" },
          { id: 5, name: "Rajshahi City", district: "Rajshahi" },
          { id: 6, name: "Khulna City", district: "Khulna" },
        ];
        setUpazilas(fallbackUpazilas);
      });
  }, [axiosSecure]);

  useEffect(() => {
    if (profileData.district) {
      const filtered = upazilas.filter(
        (u) =>
          u.district &&
          u.district.toLowerCase() === profileData.district.toLowerCase()
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas(upazilas);
    }
  }, [profileData.district, upazilas]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }

    setUploading(true);

    const imageUrl = URL.createObjectURL(file);

    setTimeout(() => {
      setProfileData((prev) => ({ ...prev, photoURL: imageUrl }));
      setUploading(false);
      toast.success("Profile picture updated!", {
        position: "top-right",
        theme: "colored",
      });
    }, 1000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    if (!profileData.name || !profileData.email) {
      toast.error("Name and email are required", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }

    if (
      profileData.bloodGroup &&
      !bloodGroups.includes(profileData.bloodGroup)
    ) {
      toast.error("Please select a valid blood group", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }

    axiosSecure
      .put(`/user/${user.email}`, profileData)
      .then((res) => {
        if (
          profileData.name !== user.displayName ||
          profileData.photoURL !== user.photoURL
        ) {
          updateUserProfile({
            displayName: profileData.name,
            photoURL: profileData.photoURL,
          })
            .then(() => {
              toast.success("Profile updated successfully!", {
                position: "top-right",
                theme: "colored",
              });
              setEditing(false);
            })
            .catch((error) => {
              console.error("Error updating auth profile:", error);
              toast.warning(
                "Profile saved but couldn't update authentication",
                {
                  position: "top-right",
                  theme: "colored",
                }
              );
              setEditing(false);
            });
        } else {
          toast.success("Profile updated successfully!", {
            position: "top-right",
            theme: "colored",
          });
          setEditing(false);
        }
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
        toast.error("Failed to update profile. Please try again.", {
          position: "top-right",
          theme: "colored",
        });
      });
  };

  const handleCancelEdit = () => {
    axiosSecure
      .get(`/user/${user.email}`)
      .then((res) => {
        const userData = res.data;
        setProfileData({
          name: userData.name || user.displayName || "",
          email: userData.email || user.email || "",
          photoURL:
            userData.photoURL ||
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${
              user.displayName || "User"
            }&background=random`,
          district: userData.district || "",
          upazila: userData.upazila || "",
          bloodGroup: userData.bloodGroup || "",
          phone: userData.phone || "",
          address: userData.address || "",
          dateOfBirth: userData.dateOfBirth || "",
          lastDonation: userData.lastDonation || "",
          gender: userData.gender || "",
        });
        setEditing(false);
      })
      .catch(() => {
        setEditing(false);
      });
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
          <motion.div variants={cardVariants} className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Welcome back, {profileData.name}!
                </h1>
                <p className="text-gray-600">
                  Here's your dashboard with all your important information
                </p>
              </div>

              <div className="flex gap-4">
                {!editing ? (
                  <motion.button
                    {...buttonHoverAnimation}
                    onClick={() => setEditing(true)}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancelEdit}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </motion.button>
                    <motion.button
                      {...buttonHoverAnimation}
                      onClick={handleSaveProfile}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
                <div className="relative mb-6">
                  <motion.div
                    animate={pulseAnimation}
                    className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg relative"
                  >
                    <img
                      src={profileData.photoURL}
                      alt={profileData.name}
                      className="w-full h-full object-cover"
                    />
                    {editing && (
                      <label className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                        <div className="text-center">
                          {uploading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2"
                            >
                              <Upload className="w-6 h-6 text-white" />
                            </motion.div>
                          ) : (
                            <>
                              <Camera className="w-12 h-12 text-white mx-auto mb-2" />
                              <span className="text-white font-semibold">
                                Change Photo
                              </span>
                            </>
                          )}
                        </div>
                      </label>
                    )}
                  </motion.div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {profileData.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </div>

                  {profileData.bloodGroup && (
                    <motion.div
                      animate={pulseAnimation}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full"
                    >
                      <Droplets className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-red-600">
                        {profileData.bloodGroup}
                      </span>
                    </motion.div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-600">
                    Verified Donor
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <User className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        Personal Information
                      </h2>
                      <p className="text-white/80">
                        Update your personal details and preferences
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSaveProfile} className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <User className="w-5 h-5 text-red-500" />
                        Basic Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={profileData.email}
                              disabled
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <Shield className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-red-500" />
                            Blood Group
                          </label>
                          <select
                            name="bloodGroup"
                            value={profileData.bloodGroup}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map((group) => (
                              <option key={group} value={group}>
                                {group}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={profileData.gender}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select Gender</option>
                            {genders.map((gender) => (
                              <option key={gender} value={gender}>
                                {gender}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Phone className="w-5 h-5 text-blue-500" />
                        Contact Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            disabled={!editing}
                            placeholder="+880 1XXX XXXXXX"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Street Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={profileData.address}
                            onChange={handleInputChange}
                            disabled={!editing}
                            placeholder="House, Road, Area"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-500" />
                        Location Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            District
                          </label>
                          <select
                            name="district"
                            value={profileData.district}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          >
                            <option value="">Select District</option>
                            {districts.map((district) => (
                              <option key={district.id} value={district.name}>
                                {district.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Upazila
                          </label>
                          <select
                            name="upazila"
                            value={profileData.upazila}
                            onChange={handleInputChange}
                            disabled={!editing || !profileData.district}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          >
                            <option value="">
                              {!profileData.district
                                ? "Select District First"
                                : "Select Upazila"}
                            </option>
                            {filteredUpazilas.map((upazila) => (
                              <option key={upazila.id} value={upazila.name}>
                                {upazila.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        Medical Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={profileData.dateOfBirth}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Last Donation Date
                          </label>
                          <input
                            type="date"
                            name="lastDonation"
                            value={profileData.lastDonation}
                            onChange={handleInputChange}
                            disabled={!editing}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {editing && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100"
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-yellow-800 mb-1">
                              Edit Mode Active
                            </h4>
                            <p className="text-sm text-yellow-700">
                              You are currently editing your profile. Click
                              "Save Changes" to update your information or
                              "Cancel" to discard changes.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {editing && (
                    <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
                      <motion.button
                        {...buttonHoverAnimation}
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Save All Changes
                      </motion.button>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MainDashboard;
