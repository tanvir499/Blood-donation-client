import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  RefreshCw,
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  Droplets, 
  CheckCircle, 
  XCircle, 
  Eye, 
  AlertCircle,
  Heart,
  Activity,
  TrendingUp,
  Users,
  BarChart3,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VolunteerDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    district: 'all',
    bloodGroup: 'all',
    dateRange: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Blood groups for filter
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  
  // Get unique districts from requests
  const uniqueDistricts = [...new Set(requests.map(req => req.district))].filter(Boolean);

  useEffect(() => {
    if (user?.email) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = () => {
    setLoading(true);
    axiosSecure.get('/all-requests')
      .then(res => {
        const requestsData = res.data;
        setRequests(requestsData);
        setFilteredRequests(requestsData);
        calculateStats(requestsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching requests:', error);
        toast.error('Failed to load requests', {
          position: "top-right",
          theme: "colored",
        });
        setLoading(false);
      });
  };

  const calculateStats = (data) => {
    const stats = {
      totalRequests: data.length,
      pending: data.filter(req => req.status === 'pending').length,
      inProgress: data.filter(req => req.status === 'inprogress').length,
      completed: data.filter(req => req.status === 'done').length,
      cancelled: data.filter(req => req.status === 'cancelled').length
    };
    setStats(stats);
  };

  useEffect(() => {
    let filtered = [...requests];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.recipientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.requesterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(req => req.status === filters.status);
    }

    // Apply district filter
    if (filters.district !== 'all') {
      filtered = filtered.filter(req => req.district === filters.district);
    }

    // Apply blood group filter
    if (filters.bloodGroup !== 'all') {
      filtered = filtered.filter(req => req.bloodGroup === filters.bloodGroup);
    }

    // Apply date range filter (simplified)
    if (filters.dateRange !== 'all') {
      const today = new Date();
      filtered = filtered.filter(req => {
        const reqDate = new Date(req.donationDate);
        const diffTime = today - reqDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        switch (filters.dateRange) {
          case 'today':
            return diffDays < 1;
          case 'week':
            return diffDays < 7;
          case 'month':
            return diffDays < 30;
          default:
            return true;
        }
      });
    }

    setFilteredRequests(filtered);
  }, [requests, searchTerm, filters]);

  const handleStatusUpdate = (requestId, newStatus) => {
    axiosSecure.patch(`/request-status/${requestId}`, { status: newStatus })
      .then(() => {
        toast.success(`Request marked as ${newStatus}!`, {
          position: "top-right",
          theme: "colored",
        });
        
        // Update local state
        const updatedRequests = requests.map(req => 
          req._id === requestId ? { ...req, status: newStatus } : req
        );
        setRequests(updatedRequests);
        calculateStats(updatedRequests);
      })
      .catch(error => {
        console.error('Error updating status:', error);
        toast.error('Failed to update status', {
          position: "top-right",
          theme: "colored",
        });
      });
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      district: 'all',
      bloodGroup: 'all',
      dateRange: 'all'
    });
    setSearchTerm('');
    setFilteredRequests(requests);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200';
      case 'inprogress':
        return 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200';
      case 'done':
        return 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200';
      case 'cancelled':
        return 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString || 'Not specified';
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

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
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
            <Heart className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Loading Dashboard</h3>
          <p className="text-gray-600 mt-2">Getting volunteer information ready...</p>
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
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ["0%", "100%", "0%"],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-100 to-pink-100 opacity-10 blur-3xl"
        />
      </div>

      {/* Main Content with Sidebar Margin */}
      <div className="lg:ml-72">
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Welcome Section */}
          <motion.div
            variants={cardVariants}
            className="mb-10"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Volunteer Dashboard 👨‍⚕️
                </h1>
                <p className="text-gray-600">
                  Manage and monitor blood donation requests
                </p>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchRequests}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </motion.button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {/* Total Requests */}
              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Requests</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.totalRequests}</p>
                  </div>
                  <motion.div
                    animate={floatAnimation}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center"
                  >
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Pending */}
              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Pending</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
                  </div>
                  <motion.div
                    animate={pulseAnimation}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 flex items-center justify-center"
                  >
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                  </motion.div>
                </div>
              </motion.div>

              {/* In Progress */}
              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">In Progress</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.inProgress}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center"
                  >
                    <Activity className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Completed */}
              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Completed</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.completed}</p>
                  </div>
                  <motion.div
                    animate={pulseAnimation}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Cancelled */}
              <motion.div
                variants={cardVariants}
                transition={{ delay: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Cancelled</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.cancelled}</p>
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

          {/* Search and Filter Bar */}
          <motion.div
            variants={cardVariants}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by recipient name, requester, district, or blood group..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Filter Toggle Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                  {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </motion.button>

                {/* Reset Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetFilters}
                  className="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </motion.button>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* District Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        District
                      </label>
                      <select
                        value={filters.district}
                        onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      >
                        <option value="all">All Districts</option>
                        {uniqueDistricts.map((district, index) => (
                          <option key={index} value={district}>{district}</option>
                        ))}
                      </select>
                    </div>

                    {/* Blood Group Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group
                      </label>
                      <select
                        value={filters.bloodGroup}
                        onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      >
                        <option value="all">All Blood Groups</option>
                        {bloodGroups.map((group) => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date Range
                      </label>
                      <select
                        value={filters.dateRange}
                        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Count */}
              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing <span className="font-bold text-gray-800">{filteredRequests.length}</span> of <span className="font-bold text-gray-800">{requests.length}</span> requests
                </p>
                {searchTerm && (
                  <p className="text-sm text-gray-500">
                    Search results for: "{searchTerm}"
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* All Blood Donation Requests */}
          <motion.div
            variants={cardVariants}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">All Blood Donation Requests</h2>
                <p className="text-gray-600">Manage and update donation requests</p>
              </div>
            </div>

            {/* Table - Desktop */}
            {filteredRequests.length > 0 ? (
              <>
                <div className="hidden lg:block">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-red-50 to-pink-50">
                          <th className="p-6 text-left">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-700">Recipient</span>
                            </div>
                          </th>
                          <th className="p-6 text-left">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-700">Location</span>
                            </div>
                          </th>
                          <th className="p-6 text-left">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-700">Date & Time</span>
                            </div>
                          </th>
                          <th className="p-6 text-left">
                            <div className="flex items-center gap-2">
                              <Droplets className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-700">Blood Group</span>
                            </div>
                          </th>
                          <th className="p-6 text-left">
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-700">Status</span>
                            </div>
                          </th>
                          <th className="p-6 text-left">
                            <span className="font-semibold text-gray-700">Volunteer Actions</span>
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
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.05)" }}
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
                                      Requested by {request.requesterName}
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
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                                    {request.status || "Unknown"}
                                  </span>
                                  
                                  {/* Status Update Options (Volunteer Permission) */}
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {request.status === 'pending' && (
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleStatusUpdate(request._id, 'inprogress')}
                                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                      >
                                        <Activity className="w-3 h-3" />
                                        Mark In Progress
                                      </motion.button>
                                    )}
                                    
                                    {request.status === 'inprogress' && (
                                      <>
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={() => handleStatusUpdate(request._id, 'done')}
                                          className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                        >
                                          <CheckCircle className="w-3 h-3" />
                                          Mark Done
                                        </motion.button>
                                        <motion.button
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={() => handleStatusUpdate(request._id, 'cancelled')}
                                          className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                        >
                                          <XCircle className="w-3 h-3" />
                                          Cancel
                                        </motion.button>
                                      </>
                                    )}
                                    
                                    {(request.status === 'pending' || request.status === 'inprogress') && (
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleStatusUpdate(request._id, 'cancelled')}
                                        className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                      >
                                        <XCircle className="w-3 h-3" />
                                        Cancel
                                      </motion.button>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="p-6">
                                <div className="flex items-center gap-2">
                                  {/* View Details Button Only (Volunteer Permission) */}
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSelectedRequest(request)}
                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                                    title="View Details"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View
                                  </motion.button>
                                  
                                  {/* Volunteer Permission Notice */}
                                  <div className="text-xs text-gray-500 max-w-xs">
                                    <p>Volunteer permission: Status update only</p>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Cards - Mobile */}
                <div className="lg:hidden space-y-4">
                  <AnimatePresence>
                    {filteredRequests.map((request, index) => (
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
                          {/* Card Header */}
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
                                <p className="text-sm text-gray-500 mt-1">
                                  By: {request.requesterName}
                                </p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                              {request.status || "Unknown"}
                            </span>
                          </div>

                          {/* Card Details */}
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{request.upazila}, {request.district}</span>
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

                          {/* Action Buttons (Volunteer Permission) */}
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {request.status === 'pending' && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleStatusUpdate(request._id, 'inprogress')}
                                  className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                >
                                  <Activity className="w-3 h-3" />
                                  Mark In Progress
                                </motion.button>
                              )}
                              
                              {request.status === 'inprogress' && (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleStatusUpdate(request._id, 'done')}
                                    className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                  >
                                    <CheckCircle className="w-3 h-3" />
                                    Mark Done
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleStatusUpdate(request._id, 'cancelled')}
                                    className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                  >
                                    <XCircle className="w-3 h-3" />
                                    Cancel
                                  </motion.button>
                                </>
                              )}
                              
                              {(request.status === 'pending' || request.status === 'inprogress') && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleStatusUpdate(request._id, 'cancelled')}
                                  className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-1"
                                >
                                  <XCircle className="w-3 h-3" />
                                  Cancel
                                </motion.button>
                              )}
                            </div>

                            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedRequest(request)}
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </motion.button>
                              
                              <div className="text-xs text-gray-500 text-right">
                                <p>Volunteer access only</p>
                                <p className="text-[10px]">Status update permission</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              /* No Requests Found */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-gray-100 to-blue-100 mb-6">
                  <Heart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Requests Found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  {searchTerm || Object.values(filters).some(f => f !== 'all')
                    ? "No requests match your search criteria. Try adjusting your filters."
                    : "No blood donation requests available at the moment."}
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

          {/* Request Details Modal */}
          <AnimatePresence>
            {selectedRequest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedRequest(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white sticky top-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8 text-white/80" />
                        <div>
                          <h3 className="text-xl font-bold">Request Details</h3>
                          <p className="text-white/80">Complete information about the donation request</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedRequest(null)}
                        className="text-white hover:text-white/80"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6">
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">Recipient Name</label>
                          <p className="text-lg font-semibold text-gray-800">{selectedRequest.recipientName}</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-500">Requester Name</label>
                          <p className="text-lg font-semibold text-gray-800">{selectedRequest.requesterName}</p>
                        </div>
                      </div>

                      {/* Blood Group */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Required Blood Group</label>
                        <div className="flex items-center gap-2">
                          <Droplets className="w-5 h-5 text-red-500" />
                          <span className="text-2xl font-bold text-red-600">{selectedRequest.bloodGroup}</span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-blue-500" />
                          Location Details
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-500">District</label>
                            <p className="font-medium">{selectedRequest.district}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-500">Upazila</label>
                            <p className="font-medium">{selectedRequest.upazila}</p>
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-sm text-gray-500">Hospital</label>
                            <p className="font-medium">{selectedRequest.hospital}</p>
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-sm text-gray-500">Full Address</label>
                            <p className="font-medium">{selectedRequest.address}</p>
                          </div>
                        </div>
                      </div>

                      {/* Schedule */}
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-purple-500" />
                          Donation Schedule
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-gray-500">Date</label>
                            <p className="font-medium">{formatDate(selectedRequest.donationDate)}</p>
                          </div>
                          <div>
                            <label className="text-sm text-gray-500">Time</label>
                            <p className="font-medium">{formatTime(selectedRequest.donationTime)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Message</label>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700">{selectedRequest.message}</p>
                        </div>
                      </div>

                      {/* Current Status */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500">Current Status</label>
                        <div className="flex items-center justify-between">
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedRequest.status)}`}>
                            {selectedRequest.status}
                          </span>
                          
                          {/* Status Update (Volunteer Permission) */}
                          {selectedRequest.status !== 'done' && selectedRequest.status !== 'cancelled' && (
                            <div className="flex gap-2">
                              {selectedRequest.status === 'pending' && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => {
                                    handleStatusUpdate(selectedRequest._id, 'inprogress');
                                    setSelectedRequest(null);
                                  }}
                                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                                >
                                  <Activity className="w-4 h-4" />
                                  Mark In Progress
                                </motion.button>
                              )}
                              
                              {selectedRequest.status === 'inprogress' && (
                                <>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                      handleStatusUpdate(selectedRequest._id, 'done');
                                      setSelectedRequest(null);
                                    }}
                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                    Mark Done
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                      handleStatusUpdate(selectedRequest._id, 'cancelled');
                                      setSelectedRequest(null);
                                    }}
                                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition-all duration-300 flex items-center gap-2"
                                  >
                                    <XCircle className="w-4 h-4" />
                                    Cancel
                                  </motion.button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Volunteer Notice */}
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-800 mb-1">
                              Volunteer Permissions
                            </h4>
                            <p className="text-sm text-blue-700">
                              As a volunteer, you can only update the status of requests. You cannot edit request details, delete requests, or access other administrative functions.
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

export default VolunteerDashboard;