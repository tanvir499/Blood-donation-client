import { FcGoogle } from "react-icons/fc";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import auth from "../Firebase/firebase.config";
import { motion } from "framer-motion";
import {
  pageVariants,
  cardVariants,
  fadeInUp,
  floatAnimation,
  bounceAnimation,
} from "../utils/AnimationUtils";

const Register = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios.get("./upazila.json").then((res) => setUpazilas(res.data.upazilas));

    axios
      .get("./district.json")
      .then((res) => setDistricts(res.data.districts));
  }, []);

  const navigate = useNavigate();
  const { registerWithEmailPassword, setUser, handleGoogleSignIn } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullName = e.target.fullName.value;
    const photoURL = e.target.photoURL;
    const file = photoURL.files[0];
    const blood = e.target.blood.value;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (password.length < 6) return alert("less than 6 characters");
    if (!uppercase.test(password)) return alert("Need an Uppercase");
    if (!lowercase.test(password)) return alert("Need a Lowercase");

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=4ef5a5f7c97e1a04cc960bb3d1e91b93`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const mainPhotoUrl = res.data.data.display_url;
    const formData = {
      email,
      password,
      fullName,
      mainPhotoUrl,
      blood,
      district,
      upazila,
    };
    console.log(formData);

    if (res.data.success == true) {
      registerWithEmailPassword(email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: mainPhotoUrl,
          })
            .then(() => {
              setUser(userCredential.user);
              axios
                .post("https://backend-11-ashen.vercel.app/users", formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              navigate("/");
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        animate={floatAnimation}
        className="hidden lg:block absolute top-10 right-10 text-4xl opacity-10"
      >
        🩸
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
        className="hidden lg:block absolute bottom-10 left-10 text-4xl opacity-10"
      >
        ❤️
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
              Create Your Account
            </h2>
            <p className="text-gray-600  text-sm md:text-base">
              Join LifeStream to save lives through blood donation
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block font-semibold text-gray-700  mb-1 md:mb-2 text-sm md:text-base">
                Full Name
              </label>
              <div className="relative">
                <input
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full p-3 md:p-4 pl-10 md:pl-12 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  required
                />
                <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2  text-sm md:text-base">
                  👤
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block font-semibold text-gray-700  mb-1 md:mb-2 text-sm md:text-base">
                Email
              </label>
              <div className="relative">
                <input
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
              transition={{ delay: 0.3 }}
            >
              <label className="block font-semibold text-gray-700  mb-1 md:mb-2 text-sm md:text-base">
                Profile Photo
              </label>
              <div className="relative">
                <input
                  name="photoURL"
                  type="file"
                  accept="image/*"
                  className="w-full p-3 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 text-xs md:text-sm"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block font-semibold text-gray-700  mb-1 md:mb-2 text-sm md:text-base">
                Choose Blood Group
              </label>
              <select
                name="blood"
                defaultValue=""
                className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 text-sm md:text-base appearance-none"
                required
              >
                <option value="" disabled>
                  Choose Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block font-semibold text-gray-700  mb-1 md:mb-2 text-sm md:text-base">
                  Choose Your District
                </label>
                <select
                  name="district"
                  defaultValue=""
                  className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 text-sm md:text-base appearance-none"
                  required
                >
                  <option value="" disabled>
                    Select your district
                  </option>
                  {districts.map((d) => (
                    <option value={d?.name} key={d.id}>
                      {d?.name}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block font-semibold text-gray-700  mb-1 md:mb-2 text-sm md:text-base">
                  Choose Your Upazila
                </label>
                <select
                  name="upazila"
                  defaultValue=""
                  className="w-full p-3 md:p-4 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 text-sm md:text-base appearance-none"
                  required
                >
                  <option value="" disabled>
                    Select your Upazila
                  </option>
                  {upazilas.map((u) => (
                    <option value={u.name} key={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block font-semibold text-gray-700  mb-1 md:mb-2 text-sm md:text-base">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                type="submit"
                className="w-full px-6 py-3 md:px-8 md:py-4 font-semibold text-white rounded-lg md:rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-rose-600 hover:via-pink-600 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
              >
                Register
              </button>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9 }}
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
              transition={{ delay: 1 }}
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
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-gray-600  text-sm md:text-base">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-semibold hover:underline inline-flex items-center gap-1 transition-all"
              >
                Login
                <motion.span animate={bounceAnimation} className="inline-block">
                  →
                </motion.span>
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
