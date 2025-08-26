import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaQuoteLeft,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaWhatsapp,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import MineImg from "../../assets/Abishek S.jpeg";

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
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotate effect - every 3 seconds
  useEffect(() => {
    let rotationInterval;
    if (autoRotate) {
      rotationInterval = setInterval(() => {
        setIsFlipped((prev) => !prev);
      }, 3000); // Rotate every 3 seconds
    }

    return () => {
      if (rotationInterval) clearInterval(rotationInterval);
    };
  }, [autoRotate]);

  const handleCardClick = () => {
    setAutoRotate(false); // Stop auto-rotation when clicked
    setIsFlipped((prev) => !prev); // Toggle flip state
  };

  const handleMouseEnter = () => {
    setAutoRotate(false); // Pause auto-rotation on hover
  };

  const handleMouseLeave = () => {
    setAutoRotate(true); // Resume auto-rotation when not hovering
  };

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
          <div
            className="w-96 h-[550px] perspective-1000 cursor-pointer"
            onClick={handleCardClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              className="relative w-full h-full preserve-3d transition-all duration-500"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
            >
              {/* Front of the card */}
              <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <div className="w-full h-full relative">
                  <img
                    src={MineImg}
                    alt="Methalodai Heritage"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-xl font-bold font-poppins mb-1 bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent">
                        Methalodai Developer
                      </h3>
                      <p className="text-sm font-medium bg-gradient-to-r from-blue-300 to-green-600 bg-clip-text text-transparent">
                        Methalodai Community
                      </p>
                      <p className="text-xs bg-gradient-to-r from-blue-300 to-green-700 bg-clip-text text-transparent">
                        Established 2025
                      </p>
                      <p className="text-xs mt-2 opacity-80 bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                        Click to {isFlipped ? "see front" : "connect with me"}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent flex items-center">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              !autoRotate ? "bg-gray-400" : "bg-emerald-400"
                            } mr-1 ${autoRotate ? "animate-pulse" : ""}`}
                          ></span>
                          {autoRotate
                            ? "Auto-rotating every 3s"
                            : "Rotation paused (hovering)"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back of the card - Your details */}
              <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-blue-600 to-emerald-600 text-white rotate-y-180 p-6 flex flex-col">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold font-poppins mb-2">
                    Abishek S
                  </h3>
                  <p className="text-blue-100 bg-white/10 py-1 px-3 rounded-full inline-block text-sm">
                    Software Developer
                  </p>
                </div>

                <div className="space-y-3 mb-4 flex-grow">
                  <div className="flex items-start">
                    <FaUser className="text-blue-200 mr-3 min-w-[16px] mt-1" />
                    <span className="text-sm">S/O Sathiyan & Kalaivani</span>
                  </div>

                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-200 mr-3 min-w-[16px] mt-1" />
                    <span className="text-sm">
                      Methalodai, Ramanathapuram, Tamil Nadu
                    </span>
                  </div>

                  <div className="flex items-center">
                    <FaPhone className="text-blue-200 mr-3 min-w-[16px]" />
                    <span className="text-sm">+91 7092085864</span>
                  </div>

                  <div className="flex items-start">
                    <FaEnvelope className="text-blue-200 mr-3 min-w-[16px] mt-1" />
                    <span className="text-sm break-all">
                      abishek.sathiyan.2002@gmail.com
                    </span>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-blue-200 mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        React
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        JavaScript
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        Node.js
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        MongoDB
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        Express
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        Tailwind CSS
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        Python
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact buttons */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <a
                    href="https://wa.me/917092085864"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg flex items-center justify-center text-sm transition-colors"
                  >
                    <FaWhatsapp className="mr-1" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:abishek.sathiyan.2002@gmail.com"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center justify-center text-sm transition-colors"
                  >
                    <FaEnvelope className="mr-1" />
                    Email
                  </a>
                </div>

                {/* Portfolio link */}
                <a
                  href="https://abishek-portfolio-front-end.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white py-2 px-3 rounded-lg flex items-center justify-center text-sm transition-colors mb-4"
                >
                  <FaGlobe className="mr-2" />
                  View My Portfolio
                </a>

                {/* Social links */}
                <div className="flex justify-center space-x-4 mb-2">
                  <a
                    href="https://www.linkedin.com/in/abishek04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:text-linkedin transition-colors"
                    title="LinkedIn"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/AbishekSathiyan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:text-gray-200 transition-colors"
                    title="GitHub"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href="https://wa.me/917092085864"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:text-whatsapp transition-colors"
                    title="WhatsApp"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                </div>

                <p className="text-xs text-center text-blue-200 mt-2">
                  Click card to flip back
                </p>
              </div>
            </motion.div>
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

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .hover\:text-linkedin:hover {
          color: #0a66c2 !important;
        }
        .hover\:text-whatsapp:hover {
          color: #25d366 !important;
        }
      `}</style>
    </motion.div>
  );
};

export default MethalodaiHeritage;