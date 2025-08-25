import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaBook, FaLandmark, FaTrophy } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const CommunityInitiatives = () => {
  const initiatives = [
    {
      title: "Educational Support",
      description:
        "Scholarships and tutoring programs for students in our community.",
      icon: <FaBook className="text-3xl text-blue-500" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Cultural Events",
      description:
        "Celebrating our traditions through festivals and gatherings.",
      icon: <FaLandmark className="text-3xl text-emerald-500" />,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Sports Events",
      description:
        "Promoting health and teamwork through various sports activities and tournaments.",
      icon: <FaTrophy className="text-3xl text-yellow-500" />,
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerChildren}
      className="my-16"
    >
      <motion.h2
        variants={fadeIn}
        className="text-4xl font-bold text-center text-gray-800 mb-4 font-poppins"
      >
        Community Initiatives
      </motion.h2>
      <motion.p
        variants={fadeIn}
        className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg"
      >
        Our community actively supports various initiatives that benefit members
        and preserve our heritage.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {initiatives.map((initiative, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:border-blue-100 text-center relative overflow-hidden"
            whileHover={{ y: -5 }}
          >
            {/* Gradient accent */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${initiative.color}`}></div>
            
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-100 transition-colors duration-300">
              {initiative.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-poppins">
              {initiative.title}
            </h3>
            <p className="text-gray-600">{initiative.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommunityInitiatives;