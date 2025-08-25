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
import NewsletterSignup from "./NewsletterSignup";
import SocialLinks from "./SocialLinks";

const ProductLaunch = () => {
  return (
    // ✅ Enhanced background with richer colors
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-200 via-emerald-100 to-blue-100 font-poppins">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-blue-800 mb-4 font-poppins">
            Methalodai Community
          </h1>
          <p className="text-xl text-emerald-700 font-poppins">
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
          className="text-center text-gray-700 mt-16 pt-8 border-t border-gray-300"
        >
          <p>© 2025 Methalodai Community. All rights reserved.</p>
          <SocialLinks />
        </motion.footer>
      </div>
    </div>
  );
};

export default ProductLaunch;