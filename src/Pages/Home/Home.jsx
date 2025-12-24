import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, useAnimation } from "framer-motion";
import {
  Heart,
  Users,
  Shield,
  Clock,
  Phone,
  Mail,
  MapPin,
  Search,
  UserPlus,
  ChevronRight,
  ArrowRight,
  Droplets,
  Activity,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import {
  fadeInUp,
  staggerContainer,
  pulseAnimation,
  textGradientAnimation,
} from "../../utils/AnimationUtils";

const Home = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimation();

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-red-100 to-pink-100 opacity-20 blur-3xl"
        />
        <motion.div
          animate={{
            x: ["100%", "0%", "100%"],
            y: ["50%", "0%", "50%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5,
          }}
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-gradient-to-r from-pink-100 to-rose-100 opacity-20 blur-3xl"
        />
      </div>

      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-10"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🩸
        </motion.div>
      ))}

      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              animate={textGradientAnimation.animate}
              transition={textGradientAnimation.transition}
              style={{
                background: "linear-gradient(90deg, #dc2626, #ec4899, #dc2626)",
                backgroundSize: "200% auto",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Donate Blood, Save Lives
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              Join thousands of donors in our mission to provide life-saving
              blood to those in need across Bangladesh
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 shadow-lg"
                >
                  <UserPlus className="w-5 h-5" />
                  Join as a Donor
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/search"
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-red-500 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-all duration-300"
                >
                  <Search className="w-5 h-5" />
                  Search Donors
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              {
                label: "Active Donors",
                value: "10,000+",
                icon: <Users className="w-6 h-6" />,
              },
              {
                label: "Lives Saved",
                value: "50,000+",
                icon: <Heart className="w-6 h-6" />,
              },
              {
                label: "Requests Fulfilled",
                value: "25,000+",
                icon: <Droplets className="w-6 h-6" />,
              },
              {
                label: "Response Time",
                value: "< 2 Hours",
                icon: <Clock className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="text-red-500 mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to become a lifesaver
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Register",
                description:
                  "Create your donor profile with blood type and location",
                icon: "📝",
                color: "from-blue-500 to-cyan-400",
              },
              {
                step: "02",
                title: "Get Matched",
                description: "We connect you with recipients in need nearby",
                icon: "🎯",
                color: "from-purple-500 to-pink-400",
              },
              {
                step: "03",
                title: "Save Lives",
                description: "Donate blood and receive updates on lives saved",
                icon: "🩸",
                color: "from-red-500 to-orange-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-r from-gray-100 to-white flex items-center justify-center text-3xl shadow-lg">
                  {feature.icon}
                </div>
                <div
                  className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-r ${feature.color} opacity-5 -translate-y-1/2 translate-x-1/2`}
                />

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-200">
                    {feature.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>

                <motion.div
                  animate={pulseAnimation}
                  className={`mt-6 w-12 h-1 rounded-full bg-gradient-to-r ${feature.color}`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white to-red-50 rounded-3xl border border-gray-100 shadow-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Contact Us
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <textarea
                        rows="4"
                        placeholder="Your Message"
                        className="w-full p-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
                    >
                      Send Message
                    </motion.button>
                  </form>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Get in Touch
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Emergency Hotline
                        </p>
                        <p className="text-gray-600">+880 1234 567890</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Email</p>
                        <p className="text-gray-600">support@lifestream.org</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Location</p>
                        <p className="text-gray-600">Dhaka, Bangladesh</p>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      backgroundColor: ["#fef2f2", "#fee2e2", "#fef2f2"],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-4 rounded-lg border border-red-200"
                  >
                    <div className="flex items-center gap-2 text-red-600">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">
                        24/7 Emergency Service Available
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">LifeStream</span>
              </div>
              <p className="text-gray-400">
                Connecting donors with recipients to save lives through blood
                donation across Bangladesh.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Search Donors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blood-donation-requests"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Donation Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Become a Donor
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-r-lg font-medium"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} LifeStream. All rights reserved.
            </p>
            <p className="mt-2 text-sm">
              Made by Tanvir Hossain for saving lives
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
