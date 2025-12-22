import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import auth from "../../firebase/firebase.config";
import { motion } from "framer-motion";
import { 
  Heart, 
  Droplets, 
  Activity, 
  Users, 
  ChevronRight, 
  ArrowRight,
  Menu,
  X
} from "lucide-react";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center"
              >
                <Droplets className="w-6 h-6 text-white" />
              </motion.div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent"
              >
                LifeStream
              </motion.span>
            </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Donation Requests Link */}
            <Link 
              to="/blood-donation-requests" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              <Droplets className="w-4 h-4" />
              <span>Donation Requests</span>
            </Link>

            {user ? (
              <>
                {/* Funding Link */}
                <Link 
                  to="/donate" 
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
                >
                  <Activity className="w-4 h-4" />
                  <span>Funding</span>
                </Link>

                {/* User Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200"
                    >
                      <img 
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
                        alt={user.displayName}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ 
                      opacity: dropdownOpen ? 1 : 0,
                      y: dropdownOpen ? 0 : 10,
                      scale: dropdownOpen ? 1 : 0.95
                    }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 ${dropdownOpen ? 'block' : 'hidden'}`}
                  >
                    <Link 
                      to="/dashboard" 
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                    >
                      <Users className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-500 transition-colors text-left"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                </div>
              </>
            ) : (
              /* Login Button for non-logged in users */
              <Link 
                to="/login" 
                className="px-6 py-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-700 p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? "auto" : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-3">
            {/* Donation Requests Link */}
            <Link 
              to="/blood-donation-requests" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              Donation Requests
            </Link>

            {/* Search Link */}
            <Link 
              to="/search" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              Search Donors
            </Link>

            {/* Donate Link */}
            <Link 
              to="/donate" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
            >
              Donate
            </Link>

            {user ? (
              <>
                {/* Funding Link */}
                <Link 
                  to="/funding" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
                >
                  Funding
                </Link>

                {/* Dashboard Link */}
                <Link 
                  to="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-blue-500 transition-colors"
                >
                  Dashboard
                </Link>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-500"
                >
                  Logout
                </button>
              </>
            ) : (
              /* Login Link */
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 hover:text-blue-500"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;