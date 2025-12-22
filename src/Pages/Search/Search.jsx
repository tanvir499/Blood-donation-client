import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search as SearchIcon, 
  Filter, 
  Users, 
  MapPin, 
  Droplets,
  ChevronDown,
  Loader2,
  X,
  CheckCircle,
  Phone,
  Calendar,
  Download
} from "lucide-react";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const Search = () => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    district: "",
    upazila: ""
  });
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Load districts and upazilas data
  useEffect(() => {
    axios.get("./district.json")
      .then(res => setDistricts(res.data.districts))
      .catch(err => console.error("Error loading districts:", err));

    axios.get("./upazila.json")
      .then(res => {
        setUpazilas(res.data.upazilas);
        setFilteredUpazilas(res.data.upazilas);
      })
      .catch(err => console.error("Error loading upazilas:", err));
  }, []);

  // Filter upazilas based on selected district
  useEffect(() => {
    if (formData.district) {
      const filtered = upazilas.filter(u => u.district === formData.district);
      setFilteredUpazilas(filtered);
      if (!filtered.some(u => u.name === formData.upazila)) {
        setFormData(prev => ({ ...prev, upazila: "" }));
      }
    } else {
      setFilteredUpazilas(upazilas);
    }
  }, [formData.district, upazilas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!formData.bloodGroup || !formData.district || !formData.upazila) {
      alert("Please fill all fields to search");
      return;
    }

    setIsSearching(true);
    setLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      // Mock donor data
      const mockDonors = [
        {
          id: 1,
          name: "John Doe",
          bloodGroup: formData.bloodGroup,
          district: formData.district,
          upazila: formData.upazila,
          lastDonation: "2024-01-15",
          availability: "Available",
          phone: "+880 1234 567890",
          email: "john@example.com",
          avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random"
        },
        {
          id: 2,
          name: "Jane Smith",
          bloodGroup: formData.bloodGroup,
          district: formData.district,
          upazila: formData.upazila,
          lastDonation: "2024-02-20",
          availability: "Available",
          phone: "+880 9876 543210",
          email: "jane@example.com",
          avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
        },
        {
          id: 3,
          name: "Robert Johnson",
          bloodGroup: formData.bloodGroup,
          district: formData.district,
          upazila: formData.upazila,
          lastDonation: "2024-01-30",
          availability: "Not Available",
          phone: "+880 5555 666666",
          email: "robert@example.com",
          avatar: "https://ui-avatars.com/api/?name=Robert+Johnson&background=random"
        }
      ];

      setDonors(mockDonors);
      setLoading(false);
      setIsSearching(false);
      setShowResults(true);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ bloodGroup: "", district: "", upazila: "" });
    setShowResults(false);
    setDonors([]);
  };

  const handleDownloadPDF = () => {
    setDownloadLoading(true);
    const input = document.getElementById('search-results-pdf');
    
    html2canvas(input, { 
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`blood-donors-${formData.bloodGroup}-${formData.district}.pdf`);
      setDownloadLoading(false);
    }).catch(error => {
      console.error("PDF generation error:", error);
      setDownloadLoading(false);
    });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  const pulse = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: ["0%", "100%", "0%"],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-100 to-pink-100 opacity-10 blur-3xl"
        />
      </div>

      {/* Floating Icons */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 360, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "easeInOut"
        }}
        className="hidden lg:block absolute top-20 right-20 text-4xl opacity-10"
      >
        🔍
      </motion.div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.h1
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              background: "linear-gradient(90deg, #dc2626, #ec4899, #dc2626)",
              backgroundSize: "200% auto",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Find Blood Donors
          </motion.h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Search for compatible blood donors in your area. Your search could save a life.
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Search Filters</h2>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Blood Group */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-red-500" />
                      Blood Group
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none appearance-none transition-all bg-white"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </motion.div>

                {/* District */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      District
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none appearance-none transition-all bg-white"
                      required
                    >
                      <option value="">Select District</option>
                      {districts.map(district => (
                        <option key={district.id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </motion.div>

                {/* Upazila */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Upazila
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      name="upazila"
                      value={formData.upazila}
                      onChange={handleChange}
                      disabled={!formData.district}
                      className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none appearance-none transition-all bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                      required
                    >
                      <option value="">{formData.district ? "Select Upazila" : "Select District First"}</option>
                      {filteredUpazilas.map(upazila => (
                        <option key={upazila.id} value={upazila.name}>
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </motion.div>
              </div>

              {/* Form Actions */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <SearchIcon className="w-5 h-5" />
                      Search Donors
                    </>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Reset
                </motion.button>
              </motion.div>
            </form>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">1000+</div>
                  <div className="text-sm text-gray-600">Active Donors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">8</div>
                  <div className="text-sm text-gray-600">Blood Groups</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">64</div>
                  <div className="text-sm text-gray-600">Districts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">490+</div>
                  <div className="text-sm text-gray-600">Upazilas</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Search Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              id="results-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              {/* Results Header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Search Results
                  </h2>
                  <p className="text-gray-600">
                    Found {donors.length} donors for {formData.bloodGroup} in {formData.district}, {formData.upazila}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadPDF}
                  disabled={downloadLoading}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  {downloadLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Download PDF
                </motion.button>
              </motion.div>

              {/* PDF Content (hidden for display) */}
              <div id="search-results-pdf" className="hidden">
                <div className="p-8 bg-white">
                  <h1 className="text-2xl font-bold text-center mb-6">Blood Donors Search Results</h1>
                  <div className="mb-6">
                    <p>Blood Group: {formData.bloodGroup}</p>
                    <p>District: {formData.district}</p>
                    <p>Upazila: {formData.upazila}</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                  </div>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-red-50">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Blood Group</th>
                        <th className="border p-2">Location</th>
                        <th className="border p-2">Last Donation</th>
                        <th className="border p-2">Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donors.map((donor, index) => (
                        <tr key={donor.id}>
                          <td className="border p-2">{donor.name}</td>
                          <td className="border p-2">{donor.bloodGroup}</td>
                          <td className="border p-2">{donor.upazila}, {donor.district}</td>
                          <td className="border p-2">{donor.lastDonation}</td>
                          <td className="border p-2">{donor.availability}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Donor Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {donors.map((donor, index) => (
                  <motion.div
                    key={donor.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-200"
                          >
                            <img 
                              src={donor.avatar} 
                              alt={donor.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-gray-800">{donor.name}</h3>
                            <div className="flex items-center gap-2">
                              <Droplets className="w-4 h-4 text-red-500" />
                              <span className="font-bold text-red-600">{donor.bloodGroup}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={pulse}
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            donor.availability === "Available" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {donor.availability}
                        </motion.div>
                      </div>

                      {/* Donor Details */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{donor.upazila}, {donor.district}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>Last Donation: {donor.lastDonation}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{donor.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={donor.availability !== "Available"}
                        className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
                          donor.availability === "Available"
                            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-md"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        {donor.availability === "Available" ? "Contact Donor" : "Currently Unavailable"}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* No Results Message */}
              {donors.length === 0 && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Donors Found</h3>
                  <p className="text-gray-600">
                    No donors matching your criteria were found. Try adjusting your search parameters.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              Search Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Be Specific</h4>
                    <p className="text-sm text-gray-600">
                      Select your exact location to find nearby donors quickly
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Check Availability</h4>
                    <p className="text-sm text-gray-600">
                      Look for donors marked as "Available" for immediate response
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Recent Donors</h4>
                    <p className="text-sm text-gray-600">
                      Donors who donated recently are more likely to respond
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                    <span className="text-xs font-bold text-blue-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Emergency Contact</h4>
                    <p className="text-sm text-gray-600">
                      For emergencies, call our hotline: +880 1234 567890
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Search;