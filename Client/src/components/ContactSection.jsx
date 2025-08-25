import React from "react";
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiExternalLink,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactSection = () => {
  const contactItems = [
    {
      icon: <FiMail className="text-blue-600 dark:text-blue-400 text-xl" />,
      title: "Email",
      content: "abishek.sathiyan.2002@gmail.com",
      link: "mailto:abishek.sathiyan.2002@gmail.com",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <FiMapPin className="text-blue-600 dark:text-blue-400 text-xl" />,
      title: "Location",
      content: "Methalodai, Tamil Nadu, India",
      link: "https://maps.app.goo.gl/example",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: <FiPhone className="text-blue-600 dark:text-blue-400 text-xl" />,
      title: "Phone",
      content: "+91 7092085864",
      link: "tel:+917092085864",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
  ];

  const socialLinks = [
    {
      icon: (
        <FaLinkedinIn className="text-blue-700 dark:text-blue-400 text-xl" />
      ),
      url: "https://linkedin.com/in/abishek04",
      bg: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
      label: "LinkedIn",
    },
    {
      icon: <FaGithub className="text-gray-800 dark:text-white text-xl" />,
      url: "https://github.com/AbishekSathiyan",
      bg: "hover:bg-gray-200 dark:hover:bg-gray-600",
      label: "GitHub",
    },
    {
      icon: (
        <FaWhatsapp className="text-green-600 dark:text-green-400 text-xl" />
      ),
      url: "https://wa.me/917092085864",
      bg: "hover:bg-green-100 dark:hover:bg-green-900/30",
      label: "WhatsApp",
    },
  ];

  return (
    <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Send Me a Message
              </h3>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      className="pl-10 w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="pl-10 w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                      <FiMessageSquare className="text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      rows="5"
                      className="pl-10 w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      placeholder="Hello, I'd like to talk about..."
                      required
                    ></textarea>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiSend />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Column - Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-start gap-4 p-4 rounded-lg transition ${item.bg}`}
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 rounded-lg">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.content}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Connect With Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-full transition ${social.bg}`}
                      aria-label={social.label}
                      whileHover={{ y: -3 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.070734615914!2d78.8639504!3d9.2815489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b019734aa46519b%3A0x4b5f1c9e365c7cf6!2sMethalodai%2C%20Tamil%20Nadu%20623532!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="dark:grayscale dark:opacity-90"
                title="Google Maps Location"
              ></iframe>
              <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="https://maps.app.goo.gl/example"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <FiMapPin />
                  Get Directions
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
