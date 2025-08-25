import React from 'react';
import { FiBell, FiUsers, FiMail, FiMenu, FiX } from 'react-icons/fi';

const AdminSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, mobileSidebarOpen }) => {
  return (
    <div className={`bg-blue-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} ${mobileSidebarOpen ? 'absolute inset-y-0 left-0 z-50 md:relative' : 'hidden md:block'} transition-all duration-300`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h1 className="text-xl font-bold">Methalodai Admin</h1>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      <nav className="mt-6">
        <button 
          onClick={() => setActiveTab('announcements')} 
          className={`flex items-center w-full p-4 ${activeTab === 'announcements' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FiBell size={20} />
          {sidebarOpen && <span className="ml-3">Announcements</span>}
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          className={`flex items-center w-full p-4 ${activeTab === 'users' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FiUsers size={20} />
          {sidebarOpen && <span className="ml-3">Users</span>}
        </button>
        <button 
          onClick={() => setActiveTab('contacts')} 
          className={`flex items-center w-full p-4 ${activeTab === 'contacts' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
        >
          <FiMail size={20} />
          {sidebarOpen && <span className="ml-3">Contacts</span>}
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;