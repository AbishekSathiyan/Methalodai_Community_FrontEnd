import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLeaf, FaGlobeAsia, FaStar } from "react-icons/fa";

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

const NadarFlagInspired = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="my-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-2xl border border-white/20 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-4 left-4 w-12 h-12 rounded-full bg-yellow-300/30"
        animate={floatingAnimation}
      ></motion.div>
      <motion.div
        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20"
        animate={floatingAnimation}
        transition={{ delay: 0.7 }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-green-300/20"
        animate={floatingAnimation}
        transition={{ delay: 1.2 }}
      ></motion.div>

      <h2 className="text-3xl font-bold mb-4 font-poppins">
        Nadar Community Pride
      </h2>
      <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
        Our community flag represents the unity, heritage, and aspirations of
        the Nadar community. The colors symbolize our connection to nature,
        progress, and spiritual values.
      </p>

      <div className="flex justify-center items-center space-x-8 mt-8">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-2 shadow-md">
            <FaLeaf className="text-2xl text-white" />
          </div>
          <span className="text-sm">Growth</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mb-2 shadow-md">
            <FaGlobeAsia className="text-2xl text-white" />
          </div>
          <span className="text-sm">Unity</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center mb-2 shadow-md">
            <FaStar className="text-2xl text-white" />
          </div>
          <span className="text-sm">Excellence</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NadarFlagInspired;