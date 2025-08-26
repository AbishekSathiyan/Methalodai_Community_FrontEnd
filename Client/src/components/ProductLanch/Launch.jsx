import React from "react";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import HeroSection from "./HeroSection";
import KamarajarTribute from "./KamarajarTribute";
import CommunityValues from "./CommunityValues";
import CommunityInitiatives from "./CommunityInitiatives";
import CulturalSignificance from "./CulturalSignificance";
import MethalodaiHeritage from "./MethalodaiHeritage";
import NadarFlagInspired from "./NadarFlagInspired";
import NewsletterSignup from "./NewsLetterSignup";
import SocialLinks from "./SocialLinks";

const ProductLaunch = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-200 via-emerald-100 to-blue-100 font-poppins flex flex-col">
      {/* Main content */}
      <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8 flex-grow w-full">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-800 mb-4 font-poppins">
            Methalodai Community
          </h1>
          <p className="text-sm sm:text-xl text-emerald-700 font-poppins">
            Community Platform Launch - August 29, 2025
          </p>
        </motion.header>

        <div className="relative mb-12 md:mb-16">
          <HeroSection />
        </div>

        <div className="mb-12 md:mb-16">
          <CountdownTimer />
        </div>

        <div className="space-y-16 md:space-y-20">
          <KamarajarTribute />
          <CommunityValues />
          <CommunityInitiatives />
          <CulturalSignificance />
          <MethalodaiHeritage />
          <NadarFlagInspired />
          <NewsletterSignup />
        </div>
      </div>

      {/* Footer with SocialLinks */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-gray-700 pt-8 pb-4 border-t border-gray-300 text-sm mt-8 md:mt-12"
      >
        <p className="mb-3">
          © {new Date().getFullYear()} Methalodai Community. All rights
          reserved.
        </p>
        <SocialLinks />
      </motion.footer>
    </div>
  );
};

export default ProductLaunch;
