import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../config/firebase";
import axios from "axios";
import { API } from "../../config/api";
import KamarajImg from "../../assets/Kamarajar(3).jpeg";

const Navigation = ({ handleLogout, user }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMailDropdown, setShowMailDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns when route changes
  useEffect(() => {
    setShowMobileMenu(false);
    setShowMailDropdown(false);
    setShowUserDropdown(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowMailDropdown(false);
      setShowUserDropdown(false);
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Fetch user profile data including image
  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchMail();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.get(`${API}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success && response.data.profile.profileImage) {
        setProfileImage(response.data.profile.profileImage);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // If there's an error, we'll just use the fallback image
    }
  };

  const fetchMail = async () => {
    try {
      setLoading(true);
      // Get auth token for authenticated request
      const token = await auth.currentUser.getIdToken();
      
      const response = await axios.get(`${API}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        const mailData = response.data.messages || [];
        setMessages(mailData);
        
        // Calculate unread count
        const unread = mailData.filter(msg => !msg.read).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error("Error fetching mail:", error);
      // For demo purposes, let's create some mock data
      setMessages([
        { id: 1, subject: "Welcome to ML Community", preview: "Thank you for joining our community...", read: true, date: "2023-10-15" },
        { id: 2, subject: "New Message from John", preview: "I wanted to discuss the project...", read: false, date: "2023-10-16" },
        { id: 3, subject: "Community Update", preview: "New features have been added to the platform...", read: false, date: "2023-10-17" }
      ]);
      setUnreadCount(2);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.patch(`${API}/messages/${messageId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Update local state
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, read: true } : msg
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    if (typeof handleLogout === "function") {
      handleLogout();
    } else {
      console.error("handleLogout is not a function");
      navigate("/");
    }
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Prevent dropdown from closing when clicking inside
  const handleDropdownClick = (e, dropdownType) => {
    e.stopPropagation();
    if (dropdownType === "mail") {
      setShowMailDropdown(!showMailDropdown);
      setShowUserDropdown(false);
    } else if (dropdownType === "user") {
      setShowUserDropdown(!showUserDropdown);
      setShowMailDropdown(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center text-xl font-bold text-indigo-700 hover:text-indigo-600 transition"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span className="hidden sm:inline">ML Community</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                } px-4 py-2 rounded-md text-sm font-medium transition flex items-center`}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>

              {/* Mail dropdown */}
              <div className="relative">
                <button
                  onClick={(e) => handleDropdownClick(e, "mail")}
                  className="relative text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 px-4 py-2 rounded-md text-sm font-medium transition flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Messages
                </button>

                {showMailDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">Messages</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {loading ? (
                        <div className="p-4 text-center text-gray-500">
                          Loading messages...
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No messages yet
                        </div>
                      ) : (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              !message.read ? "bg-blue-50" : ""
                            }`}
                            onClick={() => markAsRead(message.id)}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-sm text-gray-800">
                                {message.subject}
                              </h4>
                              {!message.read && (
                                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate mt-1">
                              {message.preview}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(message.date).toLocaleDateString()}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <Link
                        to="/messages"
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        onClick={() => setShowMailDropdown(false)}
                      >
                        View all messages
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User dropdown in top right corner */}
              <div className="relative">
                <div className="flex items-center">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <img 
                      src={KamarajImg} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}
                  <span className="ml-2 hidden lg:block">
                    {user?.name || user?.email}
                  </span>
                  <button
                    onClick={(e) => handleDropdownClick(e, "user")}
                    className="flex items-center text-sm text-gray-600 hover:text-indigo-700 transition"
                  >
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">
                      Signed in as
                      <div className="font-medium text-gray-900 truncate">
                        {user?.email}
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      Settings
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogoutClick}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {/* Messages icon for mobile */}
              <Link
                to="/messages"
                className="relative p-2 text-gray-600 mr-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </Link>

              {/* User avatar for mobile */}
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full object-cover mr-2"
                />
              ) : (
                <img 
                  src={KamarajImg} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full object-cover mr-2"
                />
              )}

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!showMobileMenu ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
            <div className="absolute top-16 right-0 w-64 bg-white rounded-bl-lg shadow-lg animate-slide-left">
              <div className="flex flex-col py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm text-gray-500">Signed in as</div>
                  <div className="font-medium text-gray-900 truncate">
                    {user?.email}
                  </div>
                </div>
                
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600"
                  } block px-4 py-3 text-base font-medium transition flex items-center`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Home
                </Link>

                <Link
                  to="/profile"
                  className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 block px-4 py-3 text-base font-medium transition flex items-center"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Your Profile
                </Link>

                <Link
                  to="/settings"
                  className="text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 block px-4 py-3 text-base font-medium transition flex items-center"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </Link>

                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left text-red-600 hover:bg-red-50 block px-4 py-3 text-base font-medium transition flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Add padding to content so it doesn't hide behind fixed navbar */}
      <div className="pt-16"></div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center p-4 z-50">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl max-w-md w-full p-6 animate-slide-up">
            <div className="flex justify-center mb-4 md:hidden">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Confirm Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex flex-col-reverse md:flex-row md:justify-end space-y-reverse space-y-2 md:space-y-0 md:space-x-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-3 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;