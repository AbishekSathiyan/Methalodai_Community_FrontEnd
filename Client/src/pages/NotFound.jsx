import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiCompass, FiMeh } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50 flex flex-col items-center justify-center p-4 text-center">
      {/* Village-themed 404 illustration */}
      <div className="relative mb-8">
        <div className="text-9xl font-bold text-amber-800 opacity-20">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl text-amber-600">
            <FiMeh className="inline-block" />
          </div>
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
        Lost in the Village
      </h1>
      
      <p className="text-lg text-amber-800 max-w-md mb-8">
        The path you're looking for doesn't exist in Methalodai Village. 
        Maybe you took a wrong turn at the old oak tree?
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <FiHome className="mr-2" />
          Return to Village Center
        </Link>
        
        <Link
          to="/login"
          className="flex items-center justify-center px-6 py-3 border border-amber-600 text-amber-700 rounded-lg hover:bg-amber-50 transition-all duration-300"
        >
          <FiCompass className="mr-2" />
          Guide Me Home
        </Link>
      </div>

      {/* Village decorations */}
      <div className="absolute bottom-10 left-10 text-green-700 text-4xl opacity-30">
        <FiHome />
      </div>
      <div className="absolute top-1/4 right-12 text-amber-600 text-3xl opacity-30">
        <FiHome />
      </div>
      <div className="absolute top-1/3 left-20 text-green-600 text-2xl opacity-30">
        <FiHome />
      </div>
    </div>
  );
};

export default NotFound;