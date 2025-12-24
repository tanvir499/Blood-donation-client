import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  floatAnimation,
  rotateAnimation,
  shineEffect,
  buttonHoverAnimation,
} from "../../utils/AnimationUtils";

const Donate = () => {
  const axiosInstance = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [hoverAmount, setHoverAmount] = useState(null);
  const [pulse, setPulse] = useState(false);

  const handleCheckOut = (e) => {
    e.preventDefault();

    const donateAmount = e.target.donateAmount.value;

    if (!donateAmount || donateAmount <= 0) {
      return alert("Please enter a valid donation amount");
    }

    const formData = {
      donateAmount: Number(donateAmount),
      donorEmail: user?.email,
      donorName: user?.displayName,
    };

    setLoading(true);

    setPulse(true);
    setTimeout(() => setPulse(false), 1000);

    axiosInstance
      .post("/create-payment-checkout", formData)
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong!");
      })
      .finally(() => setLoading(false));
  };

  const quickAmounts = [100, 500, 1000, 5000];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-red-300 opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        animate={floatAnimation}
        className="hidden lg:block absolute top-10 left-10 text-5xl opacity-20"
      >
        🩸
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          delay: 0.3,
          ease: "easeInOut",
        }}
        className="hidden lg:block absolute bottom-10 right-10 text-5xl opacity-20"
      >
        🩸
      </motion.div>

      <motion.div
        animate={rotateAnimation.animate}
        transition={rotateAnimation.transition}
        className="hidden lg:block absolute top-1/4 right-1/4 text-3xl opacity-15"
      >
        💰
      </motion.div>

      <motion.div
        animate={{
          scale: pulse ? [1, 1.5, 1] : 1,
          opacity: pulse ? [1, 0.5, 1] : 0.1,
        }}
        transition={{ duration: 1 }}
        className="hidden lg:block absolute left-1/4 bottom-1/3 text-6xl opacity-10"
      >
        🩸
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(239, 68, 68, 0.1)",
              "0 0 40px rgba(236, 72, 153, 0.2)",
              "0 0 20px rgba(239, 68, 68, 0.1)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 rounded-3xl blur-xl opacity-50"
        />

        <div className="relative rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 120,
            }}
            className="text-center mb-6 md:mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl md:rounded-2xl mb-3 md:mb-4 shadow-lg"
            >
              <span className="text-3xl md:text-4xl text-white">🩸</span>
            </motion.div>

            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-2"
            >
              Donate Blood, Save Lives
            </motion.h2>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-600 text-sm md:text-base"
            >
              Your contribution helps patients in need
            </motion.p>
          </motion.div>

          <form onSubmit={handleCheckOut} className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <label className="block font-semibold text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                Donation Amount (BDT)
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  name="donateAmount"
                  placeholder="Enter amount"
                  className="w-full p-3 md:p-4 pl-10 md:pl-12 rounded-lg md:rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  required
                  min="1"
                />
                <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm md:text-base">
                  💰
                </div>
              </div>

              <motion.div
                className="flex flex-wrap gap-2 mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {quickAmounts.map((amount) => (
                  <motion.button
                    key={amount}
                    type="button"
                    onHoverStart={() => setHoverAmount(amount)}
                    onHoverEnd={() => setHoverAmount(null)}
                    onClick={() => {
                      const input = document.querySelector(
                        'input[name="donateAmount"]'
                      );
                      if (input) input.value = amount;
                    }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                      hoverAmount === amount
                        ? "border-red-500 text-red-600 shadow-lg"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    ৳{amount}
                    <AnimatePresence>
                      {hoverAmount === amount && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="ml-1 text-xs"
                        >
                          💫
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="p-4 rounded-lg border border-gray-100 dark:border-gray-600"
            >
              <motion.h3
                className="font-semibold text-gray-700 mb-3 text-sm md:text-base flex items-center gap-2"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span>👤</span>
                Donor Information
              </motion.h3>

              <div className="space-y-2">
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                    className="text-gray-400 text-sm"
                  >
                    👤
                  </motion.span>
                  <span className="text-gray-600 text-sm md:text-base">
                    <span className="font-medium">Name:</span>{" "}
                    {user?.displayName || "Not available"}
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 1.2 }}
                    className="text-gray-400 text-sm"
                  >
                    ✉️
                  </motion.span>
                  <span className="text-gray-600 text-sm md:text-base">
                    <span className="font-medium">Email:</span>{" "}
                    {user?.email || "Not available"}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="pt-2"
            >
              <div className="flex justify-between text-xs md:text-sm text-gray-500 mb-1">
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Every donation saves 3 lives
                </motion.span>
                <span>🩸</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    delay: 1,
                  }}
                  className="h-full bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 relative"
                >
                  <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                    className="absolute top-0 left-0 w-4 h-full bg-white/30 blur-sm"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.1,
                type: "spring",
                stiffness: 200,
              }}
            >
              <motion.button
                type="submit"
                disabled={loading}
                {...buttonHoverAnimation}
                animate={{
                  background: loading
                    ? ["#ef4444", "#ec4899", "#f43f5e", "#ef4444"]
                    : ["#ef4444", "#ec4899", "#f43f5e"],
                }}
                transition={{
                  background: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="w-full px-6 py-3 md:px-8 md:py-4 font-semibold text-white rounded-lg md:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                <motion.div
                  animate={shineEffect.animate}
                  transition={shineEffect.transition}
                  className="absolute top-0 left-0 w-1/3 h-full bg-white/30 skew-x-12"
                />

                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <motion.svg
                        animate={rotateAnimation.animate}
                        transition={rotateAnimation.transition}
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </motion.svg>
                      Processing Payment...
                    </>
                  ) : (
                    <>Proceed to Donate</>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </form>

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
              >
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    {...confettiAnimation(i)}
                  >
                    {["🎉", "✨", "🌟", "💫", "⭐"][i % 5]}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Donate;
