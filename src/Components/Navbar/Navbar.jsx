import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import auth from "../../firebase/firebase.config";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Droplets,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Home,
  Search,
  DollarSign,
  LogOut,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { rotateAnimation } from "../../utils/AnimationUtils";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut(auth);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/", icon: <Home className="w-4 h-4" />, label: "Home" },
    {
      to: "/donation-Request",
      icon: <Droplets className="w-4 h-4" />,
      label: "Donation Requests",
    },
    { to: "/search", icon: <Search className="w-4 h-4" />, label: "Search" },
    {
      to: "/donate",
      icon: <DollarSign className="w-4 h-4" />,
      label: "Funding",
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent"
              >
                LifeStream
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs text-gray-500 -mt-1"
              >
                Save Lives, Donate Blood
              </motion.span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={link.to}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300 group relative"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {link.icon}
                  </motion.div>
                  <span className="font-medium">{link.label}</span>
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                  />
                </Link>
              </motion.div>
            ))}

            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer pl-4"
                >
                  <div className="relative">
                    <motion.div
                      animate={rotateAnimation.animate}
                      transition={rotateAnimation.transition}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-20"
                    />
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-200 relative">
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
                        }
                        alt={user.displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                    >
                      <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-200">
                            <img
                              src={
                                user.photoURL ||
                                `https://ui-avatars.com/api/?name=${user.displayName}&background=random`
                              }
                              alt={user.displayName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 truncate">
                              {user.displayName}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors group"
                        >
                          <motion.div
                            whileHover={{ rotate: 10 }}
                            className="w-5 h-5"
                          >
                            <Shield className="w-5 h-5" />
                          </motion.div>
                          <span>Dashboard</span>
                        </Link>

                        <div className="border-t border-gray-100 my-1" />

                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors text-left group"
                        >
                          <motion.div whileHover={{ x: 5 }} className="w-5 h-5">
                            <LogOut className="w-5 h-5" />
                          </motion.div>
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-red-200 transition-all duration-300 transform hover:-translate-y-0.5 group"
                >
                  <UserIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Login</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-1"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 text-gray-700 hover:text-red-500 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300 group"
                    >
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="w-5 h-5"
                      >
                        {link.icon}
                      </motion.div>
                      <span className="font-medium">{link.label}</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="ml-auto"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}

                {user ? (
                  <>
                    <div className="border-t border-gray-200 my-2 pt-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300"
                      >
                        <Shield className="w-5 h-5" />
                        <span>Dashboard</span>
                      </Link>

                      <button
                        onClick={() => {
                          handleSignOut();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300 text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-4 border-t border-gray-200"
                  >
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>Login / Register</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        animate={{
          y: [0, -5, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg"
      />
    </motion.nav>
  );
};

export default Navbar;
