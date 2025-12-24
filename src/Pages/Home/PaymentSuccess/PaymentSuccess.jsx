import { CheckCircle, Sparkles, Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  pageVariants,
  pulseAnimation,
  textGradientAnimation,
  rotateAnimation,
  confettiAnimation,
} from "../../../utils/AnimationUtils";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxiosSecure();
  const [confetti, setConfetti] = useState(true);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        console.log(res.data);
        generateHearts();
      })
      .catch((err) => {
        console.error("Payment confirmation error:", err);
      });
  }, [axiosInstance, sessionId]);

  const generateHearts = () => {
    const newHearts = [];
    for (let i = 0; i < 25; i++) {
      newHearts.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        size: 20 + Math.random() * 30,
      });
    }
    setHearts(newHearts);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-green-300 opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-red-400 opacity-70"
            style={{
              left: `${heart.x}%`,
              fontSize: `${heart.size}px`,
            }}
            initial={{
              y: window.innerHeight + 100,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              y: -100,
              rotate: 360,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: heart.delay,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => {
              if (heart.id === hearts.length - 1) {
                setTimeout(() => setConfetti(false), 1000);
              }
            }}
          >
            🩸
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {confetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute text-lg"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                {...confettiAnimation(i)}
              >
                {["🎉", "✨", "🌟", "💫", "⭐", "🎊"][i % 6]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        animate={pulseAnimation}
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-green-300/30 to-emerald-300/30 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          delay: 1,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-rose-300/20 to-pink-300/20 blur-3xl"
      />

      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 30px rgba(34, 197, 94, 0.3)",
              "0 0 60px rgba(16, 185, 129, 0.4)",
              "0 0 30px rgba(34, 197, 94, 0.3)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 rounded-3xl blur-xl opacity-60"
        />

        <div className="relative rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              delay: 0.3,
            }}
            className="relative flex justify-center mb-6"
          >
            <div className="relative">
              <motion.div
                animate={pulseAnimation}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 blur-md"
              />

              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: 1,
                }}
                className="relative"
              >
                <CheckCircle className="w-24 h-24 text-green-500" />
              </motion.div>

              <motion.div
                animate={rotateAnimation.animate}
                transition={rotateAnimation.transition}
                className="absolute -top-2 -right-2"
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className="absolute -bottom-2 -left-2"
              >
                <Sparkles className="w-8 h-8 text-pink-400" />
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
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent bg-[length:200%_auto] mb-3"
            >
              Payment Successful!
            </motion.h2>

            <motion.p
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-lg text-gray-600 mb-2"
            >
              Thank you for your generous donation
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-center justify-center gap-2 text-gray-500"
            >
              <span className="text-sm">You've helped save lives today</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="mb-8 p-4 rounded-xl border border-green-100 bg-gradient-to-br from-green-50/50 to-emerald-50/30"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Lives Impacted", value: "3+", icon: "❤️" },
                { label: "Donations", value: "1", icon: "🎯" },
                { label: "Community", value: "Hero", icon: "🏆" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="text-2xl">{stat.icon}</div>
                  <div className="text-xl font-bold text-green-700">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-4 pt-4 border-t border-green-100"
            >
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Community Impact</span>
                <span>100%</span>
              </div>
              <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, delay: 1.7, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-400 relative"
                >
                  <motion.div
                    animate={{ x: ["0%", "100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                    className="absolute top-0 left-0 w-4 h-full bg-white/40 blur-sm"
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1.8,
              type: "spring",
              stiffness: 150,
            }}
            className="flex flex-col gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/"
                className="w-full py-3 md:py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 w-1/3 h-full bg-white/30 skew-x-12"
                />
                <span className="relative z-10 flex items-center gap-2">
                  Go to Home
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/dashboard"
                className="w-full py-3 md:py-4 rounded-xl border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            className="text-center mt-6 pt-6 border-t border-gray-100"
          >
            <p className="text-sm text-gray-500">
              Your donation receipt has been sent to your email
            </p>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block mt-2"
            >
              🩸
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.8 }}
        transition={{ delay: 2.3, duration: 0.8 }}
        className="absolute bottom-10 left-0 right-0 text-center"
      >
        <div className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Thank you for being a lifesaver!
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
