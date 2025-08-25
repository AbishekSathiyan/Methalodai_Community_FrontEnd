import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRocket, FaCalendar, FaClock } from "react-icons/fa";

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CountdownTimer = () => {
  const launchDate = new Date("2025-08-29T11:11:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white rounded-2xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-white/10"
        animate={floatingAnimation}
      ></motion.div>
      <motion.div
        className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-yellow-300/20"
        animate={floatingAnimation}
        transition={{ delay: 0.5 }}
      ></motion.div>

      <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        <FaRocket className="text-yellow-300 animate-pulse" /> Countdown to
        Launch
      </h3>
      <div className="flex justify-center space-x-4 md:space-x-6">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Minutes" },
          { value: timeLeft.seconds, label: "Seconds" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="bg-white/20 backdrop-blur-sm text-white rounded-xl p-4 w-20 h-20 flex items-center justify-center shadow-md border border-white/10">
              <span className="text-2xl font-bold">
                {String(item.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-sm text-white/90 mt-2">{item.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-6 text-white/90">
        <FaCalendar className="mr-2 text-yellow-300" />
        <span>August 29, 2025</span>
        <FaClock className="ml-4 mr-2 text-yellow-300" />
        <span>11:11 AM</span>
      </div>
    </motion.div>
  );
};

export default CountdownTimer;