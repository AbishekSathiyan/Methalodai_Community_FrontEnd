import React, { useEffect } from "react";
import {
  FiBell,
  FiCalendar,
  FiAlertTriangle,
  FiArrowRight,
} from "react-icons/fi";

const NoticeBoard = () => {
  // Enhanced sample notices with categories
  const notices = [
    {
      id: 1,
      title: "Beach Cleanup Drive",
      date: "2025-08-12",
      time: "6:00 AM - 9:00 AM",
      urgent: false,
      category: "Community Event",
      description:
        "Join us for a shoreline cleanup at Methalodai beach. Gloves and bags will be provided. All volunteers welcome!",
      location: "Methalodai Shoreline",
    },
    {
      id: 2,
      title: "Cyclone Warning",
      date: "2025-08-10",
      time: "Immediate",
      urgent: true,
      category: "Weather Alert",
      description:
        "Cyclone warning issued for our coastal region. Fishermen strictly advised to return to shore immediately. Emergency shelters opened at community center.",
      location: "Entire Coastal Area",
    },
    {
      id: 3,
      title: "Cultural Festival 2025",
      date: "2025-08-15",
      time: "4:00 PM - 10:00 PM",
      urgent: false,
      category: "Annual Event",
      description:
        "Registrations open for performers and food stalls. Cash prizes for best performances. Last date for registration: August 10th.",
      location: "Community Grounds",
    },
    {
      id: 4,
      title: "Water Supply Interruption",
      date: "2025-08-14",
      time: "9:00 AM - 3:00 PM",
      urgent: false,
      category: "Public Service",
      description:
        "Pipeline maintenance work. Please store water accordingly. Water tankers will be available near the panchayat office.",
      location: "All Wards",
    },
    {
      id: 5,
      title: "Fishermen Safety Workshop",
      date: "2025-08-20",
      time: "10:00 AM - 1:00 PM",
      urgent: false,
      category: "Training",
      description:
        "Free workshop on modern fishing techniques and safety measures. Certificates will be provided. Limited seats available.",
      location: "Harbor Community Hall",
    },
    {
      id: 6,
      title: "Free Medical Camp",
      date: "2025-08-25",
      time: "8:00 AM - 4:00 PM",
      urgent: false,
      category: "Health",
      description:
        "General health checkup, eye tests, and blood sugar screening. No registration required. Organized by Govt. Medical Department.",
      location: "Primary Health Center",
    },
  ];

  useEffect(() => {
    const header = document.querySelector("header");
    header.dataset.ignoreScroll = "true";
    header.classList.add(
      "bg-gradient-to-br",
      "from-blue-800/90",
      "via-emerald-700/95",
      "to-green-800/95",
      "backdrop-blur-lg"
    );
    header.classList.remove("bg-white/90", "shadow-lg", "backdrop-blur-lg");

    return () => {
      header.dataset.ignoreScroll = "false";
    };
  }, []);

  return (
    <section
      id="announcements"
      className="py-12 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto"
      onScroll={(e) => e.stopPropagation()}
    >
      {/* Enhanced Header with Filter Options */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-3 rounded-xl shadow-sm">
            <FiBell className="text-blue-600 text-2xl" />
          </div>
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Community Announcements
            </h1>
            <p className="text-gray-600 mt-2">
              Stay updated with the latest news and events
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            All Announcements
          </button>
        </div>
      </div>

      {/* Notice Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg overflow-hidden ${
              notice.urgent
                ? "border-red-200 bg-gradient-to-br from-red-50 to-red-100"
                : "border-gray-200 bg-white hover:border-blue-200"
            }`}
          >
            {/* Urgent Badge */}
            {notice.urgent && (
              <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                <FiAlertTriangle className="mr-1" />
                <span>URGENT</span>
              </div>
            )}

            {/* Category Tag */}
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                notice.urgent
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {notice.category}
            </span>

            <h3
              className={`text-xl font-bold mb-3 ${
                notice.urgent ? "text-red-700" : "text-gray-800"
              }`}
            >
              {notice.title}
            </h3>

            <div className="flex items-center text-gray-500 text-sm mb-4">
              <FiCalendar className="mr-2" />
              <span>
                {notice.date} • {notice.time}
              </span>
            </div>

            <p className="text-gray-600 mb-5 line-clamp-3">
              {notice.description}
            </p>

            <div className="text-sm text-gray-500 mb-4">
              <span className="font-medium">Location:</span> {notice.location}
            </div>

            <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
              View details{" "}
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-green-600 transition-all">
          View All Announcements
        </button>
      </div>
    </section>
  );
};

export default NoticeBoard;
