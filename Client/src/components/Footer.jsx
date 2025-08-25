import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiPlus, FiSearch, FiMessageSquare, FiX } from "react-icons/fi";
import { auth } from "../config/firebase";
import { getIdToken } from "firebase/auth";
import KamarajarImg from "../assets/Kamarajar(3).jpeg";

// Central API helper
const API = {
  auth: {
    profile: `${(
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
    ).replace(/\/$/, "")}/api/auth/profile`,
  },
};

// Toast component
const Toast = ({
  message,
  onClose,
  type = "error",
  duration = 3000,
  onNavigate,
}) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setVisible(true);
    const interval = setInterval(
      () => setProgress((prev) => Math.max(0, prev - (100 / duration) * 50)),
      50
    );
    const timer = setTimeout(() => setVisible(false), duration - 300);
    const removeTimer = setTimeout(() => {
      onClose();
      if (onNavigate) onNavigate();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onClose, duration, onNavigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`pointer-events-auto bg-white p-8 rounded-xl shadow-2xl w-96 h-96 flex flex-col items-center justify-center text-center border-4 transform transition-all duration-300
          ${type === "error" ? "border-red-500" : "border-green-500"}
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
      >
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => {
              onClose();
              if (onNavigate) onNavigate();
            }, 300);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FiX size={24} />
        </button>

        <div className="mb-6">
          <div
            className={`text-6xl mb-4 ${
              type === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {type === "error" ? "⚠️" : "✅"}
          </div>
          <h3 className="text-2xl font-bold text-black mb-2">
            {type === "error" ? "Login Required" : "Success!"}
          </h3>
          <p className="text-gray-700 text-lg">{message}</p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-6">
          <div
            className={`h-2.5 rounded-full ${
              type === "error" ? "bg-red-500" : "bg-green-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Redirecting to login in {Math.ceil(progress / 33.3)} seconds...
        </p>
      </div>
    </div>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(KamarajarImg);
  const [userName, setUserName] = useState("Guest");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [profileError, setProfileError] = useState(false);
  const [toast, setToast] = useState(null);

  const getPhotoUrl = (photoURL) => {
    if (!photoURL) return KamarajarImg;
    if (photoURL.startsWith("http")) return photoURL;
    return `${(
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
    ).replace(/\/$/, "")}/uploads/${photoURL}`;
  };

  const fetchProfile = async () => {
    setLoadingProfile(true);
    setProfileError(false);

    try {
      const user = auth.currentUser;
      if (!user) {
        setUserName("Guest");
        setProfileImage(KamarajarImg);
        setLoadingProfile(false);
        return;
      }

      const token = await getIdToken(user, true);
      const res = await fetch(API.auth.profile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Profile fetch failed");

      const data = await res.json();
      const userProfile = data.user || data.profile || data;
      setUserName(userProfile.name || userProfile.displayName || "User");

      if (userProfile.photoURL) {
        const imgUrl = getPhotoUrl(userProfile.photoURL);
        const img = new Image();
        img.onload = () => {
          setProfileImage(imgUrl);
          setProfileError(false);
        };
        img.onerror = () => {
          setProfileImage(KamarajarImg);
          setProfileError(true);
        };
        img.src = imgUrl;
      } else {
        setProfileImage(KamarajarImg);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      setUserName(auth.currentUser?.displayName || "User");
      setProfileImage(KamarajarImg);
      setProfileError(true);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchProfile();
      else {
        setUserName("Guest");
        setProfileImage(KamarajarImg);
        setLoadingProfile(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-800/90 via-emerald-700/95 to-green-800/95 backdrop-blur-lg py-2 px-6 shadow-lg border-t border-white/10 z-40">
        <div className="flex justify-around items-center">
          <button
            onClick={() => navigate("/")}
            className="flex flex-col items-center text-white/90 hover:text-white transition-colors p-2"
          >
            <FiHome size={20} className="mb-1" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => navigate("/search")}
            className="flex flex-col items-center text-white/90 hover:text-white transition-colors p-2"
          >
            <FiSearch size={20} className="mb-1" />
            <span className="text-xs">Search</span>
          </button>

          <button
            onClick={() => navigate("/create")}
            className="flex flex-col items-center mt-0"
          >
            <div className="bg-white/20 p-3 rounded-full border-2 border-white/50 hover:bg-white/30 hover:border-white/70 transition-all duration-200 shadow-lg">
              <FiPlus size={22} className="text-white" />
            </div>
            <span className="text-xs mt-1 text-white/90">Create</span>
          </button>

          <button
            onClick={() => navigate("/messages")}
            className="flex flex-col items-center text-white/90 hover:text-white transition-colors p-2 relative"
          >
            <FiMessageSquare size={20} className="mb-1" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
            <span className="text-xs">Messages</span>
          </button>

          <button
            onClick={() => {
              if (userName && userName !== "Guest") navigate("/profile");
              else setToast("Please log in to access your profile.");
            }}
            className="flex flex-col items-center text-white/90 hover:text-white transition-colors p-2"
          >
            {loadingProfile ? (
              <div className="animate-pulse h-6 w-6 rounded-full bg-white/20 mb-1"></div>
            ) : (
              <img
                src={profileError ? KamarajarImg : profileImage}
                alt="Profile"
                className="h-6 w-6 rounded-full mb-1 object-cover border border-white/50"
                onError={(e) => {
                  e.target.src = KamarajarImg;
                  setProfileError(true);
                }}
              />
            )}
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </footer>

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
          type="error"
          onNavigate={() => navigate("/login")}
        />
      )}
    </>
  );
};

export default Footer;
