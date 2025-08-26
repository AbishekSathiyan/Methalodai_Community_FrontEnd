import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaLaptopCode } from "react-icons/fa";

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
      color: "hover:text-blue-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex justify-center space-x-4" // smaller spacing
    >
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-gray-500 ${social.color} transition-colors duration-300 bg-white p-2 rounded-full shadow-md`}
          aria-label={social.name}
          whileHover={{ scale: 1.15, y: -3 }} // subtle hover
          whileTap={{ scale: 0.9 }}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
