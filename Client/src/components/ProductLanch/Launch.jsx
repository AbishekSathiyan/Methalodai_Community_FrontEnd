import React, { useState, useEffect, useRef } from "react";
import {
  FaRocket,
  FaLeaf,
  FaUser,
  FaCalendar,
  FaClock,
  FaEnvelope,
  FaQuoteLeft,
  FaHeart,
  FaUsers,
  FaLightbulb,
  FaLinkedin,
  FaGithub,
  FaLaptopCode,
  FaTrophy,
  FaHistory,
  FaLandmark,
  FaHandshake,
  FaBook,
  FaGraduationCap,
  FaStar,
  FaMapMarkerAlt,
  FaGlobeAsia,
} from "react-icons/fa";
import { motion, useInView } from "framer-motion";

// Import images
import KamarajarImg from "../../assets/Kamarajar(3).jpeg";
import BabyMuruganImg from "../../assets/BabyMurugan.jpg";
import MethalodaiCommunityImg from "../../assets/Methalodai.jpg"; // Add this image

// Animation variants
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Floating animation for decorative elements
const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

// Countdown Timer Component
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
      className="bg-gradient-to-br from-green-600 to-blue-600 text-white rounded-2xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
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

// Hero Section Component
const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
    >
      {/* Background image */}
     <div
  className="absolute inset-0 z-0 bg-no-repeat bg-center bg-contain"
  style={{ backgroundImage: `url(${MethalodaiCommunityImg})` }}
></div>

      <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-blue-800/70 z-10"></div>

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

      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins"
        >
          Methalodai Community
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-xl text-white/90 max-w-2xl mb-8 flex items-center justify-center"
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
          className="bg-white text-green-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform flex items-center gap-2 font-poppins"
        >
          <FaEnvelope /> Join Our Community
        </motion.button>
      </div>
    </motion.div>
  );
};

// Kamarajar Tribute Section
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
      className="my-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-green-100 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-green-200/30"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-blue-200/30"></div>

      <div className="flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-2/5 mb-6 md:mb-0 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white max-w-xs transform hover:scale-105 transition-transform duration-300">
            <img
              src={KamarajarImg}
              alt="Kamarajar"
              className="w-full h-72 object-cover"
            />
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-2">
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
                className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <FaQuoteLeft className="text-green-500 mb-2" />
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

