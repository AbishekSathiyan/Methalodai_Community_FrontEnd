// src/components/UserSearchSkeleton.jsx
import React from "react";

const UserSearchSkeleton = ({ count = 4 }) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-4 flex items-center justify-between animate-pulse"
        >
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full bg-gray-200"></div>
            <div className="ml-4 space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
};

export default UserSearchSkeleton;
