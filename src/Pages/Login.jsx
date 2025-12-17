import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser, handleGoogleSignIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Logged in successfully!"); 
        navigate(location.state ? location.state : '/');
      })
      .catch((error) => {
        toast.error(error.message); 
      });
  };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Logged in successfully!"); 
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message); 
      });
  };

  const handleForget = () => {
    navigate(`/forget/${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="rounded-2xl shadow-2xl p-8 w-[380px] border bg-white">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent mb-6">
          Login to Paw Mart
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-1 rounded-lg border focus:ring focus:ring-sky-300 outline-none"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 rounded-lg border focus:ring focus:ring-sky-300 outline-none"
              required
            />
          </div>

          {/* Forget Password */}
          <div className="">
            <button
              type="button"
              onClick={handleForget}
              className="text-sm text-gray-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full text-center px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 hover:opacity-90 transition-all shadow-md"
          >
            Login
          </button>

          {/* Google Login */}
          <button
            type="button"
            onClick={googleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 mt-2 font-semibold text-gray-700 rounded-lg border shadow-sm bg-white hover:shadow-md transition-all duration-300"
          >
            <FcGoogle />
            Continue with Google
          </button>

          <div className="text-center mt-2">
            <span>Don't have an account? </span>
            <Link
              className="text-sky-500 font-semibold hover:underline"
              to={"/Signup"}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