// Community Values Component
const CommunityValues = () => {
  const values = [
    {
      title: "Unity & Togetherness",
      description:
        "Strengthening bonds within our community through shared values and mutual support.",
      icon: <FaUsers className="text-3xl text-green-500" />,
    },
    {
      title: "Education & Progress",
      description:
        "Promoting education and advancement for all members of our community.",
      icon: <FaGraduationCap className="text-3xl text-green-500" />,
    },
    {
      title: "Cultural Heritage",
      description:
        "Preserving and celebrating our rich cultural traditions and history.",
      icon: <FaHistory className="text-3xl text-green-500" />,
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
        className="text-3xl font-bold text-center text-gray-800 mb-4 font-poppins"
      >
        Our Community Values
      </motion.h2>
      <motion.p
        variants={fadeIn}
        className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
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
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-green-100"
            whileHover={{ y: -10 }}
          >
            <div className="bg-gradient-to-br from-green-50 to-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors duration-300">
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

// Methalodai Heritage Component
const MethalodaiHeritage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="my-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-green-100 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-green-200/30"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-blue-200/30"></div>

      <div className="flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-2/5 mb-6 md:mb-0 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white max-w-xs transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-72 bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center text-white text-center p-4 relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <p className="text-xl font-bold relative z-10 font-poppins">
                Methalodai Community Heritage
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-2">
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
            className="bg-green-100 p-4 rounded-lg border-l-4 border-green-500"
          >
            <FaQuoteLeft className="text-green-500 mb-2" />
            <p className="text-sm text-green-800 italic">
              "A community is like a ship; everyone ought to be prepared to take
              the helm."
            </p>
            <p className="text-xs text-green-700 mt-2 font-medium">
              - Methalodai Community
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Cultural Significance Component with Baby Murugan Image
const CulturalSignificance = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="my-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-green-100 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-green-200/30"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-blue-200/30"></div>

      <div className="flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-3/5 md:pr-12"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">
            Cultural & Spiritual Significance
          </h2>
          <p className="text-gray-600 mb-4">
            Our community is deeply rooted in rich cultural traditions and
            spiritual practices that have been passed down through generations.
            These traditions form the foundation of our identity and values.
          </p>
          <p className="text-gray-600 mb-6">
            The image of Baby Murugan represents divine energy, wisdom, and the
            protection of our cultural heritage. It symbolizes our commitment to
            preserving our traditions while embracing progress and modernity.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500"
          >
            <FaQuoteLeft className="text-blue-500 mb-2" />
            <p className="text-sm text-blue-800 italic">
              "Our culture is our identity, our strength, and our connection to
              the divine."
            </p>
            <p className="text-xs text-blue-700 mt-2 font-medium">
              - Community Elder
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="md:w-2/5 mt-6 md:mt-0 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white max-w-xs transform hover:scale-105 transition-transform duration-300">
            <img
              src={BabyMuruganImg}
              alt="Baby Murugan"
              className="w-full h-72 object-cover"
            />
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-2">
              <p className="text-sm font-medium font-poppins">Lord Murugan</p>
              <p className="text-xs">Divine Protector</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Newsletter Signup Component
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
      className="my-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-8 text-center shadow-xl border border-white/20 relative overflow-hidden"
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

      <h2 className="text-3xl font-bold text-white mb-4 relative z-10 font-poppins">
        Stay Connected
      </h2>
      <p className="text-white/90 mb-6 max-w-2xl mx-auto relative z-10">
        Join our community network to stay updated on events, initiatives, and
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
              <FaHeart className="text-green-600 text-2xl" />
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
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="py-3 pl-11 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300 w-full font-poppins"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-white text-green-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-50 transition duration-300 whitespace-nowrap w-full sm:w-auto font-poppins"
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

// Community Initiatives Component
const CommunityInitiatives = () => {
  const initiatives = [
    {
      title: "Educational Support",
      description:
        "Scholarships and tutoring programs for students in our community.",
      icon: <FaBook className="text-3xl text-green-500" />,
    },
    {
      title: "Cultural Events",
      description:
        "Celebrating our traditions through festivals and gatherings.",
      icon: <FaLandmark className="text-3xl text-green-500" />,
    },
    {
      title: "Sports Events",
      description:
        "Promoting health and teamwork through various sports activities and tournaments.",
      icon: <FaTrophy className="text-3xl text-green-500" />,
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
        className="text-3xl font-bold text-center text-gray-800 mb-4 font-poppins"
      >
        Community Initiatives
      </motion.h2>
      <motion.p
        variants={fadeIn}
        className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
      >
        Our community actively supports various initiatives that benefit members
        and preserve our heritage.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {initiatives.map((initiative, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-green-100 text-center"
            whileHover={{ y: -5 }}
          >
            <div className="bg-gradient-to-br from-green-50 to-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-green-100 transition-colors duration-300">
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

// Nadar Flag Inspired Section
const NadarFlagInspired = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      className="my-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center shadow-2xl border border-white/20 relative overflow-hidden"
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

      <h2 className="text-3xl font-bold mb-4 font-poppins">
        Nadar Community Pride
      </h2>
      <p className="text-white/90 mb-6 max-w-2xl mx-auto">
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

// Social Links Component
const SocialLinks = () => {
  const socials = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-xl" />,
      url: "https://www.linkedin.com/in/abishek04/",
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-xl" />,
      url: "https://github.com/AbishekSathiyan",
      color: "hover:text-gray-800",
    },
    {
      name: "Portfolio",
      icon: <FaLaptopCode className="text-xl" />,
      url: "https://abishek-portfolio-front-end.vercel.app/",
      color: "hover:text-green-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex justify-center space-x-6 mt-6"
    >
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-500 ${social.color} transition-colors duration-300`}
          aria-label={social.name}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

// Main Product Launch Component
const ProductLaunch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-green-800 mb-4 font-poppins">
            Methalodai Community
          </h1>
          <p className="text-xl text-blue-600 font-poppins">
            Community Platform Launch - August 29, 2025
          </p>
        </motion.header>

        <div className="relative mb-16">
          <HeroSection />
        </div>

        <div className="mb-16">
          <CountdownTimer />
        </div>

        <KamarajarTribute />

        <CommunityValues />

        <CommunityInitiatives />

        <CulturalSignificance />

        <MethalodaiHeritage />

        <NadarFlagInspired />

        <NewsletterSignup />

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 mt-16 pt-8 border-t border-gray-200"
        >
          <p>© 2025 Methalodai Community. All rights reserved.</p>
          <SocialLinks />
        </motion.footer>
      </div>
    </div>
  );
};

export default ProductLaunch;
