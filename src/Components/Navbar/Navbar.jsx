import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";

import { Link } from "react-router";
import auth from "../../firebase/firebase.config";

const Navbar = () => {

    const {user} = useContext(AuthContext);

    
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
            <a>All Request</a>
          </li>
          <li>
            <a>Search</a>
          </li>
          <li><Link to={'/donate'}>Donate</Link></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>All Request</a>
          </li>
          <li>
            <a>Search</a>
          </li>
          <li><Link to={'/donate'}>Donate</Link></li>
        </ul>
      </div>
      
        <div className="navbar-end">
             <Link to="/dashboard" className="btn btn-accent mr-2">Dashboard</Link>
             {user ? (
          <button
            onClick={handleSignOut}
            className="px-6 py-2 font-semibold -ml-20 text-white rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 hover:opacity-90 transition-all shadow-md"
          >
            Logout
          </button>
      ) : (
          <Link
           to="/Login"
            className="px-6 py-2 font-semibold text-white rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 hover:opacity-90 transition-all shadow-md"
          >
            Login
          </Link>
      )}
        </div>
    </div>
  );
};

export default Navbar;
