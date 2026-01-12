import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Users,
  Droplets,
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  FileText,
  Bell,
  Heart,
  Shield,
  User as UserIcon,
  Activity,
  BarChart3,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  sidebarVariants,
  menuItemVariants,
  hoverAnimation,
  pulseAnimation,
} from "../../utils/AnimationUtils";

const Aside = () => {
  const { role, user } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!", {
          position: "top-right",
          theme: "colored",
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error logging out. Please try again.", {
          position: "top-right",
          theme: "colored",
        });
        console.error("Logout error:", error);
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    {
      to: "/dashboard",
      icon: <Home className="w-5 h-5" />,
      label: "Profile",
      allRoles: true,
    },
    {
      to: "/dashboard/my-request",
      icon: <FileText className="w-5 h-5" />,
      label: "My Requests",
      allRoles: true,
    },
    {
      to: "/dashboard/donation-requests",
      icon: <Heart className="w-5 h-5" />,
      label: "Donor-Dashboard",
      allRoles: true,
    },

    // Donor specific
    {
      to: "/dashboard/add-request",
      icon: <PlusCircle className="w-5 h-5" />,
      label: "Add Request",
      roles: ["donor", "volunteer"],
    },

    // Admin specific
    {
      to: "/dashboard/all-users",
      icon: <Users className="w-5 h-5" />,
      label: "All Users",
      roles: ["admin"],
    },
    {
      to: "/dashboard/volunteer-dashboard",
      icon: <Droplets className="w-5 h-5" />,
      label: "Volunteer Dashboard",
      roles: ["admin"],
    },
  ];

  const filteredNavItems = navItems.filter((item) => {
    if (item.allRoles) return true;
    return item.roles?.includes(role);
  });

  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className={`hidden lg:block fixed left-0 top-0 h-full bg-gradient-to-b from-white to-red-50 border-r border-red-100 shadow-xl z-30 overflow-hidden ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleCollapse}
          className="absolute -right-3 top-8 z-10 w-6 h-12 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-r-lg shadow-lg flex items-center justify-center"
        >
          {isCollapsed ? (
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </motion.button>

        <div className="relative h-32 bg-gradient-to-r from-red-500 to-pink-500 overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background:
                "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
              backgroundSize: "50px 50px",
            }}
            className="absolute inset-0"
          />

          <div className="relative p-6">
            <motion.div
              animate={pulseAnimation}
              className={`flex items-center gap-3 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <h2 className="text-xl font-bold text-white whitespace-nowrap">
                      LifeStream
                    </h2>
                    <p className="text-white/80 text-sm whitespace-nowrap">
                      Blood Donation System
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-4 -mt-8 relative z-10"
            >
              <div className="bg-white rounded-xl shadow-lg border border-red-100 p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-200 overflow-hidden"
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-red-500" />
                      </div>
                    )}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-800 truncate">
                      {user?.displayName || "User"}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-gray-600 capitalize">
                        {role || "User"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="mt-8 px-4 space-y-1">
          <AnimatePresence>
            {filteredNavItems.map((item, index) => (
              <motion.div
                key={item.to}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
                whileHover={hoverAnimation}
              >
                <NavItem
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  collapsed={isCollapsed}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-red-100 bg-white">
          <motion.button
            whileHover={{ scale: 1.02, x: isCollapsed ? 0 : 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`flex items-center justify-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 ${
              isCollapsed ? "px-3" : ""
            }`}
          >
            <LogOut className="w-5 h-5" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-white to-red-50 border-r border-red-100 shadow-xl z-50 overflow-y-auto"
          >
            <div className="relative h-32 bg-gradient-to-r from-red-500 to-pink-500 overflow-hidden">
              <motion.div
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background:
                    "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
                  backgroundSize: "50px 50px",
                }}
                className="absolute inset-0"
              />

              <div className="relative p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={pulseAnimation}
                    className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Droplets className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-white">LifeStream</h2>
                    <p className="text-white/80 text-sm">Blood Donation</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMobileMenu}
                  className="text-white"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            <div className="mx-4 -mt-8 relative z-10">
              <div className="bg-white rounded-xl shadow-lg border border-red-100 p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-200 overflow-hidden"
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-red-500" />
                      </div>
                    )}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {user?.displayName || "User"}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-gray-600 capitalize">
                        {role || "User"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav className="mt-8 px-4 space-y-1">
              {filteredNavItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavItem
                    to={item.to}
                    icon={item.icon}
                    label={item.label}
                    collapsed={false}
                    onClick={toggleMobileMenu}
                  />
                </motion.div>
              ))}
            </nav>

            <div className="mt-8 mx-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">
                  Quick Stats
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Donations</span>
                  <span className="text-sm font-bold text-red-600">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Requests</span>
                  <span className="text-sm font-bold text-green-600">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Saved Lives</span>
                  <span className="text-sm font-bold text-purple-600">0</span>
                </div>
              </div>
            </div>

            <div className="mt-8 mx-4 mb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const NavItem = ({ to, icon, label, collapsed, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
          isActive
            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
            : "text-gray-600 hover:bg-red-50 hover:text-red-600"
        } ${collapsed ? "justify-center px-3" : ""}`
      }
    >
      <motion.span
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className={`transition-transform ${collapsed ? "text-xl" : ""}`}
      >
        {icon}
      </motion.span>

      {!collapsed && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}

      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </NavLink>
  );
};

const ChevronLeft = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default Aside;
