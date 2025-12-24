import { XCircle, AlertCircle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  pulseAnimation,
  floatAnimation,
  textGradientAnimation,
  bounceAnimation,
} from "../../utils/AnimationUtils";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-red-300 opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        animate={floatAnimation}
        className="hidden lg:block absolute top-10 left-10 text-5xl opacity-15"
      >
        ⚠️
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          delay: 0.5,
          ease: "easeInOut",
        }}
        className="hidden lg:block absolute bottom-10 right-10 text-5xl opacity-15"
      >
        💔
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        className="hidden lg:block absolute top-1/3 right-1/4 text-4xl opacity-10"
      >
        ❌
      </motion.div>

      <motion.div
        animate={pulseAnimation}
        className="absolute left-1/4 top-1/4 text-7xl opacity-10"
      >
        ⛔
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 90,
          damping: 20,
        }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 20px rgba(239, 68, 68, 0.15)",
              "0 0 40px rgba(220, 38, 38, 0.25)",
              "0 0 20px rgba(239, 68, 68, 0.15)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 rounded-3xl blur-xl opacity-50"
        />

        <div className="relative rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 180,
              delay: 0.2,
            }}
            className="relative flex justify-center mb-6"
          >
            <div className="relative">
              {/* Pulsing Red Circle */}
              <motion.div
                animate={pulseAnimation}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-rose-400 blur-md"
              />

              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  delay: 1,
                }}
                className="relative"
              >
                <XCircle className="w-24 h-24 text-red-500" />
              </motion.div>

              <motion.div
                animate={rotateAnimation.animate}
                transition={rotateAnimation.transition}
                className="absolute -top-3 -right-3"
              >
                <AlertCircle className="w-8 h-8 text-amber-500" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="absolute -bottom-3 -left-3"
              >
                <AlertCircle className="w-8 h-8 text-orange-500" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.h2
              animate={textGradientAnimation.animate}
              transition={textGradientAnimation.transition}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-rose-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] mb-3"
            >
              Payment Cancelled
            </motion.h2>

            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-lg text-gray-600 mb-4"
            >
              Your payment was not completed
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-center justify-center gap-2 text-red-400"
            >
              <span className="text-sm">⚠️</span>
              <span className="text-sm font-medium">
                No money has been charged
              </span>
              <span className="text-sm">✅</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.1, type: "spring" }}
            className="mb-8 p-5 rounded-xl border border-red-200 bg-gradient-to-br from-red-50/60 to-rose-50/40"
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className="text-2xl text-red-500 mt-1"
              >
                ℹ️
              </motion.div>
              <div>
                <h4 className="font-semibold text-red-700 mb-2">
                  Don't worry!
                </h4>
                <p className="text-sm text-red-600">
                  You can try again anytime or return to the homepage. Your
                  donation journey can continue when you're ready.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.3, ease: "easeOut" }}
              className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-red-300 to-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="mb-8 p-4 rounded-lg border border-amber-100 bg-gradient-to-br from-amber-50/40 to-yellow-50/30"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-amber-700">
                Donation Status
              </span>
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-lg"
              >
                ⏸️
              </motion.div>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 1.5, delay: 1.6, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-400 to-orange-400 relative"
              >
                <motion.div
                  animate={{
                    x: ["0%", "100%", "0%"],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-3 h-full bg-white/40 blur-sm"
                />
              </motion.div>
            </div>

            <div className="flex justify-between text-xs text-amber-600 mt-2">
              <span>Started</span>
              <span>Paused at 60%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1.7,
              type: "spring",
              stiffness: 150,
            }}
            className="flex flex-col gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Link
                to="/donate"
                className="w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <motion.div
                  animate={pulseAnimation}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 to-rose-400 blur-sm"
                />

                <motion.span
                  animate={rotateAnimation.animate}
                  transition={rotateAnimation.transition}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.span>
                <span className="relative z-10">Try Again</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/"
                className="w-full py-3 md:py-4 rounded-xl border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <motion.div
                  animate={{
                    borderColor: ["#ef4444", "#f43f5e", "#ef4444"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-xl border-2"
                />

                <Home className="w-5 h-5" />
                <span className="relative z-10">Go to Home</span>

                {/* Subtle house animation */}
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  className="absolute right-4 opacity-20"
                >
                  🏠
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            className="text-center mt-6 pt-6 border-t border-gray-100"
          >
            <p className="text-sm text-gray-500 mb-2">
              Your intention to donate matters!
            </p>
            <motion.div
              animate={bounceAnimation}
              className="inline-flex items-center gap-2 text-amber-500"
            >
              <span>🌟</span>
              <span className="text-xs font-medium">
                Come back when you're ready
              </span>
              <span>🩸</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        transition={{ delay: 2.3, duration: 0.8 }}
        className="absolute bottom-10 left-0 right-0 text-center pointer-events-none"
      >
        <div className="text-sm font-medium bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
          Every effort counts towards saving lives 💪
        </div>
      </motion.div>

      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full bg-red-400 blur-3xl"
        />
      </AnimatePresence>
    </div>
  );
};

export default PaymentCancel;
