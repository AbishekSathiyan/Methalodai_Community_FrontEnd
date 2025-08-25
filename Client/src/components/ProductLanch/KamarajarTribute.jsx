import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import KamarajarImg from "../../assets/Kamarajar(3).jpeg";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const KamarajarTribute = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const quotes = [
    "Education is the only weapon to eradicate poverty and develop the nation.",
    "The greatest service we can do to the nation is to educate its people.",
    "A community is like a ship; everyone ought to be prepared to take the helm.",
  ];

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
      <div className="absolute top-20 left-1/4 w-16 h-16 rounded-full bg-yellow-100/40"></div>

      <div className="flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-2/5 mb-6 md:mb-0 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-xs transform hover:scale-105 transition-transform duration-300">
            <img
              src={KamarajarImg}
              alt="Kamarajar"
              className="w-full h-72 object-cover"
            />
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-center py-2">
              <p className="text-sm font-medium font-poppins">Kamarajar</p>
              <p className="text-xs">The Great Leader</p>
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
            Inspired by Kamarajar's Vision
          </h2>
          <p className="text-gray-600 mb-4">
            Our community draws inspiration from the great leader Kamarajar, who
            believed in the power of education and community development. His
            vision for an educated, empowered society guides our mission and
            values.
          </p>

          <div className="space-y-4 mt-6">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <FaQuoteLeft className="text-blue-500 mb-2" />
                <p className="text-sm text-gray-700 italic">"{quote}"</p>
                <p className="text-xs text-gray-600 mt-2 font-medium">
                  - K. Kamarajar
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default KamarajarTribute;