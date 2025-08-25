import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoticeBoard from "../components/Announcement";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header / Navbar */}
      <Header />

      {/* Announcements Section */}
      <section id="announcements" className="py-20 max-w-6xl mx-auto px-6">
        <NoticeBoard />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
