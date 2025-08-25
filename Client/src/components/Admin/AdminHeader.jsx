import React, { useState } from 'react';
import { FiSearch, FiMenu, FiUsers, FiMail, FiChevronDown, FiSettings, FiLogOut, FiUser } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminHeader = ({ 
  title = "Dashboard", 
  onMenuToggle, 
  searchPlaceholder = "Search...",
  onSearchChange,
  showSearch = true
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  // Check if current path matches to highlight active tab
  const isActiveTab = (path) => {
    return location.pathname === path;
  };

  // Sample user data
  const user = {
    name: "Admin User",
    role: "Administrator",
    avatar: "A"
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      {/* Top row with menu, title, search, and user profile */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side: Menu toggle and title */}
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 mr-4"
          >
            <FiMenu size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>

        {/* Right side: Search and user profile */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          {showSearch && (
            <div className="hidden md:flex relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          )}

          {/* User profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-2 p-2 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                {user.avatar}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <FiChevronDown className={`text-gray-400 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* User dropdown */}
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm text-gray-800 font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <button className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                  <FiUser className="mr-3" size={16} />
                  Your Profile
                </button>
                <button className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                  <FiSettings className="mr-3" size={16} />
                  Settings
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">
                  <FiLogOut className="mr-3" size={16} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row with navigation tabs */}
      <div className="border-t border-gray-100 bg-gray-50">
        <nav className="flex px-6 -mb-px">
          <button
            onClick={() => navigate('/admin/users')}
            className={`flex items-center py-3.5 px-5 border-b-2 font-medium text-sm transition-colors duration-200 ${isActiveTab('/admin/users') 
              ? 'border-blue-500 text-blue-600 bg-blue-50/50' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white'}`}
          >
            <FiUsers className="mr-2.5" size={17} />
            Users
            <span className="ml-2.5 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">24</span>
          </button>
          <button
            onClick={() => navigate('/admin/contacts')}
            className={`flex items-center py-3.5 px-5 border-b-2 font-medium text-sm transition-colors duration-200 ${isActiveTab('/admin/contacts') 
              ? 'border-blue-500 text-blue-600 bg-blue-50/50' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white'}`}
          >
            <FiMail className="mr-2.5" size={17} />
            Contacts
            <span className="ml-2.5 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">12</span>
          </button>
        </nav>
      </div>

      {/* Mobile search bar (shown when needed) */}
      {showSearch && (
        <div className="md:hidden px-6 py-3 border-t border-gray-100">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;