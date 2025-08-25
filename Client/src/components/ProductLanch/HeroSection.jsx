import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaEnvelope } from "react-icons/fa";
import MethalodaiCommunityImg from "../../assets/Methalodai.jpg";

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen rounded-2xl overflow-hidden shadow-2xl"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${MethalodaiCommunityImg})` }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-emerald-800/70 z-10"></div>
      
      {/* Animated decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-300/30 z-5"
        animate={floatingAnimation}
      ></motion.div>
      <motion.div
        className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/20 z-5"
        animate={floatingAnimation}
        transition={{ delay: 0.7 }}
      ></motion.div>
      <motion.div
        className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full bg-green-300/40 z-5"
        animate={floatingAnimation}
        transition={{ delay: 1.2 }}
      ></motion.div>

      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl md:text-6xl font-bold text-white mb-6 font-poppins"
        >
          Methalodai Community
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-2xl text-white/90 max-w-3xl mb-10 flex items-center justify-center"
        >
          {/* Left decorative element */}
          <div className="hidden md:block mr-4">
            <FaLeaf className="text-green-300 text-2xl" />
          </div>

          <p className="font-poppins">
            Celebrating our heritage, building our future together
          </p>

          {/* Right decorative element */}
          <div className="hidden md:block ml-4">
            <FaLeaf className="text-green-300 text-2xl transform rotate-180" />
          </div>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold py-4 px-10 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform flex items-center gap-2 font-poppins text-lg"
        >
          <FaEnvelope /> Join Our Community
        </motion.button>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;