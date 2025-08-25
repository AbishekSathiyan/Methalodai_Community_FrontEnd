import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaEnvelope, FaHeart } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you would send this to your backend
    console.log("Email submitted:", email);
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="my-16 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl p-8 text-center shadow-2xl border border-white/20 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/10"
        animate={floatingAnimation}
      ></motion.div>
      <motion.div
        className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10"
        animate={floatingAnimation}
        transition={{ delay: 0.5 }}
      ></motion.div>
      <motion.div
        className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-yellow-300/20"
        animate={floatingAnimation}
        transition={{ delay: 1 }}
      ></motion.div>

      <h2 className="text-3xl font-bold text-white mb-4 relative z-10 font-poppins">
        Stay Connected
      </h2>
      <p className="text-white/90 mb-6 max-w-2xl mx-auto relative z-10 text-lg">
        Join Our community network to stay updated on events, initiatives, and
        opportunities.
      </p>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto relative z-10"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
              <FaHeart className="text-blue-600 text-2xl" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2 font-poppins">
            Welcome to our community!
          </h3>
          <p className="text-white/90">
            We're excited to have you join the Methalodai network. You'll
            receive updates soon.
          </p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto relative z-10"
        >
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="py-3 pl-11 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 w-full font-poppins"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 whitespace-nowrap w-full sm:w-auto font-poppins"
            >
              Join Us
            </motion.button>
          </div>
        </motion.form>
      )}

      <p className="text-white/70 text-xs mt-4 relative z-10">
        We respect your privacy. Your information will only be used for
        community purposes.
      </p>
    </motion.div>
  );
};

export default NewsletterSignup;
