import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { pageVariants, floatAnimation } from "../utils/AnimationUtils";

const Login = () => {
  const { setUser, handleGoogleSignIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Logged in successfully!");
        navigate(location.state ? location.state : "/");
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        animate={floatAnimation}
        className="hidden lg:block absolute top-10 left-10 text-4xl opacity-10"
      >
        ❤️
      </motion.div>
      <motion.div
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          delay: 0.5,
          ease: "easeInOut",
        }}
        className="hidden lg:block absolute bottom-10 right-10 text-4xl opacity-10"
      >
        🩸
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6 md:mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl md:rounded-2xl mb-3 md:mb-4 shadow-md">
              <span className="text-3xl md:text-4xl text-white">🩸</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Login to continue your lifesaving journey
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block font-semibold text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                Email
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 md:p-4 pl-10 md:pl-12 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  required
                />
                <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-base">
                  ✉️
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block font-semibold text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-3 md:p-4 pl-10 md:pl-12 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  required
                />
                <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-base">
                  🔒
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-right"
            >
              <button
                type="button"
                onClick={handleForget}
                className="text-sm text-red-500 hover:text-red-600 font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                type="submit"
                className="w-full px-6 py-3 md:px-8 md:py-4 font-semibold text-white rounded-lg md:rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
              >
                Login
              </button>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
              className="relative my-4 md:my-6"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 md:px-4 text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                  Or continue with
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                type="button"
                onClick={googleSignIn}
                className="w-full flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 font-semibold text-gray-800 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md md:hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm md:text-base"
              >
                <FcGoogle size={18} md:size={22} />
                <span>Continue with Google</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-2 pt-2"
            >
              <p className="text-gray-600 text-sm md:text-base">
                Don't have an account?{" "}
                <Link
                  className="text-red-500 hover:text-red-600 font-semibold hover:underline inline-flex items-center gap-1 transition-all"
                  to={"/register"}
                >
                  Register
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
                    className="inline-block"
                  >
                    →
                  </motion.span>
                </Link>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
