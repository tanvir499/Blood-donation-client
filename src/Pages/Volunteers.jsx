import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Droplets, MapPin, Mail, Phone, Shield, Heart, Calendar, User, Search, Filter, RefreshCw, ChevronDown, ChevronUp, Star, Award, Activity, Eye
} from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";


const Volunteers = () => {
  const axiosInstance = useAxiosSecure();
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    district: "all",
    upazila: "all",
    bloodGroup: "all"
  });
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/volunteers")
      .then((res) => {
        setVolunteers(res.data);
        setFilteredVolunteers(res.data);
      })
      .finally(() => setLoading(false));
  }, [axiosInstance]);

  useEffect(() => {
    let filtered = [...volunteers];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(volunteer =>
        volunteer.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.upazila?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply district filter
    if (filters.district !== "all") {
      filtered = filtered.filter(volunteer => volunteer.district === filters.district);
    }

    // Apply upazila filter
    if (filters.upazila !== "all") {
      filtered = filtered.filter(volunteer => volunteer.upazila === filters.upazila);
    }

    // Apply blood group filter
    if (filters.bloodGroup !== "all") {
      filtered = filtered.filter(volunteer => volunteer.blood === filters.bloodGroup);
    }

    setFilteredVolunteers(filtered);
  }, [volunteers, searchTerm, filters]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilters({
      district: "all",
      upazila: "all",
      bloodGroup: "all"
    });
    setFilteredVolunteers(volunteers);
  };

 

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20 }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex items-center justify-center">
        <motion.div
          animate={pulseAnimation}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Loading Volunteers</h3>
          <p className="text-gray-600 mt-2">Fetching volunteer information...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">


      <div className="container mx-auto px-4 py-8 md:py-12">
    
        {/* Section Header */}
        <motion.div
          variants={cardVariants}
          transition={{ delay: 0.4 }}
          className="text-center mb-10"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
              <Users className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Volunteer Team</h2>
              <p className="text-gray-600">Our dedicated volunteers across the region</p>
            </div>
          </div>
        </motion.div>

        {/* Volunteers Grid - Full width */}
        <motion.div
          variants={cardVariants}
          transition={{ delay: 0.5 }}
        >
          {filteredVolunteers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredVolunteers.map((volunteer, index) => (
                  <motion.div
                    key={volunteer._id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden group"
                  >
                    {/* Volunteer Card */}
                    <div className="p-6">
                      {/* Profile Image */}
                      <div className="relative mb-6">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-24 h-24 rounded-full mx-auto overflow-hidden border-4 border-red-200 shadow-lg"
                        >
                          <img
                            src={volunteer.mainPhotoUrl || `https://ui-avatars.com/api/?name=${volunteer.fullName}&background=random`}
                            alt={volunteer.fullName}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 rounded-full border-2 border-red-300 border-t-transparent"
                        />
                      </div>

                      {/* Volunteer Info */}
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {volunteer.fullName}
                        </h3>
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm truncate">{volunteer.email}</span>
                        </div>

                        {/* Blood Group Badge */}
                        {volunteer.blood && (
                          <motion.div
                            animate={pulseAnimation}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-4"
                          >
                            <Droplets className="w-4 h-4 text-red-600" />
                            <span className="font-bold text-red-600">{volunteer.blood}</span>
                          </motion.div>
                        )}

                        {/* Location */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{volunteer.upazila}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{volunteer.district}</span>
                          </div>
                        </div>
                      </div>

                      {/* Volunteer Status */}
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <Shield className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-semibold text-blue-600">Verified Volunteer</span>
                      </div>

                      {/* View Details Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedVolunteer(volunteer)}
                        className="w-full py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* No Volunteers Found */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-gray-100 to-blue-100 mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Volunteers Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                {searchTerm || Object.values(filters).some(f => f !== 'all')
                  ? "No volunteers match your search criteria. Try adjusting your filters."
                  : "No volunteers are currently registered."}
              </p>
              {(searchTerm || Object.values(filters).some(f => f !== 'all')) && (
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

        {/* Volunteer Details Modal */}
        <AnimatePresence>
          {selectedVolunteer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedVolunteer(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white/20 overflow-hidden border-2 border-white/30">
                      <img
                        src={selectedVolunteer.mainPhotoUrl || `https://ui-avatars.com/api/?name=${selectedVolunteer.fullName}&background=random`}
                        alt={selectedVolunteer.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedVolunteer.fullName}</h3>
                      <p className="text-white/80">{selectedVolunteer.email}</p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="space-y-6">
                    {/* Blood Group */}
                    {selectedVolunteer.blood && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-red-500" />
                          Blood Group
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-red-600">{selectedVolunteer.blood}</span>
                          <span className="px-3 py-1 bg-red-50 text-red-600 text-sm rounded-full">
                            Donor
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Location
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Upazila</p>
                          <p className="font-medium text-gray-800">{selectedVolunteer.upazila}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">District</p>
                          <p className="font-medium text-gray-800">{selectedVolunteer.district}</p>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="flex items-start gap-3">
                        <Award className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-blue-800 mb-1">Volunteer Status</h4>
                          <p className="text-sm text-blue-700">
                            This volunteer is verified and ready to help save lives. They can assist with blood donation coordination and emergency response.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedVolunteer(null)}
                        className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300"
                      >
                        Close
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                      >
                        Contact Volunteer
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Volunteers;