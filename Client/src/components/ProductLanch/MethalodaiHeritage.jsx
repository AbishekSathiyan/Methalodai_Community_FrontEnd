import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const MethalodaiHeritage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="my-16 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 shadow-2xl border border-blue-100 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-blue-200/30"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-emerald-200/30"></div>
      <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-yellow-100/40"></div>

      <div className="flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-2/5 mb-6 md:mb-0 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-xs transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-72 bg-gradient-to-br from-blue-400 to-emerald-400 flex items-center justify-center text-white text-center p-4 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <p className="text-xl font-bold relative z-10 font-poppins">
                Methalodai Community Heritage
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-center py-2">
              <p className="text-sm font-medium font-poppins">
                Methalodai Community
              </p>
              <p className="text-xs">Established 1950</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="md:w-3/5 md:pl-12"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">
            Our Heritage & Future
          </h2>
          <p className="text-gray-600 mb-4">
            The Methalodai community has a rich history of resilience,
            entrepreneurship, and social progress. From our roots in traditional
            industries to our current advancements in technology and education,
            we continue to honor our past while building a brighter future.
          </p>
          <p className="text-gray-600 mb-6">
            Our new community platform celebrates this legacy while creating
            opportunities for connection, collaboration, and growth among
            members across generations and geographical boundaries.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-blue-100 p-4 rounded-xl border-l-4 border-blue-500 shadow-md"
          >
            <FaQuoteLeft className="text-blue-500 mb-2" />
            <p className="text-sm text-blue-800 italic">
              "A community is like a ship; everyone ought to be prepared to take
              the helm."
            </p>
            <p className="text-xs text-blue-700 mt-2 font-medium">
              - Methalodai Community
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MethalodaiHeritage;