import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiInfo, FiBell, FiBook, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { getIdToken, signOut } from "firebase/auth";
import Kamaraj from "../assets/kamarajar (3).jpeg";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [profileImage, setProfileImage] = useState(Kamaraj);
  const [userName, setUserName] = useState("Guest");
  const [userBio, setUserBio] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(false);

  const navItems = [
    { name: "Home", icon: FiHome },
    { name: "About", icon: FiInfo },
    { name: "Announcements", icon: FiBell },
    { name: "Courses", icon: FiBook },
    { name: "Contact", icon: FiMail }
  ];

  const getPhotoUrl = (photoURL) => {
    if (!photoURL) return Kamaraj;
    if (photoURL.startsWith("http")) return photoURL;
    return `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/uploads/${photoURL}`;
  };

  const fetchProfile = async () => {
    setLoadingProfile(true);
    setProfileError(false);
    try {
      const user = auth.currentUser;
      if (!user) {
        setUserName("Guest");
        setProfileImage(Kamaraj);
        setUserBio("");
        setLoadingProfile(false);
        return;
      }

      const token = await getIdToken(user, true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        console.error("Profile fetch failed:", await res.text());
        setUserName(user.displayName || "User");
        setProfileImage(Kamaraj);
        setUserBio("");
        setProfileError(true);
        return;
      }

      const data = await res.json();
      const userProfile = data.user || data.profile || data;
      setUserName(userProfile.name || userProfile.displayName || user.displayName || "User");
      setUserBio(userProfile.bio || "");
      
      // Set profile image only if it exists, otherwise use Kamaraj
      if (userProfile.photoURL) {
        const imgUrl = getPhotoUrl(userProfile.photoURL);
        
        // Verify the image actually loads
        const img = new Image();
        img.onload = () => {
          setProfileImage(imgUrl);
          setProfileError(false);
        };
        img.onerror = () => {
          setProfileImage(Kamaraj);
          setProfileError(true);
        };
        img.src = imgUrl;
      } else {
        setProfileImage(Kamaraj);
      }

    } catch (err) {
      console.error("Profile fetch error:", err);
      setUserName(auth.currentUser?.displayName || "User");
      setProfileImage(Kamaraj);
      setUserBio("");
      setProfileError(true);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchProfile();
      } else {
        setUserName("Guest");
        setProfileImage(Kamaraj);
        setUserBio("");
        setLoadingProfile(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
      setUserName("Guest");
      setProfileImage(Kamaraj);
      setUserBio("");
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
      setMobileMenuOpen(false);
    }
  };

  const handleJoinNow = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    if (item.name.toLowerCase() === "contact") {
      navigate("/contact");
    } else {
      navigate(`/#${item.name.toLowerCase()}`);
    }
  };

  return (
    <header className="fixed w-full z-50 bg-gradient-to-br from-blue-800/90 via-emerald-700/95 to-green-800/95 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Name + Bio */}
          <div
            className="flex flex-col md:flex-row items-start md:items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center">
              <img
                src={profileError ? Kamaraj : profileImage}
                alt="Profile"
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover mr-3 border-2 border-white/50 group-hover:border-white/80 transition-all duration-200"
                onError={(e) => {
                  // If image fails to load, use Kamaraj fallback
                  e.target.src = Kamaraj;
                  setProfileError(true);
                }}
              />
              {loadingProfile ? (
                <div className="animate-pulse h-6 w-32 bg-white/20 rounded mt-1 md:mt-0"></div>
              ) : (
                <div className="flex flex-col">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate max-w-[120px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-none">
                    {userName}
                  </h1>
                  {userBio && (
                    <span className="text-xs sm:text-sm text-white/70 truncate max-w-[120px] xs:max-w-[150px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-none">
                      {userBio}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="font-medium px-3 py-2 text-sm lg:text-base text-white hover:text-white/90 hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}

            <div className="ml-2 lg:ml-4 flex items-center space-x-2 lg:space-x-4">
              {userName !== "Guest" ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="px-3 py-1.5 text-sm lg:text-base rounded-lg font-medium bg-white/10 text-white hover:bg-white/20 transition-colors duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className={`px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base rounded-lg font-bold bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 ${
                      loggingOut ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loggingOut ? "..." : "Logout"}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleJoinNow}
                  className="px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  Join Now
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md md:hidden text-white hover:bg-white/10 transition-colors duration-200 relative z-60"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} className="text-white/90" /> : <FiMenu size={24} className="text-white/90" />}
          </button>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 right-4 w-56 bg-gradient-to-b from-blue-800/95 to-green-800/95 backdrop-blur-md shadow-xl z-50 rounded-lg border border-white/20 overflow-hidden transition-all duration-200">
              <div className="flex flex-col space-y-1 p-2">
                {/* User Info */}
                {userName !== "Guest" && (
                  <div className="flex items-center px-3 py-3 space-x-3 border-b border-white/10 pb-3">
                    <img
                      src={profileError ? Kamaraj : profileImage}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover border-2 border-white/50"
                      onError={(e) => {
                        e.target.src = Kamaraj;
                        setProfileError(true);
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-white truncate">{userName}</span>
                      {userBio && (
                        <span className="text-sm text-white/70 truncate max-w-[150px]">{userBio}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Items */}
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item)}
                      className="flex items-center font-medium px-3 py-3 rounded-md text-base text-white hover:bg-white/20 transition-colors duration-200 text-left w-full"
                    >
                      <IconComponent className="mr-3" size={18} />
                      {item.name}
                    </button>
                  );
                })}

                <div className="border-t border-white/10 my-1"></div>

                {/* Auth Buttons */}
                {userName !== "Guest" ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-3 rounded-md text-base font-medium text-white hover:bg-white/20 transition-colors duration-200 text-left"
                    >
                      <FiUser className="mr-3" size={18} />
                      Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className={`flex items-center w-full px-3 py-3 rounded-md text-base font-bold text-white bg-red-600/90 hover:bg-red-700 transition-colors duration-200 text-left ${
                        loggingOut ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      <FiLogOut className="mr-3" size={18} />
                      {loggingOut ? "Logging Out..." : "Logout"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleJoinNow}
                    className="flex items-center w-full px-3 py-3 rounded-md text-base font-bold bg-blue-600/90 text-white hover:bg-blue-700 transition-colors duration-200 text-left"
                  >
                    <FiUser className="mr-3" size={18} />
                    Join Now
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;