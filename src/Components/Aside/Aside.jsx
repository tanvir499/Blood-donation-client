import React from "react";
import { NavLink } from "react-router";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiDroplet,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Aside = () => {
  return (
    <div>
      <aside className="w-64 min-h-screen bg-white border-r shadow-md">
        {/* Logo / Title */}
        <div className="px-6 py-5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500">
          <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
          <p className="text-sm text-sky-100">Blood Donation System</p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2">
          <NavItem to="/admin/dashboard" icon={<FiHome />} label="Dashboard" />
          <NavItem to="/admin/dashboard" icon={<FiHome />} label="Dashboard" />
          <NavItem to="/admin/users" icon={<FiUsers />} label="All Users" />
          <NavItem to="/admin/donors" icon={<FiUserCheck />} label="Donors" />
          <NavItem
            to="/admin/requests"
            icon={<FiDroplet />}
            label="Blood Requests"
          />
          <NavItem
            to="/admin/settings"
            icon={<FiSettings />}
            label="Settings"
          />
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full px-4 py-4 border-t">
          <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition">
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
        ${
          isActive
            ? "bg-indigo-100 text-indigo-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      {label}
    </NavLink>
  );
};

export default Aside;
