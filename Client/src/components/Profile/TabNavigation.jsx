// components/TabNavigation.js
const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <nav className="flex overflow-x-auto">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-4 text-center border-b-2 font-medium text-sm min-w-max ${
            activeTab === "profile"
              ? "border-indigo-600 text-indigo-700 bg-white"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          } transition-colors`}
        >
          Profile Information
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-6 py-4 text-center border-b-2 font-medium text-sm min-w-max ${
            activeTab === "settings"
              ? "border-indigo-600 text-indigo-700 bg-white"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          } transition-colors`}
        >
          Account Settings
        </button>
      </nav>
    </div>
  );
};

export default TabNavigation;