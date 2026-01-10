import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  Heart,
  Users,
  Shield,
  Clock,
  Phone,
  Mail,
  MapPin,
  Search,
  UserPlus,
  ChevronRight,
  ArrowRight,
  Droplets,
  Activity,
  AlertTriangle,
  Star,
  Zap,
  Award,
  Calendar,
  Globe,
  Truck,
  Bell,
  Target,
  CheckCircle,
  TrendingUp,
  Gift
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";

const Home = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeUrgency, setActiveUrgency] = useState("Critical");
  const [floatingDonors, setFloatingDonors] = useState([]);
  const controls = useAnimation();

  // Floating donors animation
  useEffect(() => {
    const donors = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      speed: 0.5 + Math.random() * 2
    }));
    setFloatingDonors(donors);
  }, []);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  // Blood droplet animation
  const bloodDropletVariants = {
    initial: { y: -100, opacity: 0 },
    animate: (i) => ({
      y: ["0%", "100%"],
      x: ["0%", `${Math.random() * 100 - 50}%`],
      opacity: [0, 1, 0],
      transition: {
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.3,
        ease: "linear"
      }
    })
  };

  // Stats counter animation
  const Counter = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }, [end, duration]);

    return <span>{count.toLocaleString()}+</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-red-50/20 to-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Floating Blood Droplets */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={bloodDropletVariants}
            initial="initial"
            animate="animate"
            className="absolute text-4xl opacity-10"
            style={{ left: `${Math.random() * 100}%` }}
          >
            🩸
          </motion.div>
        ))}

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #dc2626 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />

        {/* Floating Hearts */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`
            }}
          >
            <Heart className="w-8 h-8 text-red-200/30" />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Animated Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full border border-red-200"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.7)",
                      "0 0 0 10px rgba(239, 68, 68, 0)",
                      "0 0 0 0 rgba(239, 68, 68, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Heart className="w-4 h-4 text-red-500" />
                  </motion.div>
                  <span className="text-sm font-semibold text-red-600">
                    Join 10,000+ Life Savers
                  </span>
                </motion.div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                  <span className="block text-gray-800">Your Blood</span>
                  <motion.span
                    className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: "200% auto"
                    }}
                  >
                    Can Restart a Heartbeat
                  </motion.span>
                </h1>

                <p className="text-xl text-gray-600 mb-10 max-w-xl">
                  Every 2 seconds, someone needs blood. Your single donation can save up to 
                  <span className="font-bold text-red-600"> 3 lives</span>. Join our mission today.
                </p>

                {/* Real-time Stats */}
                <motion.div
                  className="mb-10 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-red-500 animate-pulse" />
                      <span className="font-semibold text-gray-700">Live Updates</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {currentTime.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        <Counter end={47} duration={1} />
                      </div>
                      <div className="text-sm text-gray-500">Active Requests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        <Counter end={128} duration={1.5} />
                      </div>
                      <div className="text-sm text-gray-500">Donors Online</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        <Counter end={23} duration={1} />
                      </div>
                      <div className="text-sm text-gray-500">Urgent Cases</div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <Link
                      to="/register"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 shadow-lg shadow-red-200"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <UserPlus className="w-5 h-5" />
                      </motion.div>
                      <span>Become a Donor</span>
                    </Link>
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300 -z-10" />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/search"
                      className="inline-flex items-center gap-3 px-8 py-4 border-2 border-red-500 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-all duration-300 bg-white"
                    >
                      <Search className="w-5 h-5" />
                      <span>Find Blood Now</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Content - Interactive Search Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 rounded-3xl opacity-75"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                  {/* Floating Donor Avatars */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-red-400 to-pink-400 shadow-lg"
                        style={{ marginLeft: i > 0 ? "-10px" : "0" }}
                        animate={{
                          y: [0, -10, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>

                  <div className="text-center mb-8">
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl mb-4"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Search className="w-10 h-10 text-red-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800">Find Blood Fast</h3>
                    <p className="text-gray-600">Search available donors in minutes</p>
                  </div>

                  <div className="space-y-6">
                    {/* Blood Type Grid */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Blood Type
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"].map((type) => (
                          <motion.button
                            key={type}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="py-3 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 text-sm font-medium transition-all duration-200"
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Location
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none transition-all">
                          <option>Select District</option>
                          <option>Dhaka</option>
                          <option>Chittagong</option>
                          <option>Sylhet</option>
                        </select>
                        <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-red-300 outline-none transition-all">
                          <option>Select Area</option>
                          <option>Gulshan</option>
                          <option>Banani</option>
                          <option>Uttara</option>
                        </select>
                      </div>
                    </div>

                    {/* Urgency Selector */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Urgency Level
                      </label>
                      <div className="flex gap-3">
                        {["Normal", "Urgent", "Critical"].map((level) => (
                          <motion.button
                            key={level}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveUrgency(level)}
                            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                              activeUrgency === level
                                ? level === "Normal"
                                  ? "bg-green-500 text-white shadow-lg"
                                  : level === "Urgent"
                                  ? "bg-yellow-500 text-white shadow-lg"
                                  : "bg-red-500 text-white shadow-lg"
                                : level === "Normal"
                                ? "bg-green-50 text-green-700"
                                : level === "Urgent"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {level}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Search Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      />
                      <span className="relative flex items-center justify-center gap-3">
                        <Search className="w-5 h-5" />
                        Search Available Donors
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Numbers */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              Impact in <span className="text-red-600">Numbers</span>
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See the difference we're making together
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: 10000,
                label: "Active Donors",
                icon: Users,
                color: "from-blue-500 to-cyan-500",
                suffix: "+"
              },
              {
                value: 50000,
                label: "Lives Saved",
                icon: Heart,
                color: "from-red-500 to-pink-500",
                suffix: "+"
              },
              {
                value: 25000,
                label: "Requests Fulfilled",
                icon: CheckCircle,
                color: "from-green-500 to-emerald-500",
                suffix: "+"
              },
              {
                value: 45,
                label: "Min Response Time",
                icon: Zap,
                color: "from-purple-500 to-violet-500",
                suffix: " min"
              }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="pt-8 text-center">
                    <div className="text-4xl font-bold text-gray-800 mb-2">
                      <Counter end={stat.value} duration={2} />{stat.suffix}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              How <span className="text-red-600">It Works</span>
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to become a lifesaver
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-pink-500 to-purple-500 hidden md:block"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />

            <div className="space-y-12 md:space-y-0">
              {[
                {
                  step: 1,
                  title: "Register & Verify",
                  description: "Create your profile and verify your eligibility",
                  icon: UserPlus,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: 2,
                  title: "Get Matched Instantly",
                  description: "Receive notifications for nearby requests",
                  icon: Target,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: 3,
                  title: "Donate & Track Impact",
                  description: "See how many lives you've saved",
                  icon: Award,
                  color: "from-red-500 to-orange-500"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className={`relative md:flex items-center ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Step Content */}
                  <div className={`flex-1 ${idx % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                          <item.icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-10">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <span className="text-white font-bold text-xl">{item.step}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Requests Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
              >
                <span className="text-red-600">Urgent</span> Requests
              </motion.h2>
              <p className="text-gray-600">Patients in critical need right now</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 md:mt-0 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              <Bell className="w-5 h-5" />
              View All Requests
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className="flex items-center gap-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="font-semibold text-red-600">CRITICAL</span>
                    </motion.div>
                    <span className="text-sm text-gray-500">1 hour ago</span>
                  </div>

                  {/* Blood Type */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center">
                      <Droplets className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Blood Type: O+</h3>
                      <p className="text-gray-600">Need 3 units • Apollo Hospital</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Gulshan, Dhaka</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>Emergency: +880 1234 567890</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Required: Within 2 hours</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:shadow-md transition-shadow"
                  >
                    I Can Help Save This Life
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donor Rewards & Recognition */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-gray-800 mb-4"
            >
              Donor <span className="text-red-600">Recognition</span>
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Celebrate your life-saving contributions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Badge System",
                description: "Earn badges for each donation milestone",
                icon: Award,
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Leaderboard",
                description: "Top donors featured on our honor wall",
                icon: TrendingUp,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Gift Rewards",
                description: "Receive appreciation gifts and certificates",
                icon: Gift,
                color: "from-green-500 to-emerald-500"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
                >
                  Learn more →
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact Card */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-gradient-to-br from-red-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-12 text-white">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-6">
                      Need Blood <span className="text-yellow-300">Urgently?</span>
                    </h3>
                    <p className="text-xl mb-8 opacity-90">
                      Our 24/7 emergency helpline connects you with available donors immediately
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Phone className="w-8 h-8" />
                        <div>
                          <div className="text-2xl font-bold">+880 9606 111 222</div>
                          <div className="opacity-90">Emergency Hotline</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Globe className="w-8 h-8" />
                        <div>
                          <div className="text-2xl font-bold">106</div>
                          <div className="opacity-90">National Emergency</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm"
                    >
                      <AlertTriangle className="w-24 h-24 text-yellow-300" />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-64 h-64 border-2 border-yellow-300/30 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center"
                >
                  <Heart className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <div className="text-2xl font-bold">LifeStream</div>
                  <div className="text-sm text-gray-400">Blood Donation Network</div>
                </div>
              </div>
              <p className="text-gray-400">
                Connecting donors with recipients to save lives through timely blood donations.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Search Donors", "Blood Requests", "Become a Donor", "About Us"].map((link, idx) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Resources</h4>
              <ul className="space-y-3">
                {["FAQ", "Blog", "Privacy Policy", "Terms of Service", "Contact"].map((link, idx) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Stay Connected</h4>
              <p className="text-gray-400 mb-4">Subscribe for urgent alerts</p>
              <div className="flex mb-6">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-r-lg font-medium"
                >
                  Subscribe
                </motion.button>
              </div>
              <div className="flex gap-4">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    {social.charAt(0)}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} LifeStream Blood Donation Network. All rights reserved.
            </p>
            <p className="mt-2 text-sm">
              Made with ❤️ to save lives | Every drop counts
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;