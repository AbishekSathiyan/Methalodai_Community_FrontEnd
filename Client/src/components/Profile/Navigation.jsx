import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navigation = ({ handleLogout, user }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

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
              <Link
                to="/profile"
                className={`${
                  location.pathname === "/profile"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </Link>

              {/* User info and logout in right corner */}
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-3 ml-2">
                {user && (
                  <div className="text-sm text-gray-500">
                    Hi, {user.name || user.email}
                  </div>
                )}
                <button
                  onClick={handleLogoutClick}
                  className="text-gray-600 hover:bg-red-50 hover:text-red-700 px-4 py-2 rounded-md text-sm font-medium transition flex items-center"
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              {user && (
                <div className="text-sm text-gray-500 mr-3 truncate max-w-[100px]">
                  Hi, {user.name || user.email.split("@")[0]}
                </div>
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

        {/* Mobile Navigation - Improved with better spacing and bottom sheet style */}
        {showMobileMenu && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setShowMobileMenu(false)}
          >
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg animate-slide-up">
              <div className="flex justify-center p-2">
                <div className="w-10 h-1 bg-gray-300 rounded-full my-1"></div>
              </div>
              <div className="px-4 pt-2 pb-6 space-y-3">
                <div className="flex items-center px-3 py-4 border-b border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-indigo-600"
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
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || "example@email.com"}
                    </p>
                  </div>
                </div>

                <Link
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600"
                  } block px-4 py-3 rounded-lg text-base font-medium transition flex items-center`}
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
                  className={`${
                    location.pathname === "/profile"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600"
                  } block px-4 py-3 rounded-lg text-base font-medium transition flex items-center`}
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
                  Profile
                </Link>

                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left text-red-600 hover:bg-red-50 block px-4 py-3 rounded-lg text-base font-medium transition flex items-center"
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

      {/* Logout Confirmation Modal - Improved for mobile */}
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
