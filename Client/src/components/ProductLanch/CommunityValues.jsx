import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaUsers, FaGraduationCap, FaHistory } from "react-icons/fa";

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

const CommunityValues = () => {
  const values = [
    {
      title: "Unity & Togetherness",
      description:
        "Strengthening bonds within our community through shared values and mutual support.",
      icon: <FaUsers className="text-3xl text-blue-500" />,
      color: "from-blue-500 to-emerald-500",
    },
    {
      title: "Education & Progress",
      description:
        "Promoting education and advancement for all members of our community.",
      icon: <FaGraduationCap className="text-3xl text-blue-500" />,
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Cultural Heritage",
      description:
        "Preserving and celebrating our rich cultural traditions and history.",
      icon: <FaHistory className="text-3xl text-blue-500" />,
      color: "from-teal-500 to-cyan-500",
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
        Our Community Values
      </motion.h2>
      <motion.p
        variants={fadeIn}
        className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg"
      >
        The Methalodai community is built on strong foundations of unity,
        education, and cultural preservation that have guided us for
        generations.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:border-blue-100 relative overflow-hidden"
            whileHover={{ y: -10 }}
          >
            {/* Gradient accent */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${value.color}`}></div>
            
            <div className="bg-gradient-to-br from-blue-50 to-emerald-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors duration-300">
              {value.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 font-poppins">
              {value.title}
            </h3>
            <p className="text-gray-600">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommunityValues;