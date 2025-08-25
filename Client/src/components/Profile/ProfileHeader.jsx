import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import axios from "axios";
import { API } from "../../config/api";

// Import the default image correctly
import DefaultProfileImg from "../../assets/Kamarajar(3).jpeg";

const ProfileHeader = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;

      if (!user) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      // ✅ Get a fresh ID token from Firebase
      const token = await user.getIdToken(true);

      const res = await axios.get(API.auth.profile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Handle different possible response structures
      const profileData = res.data?.user || res.data?.profile || res.data;
      setProfile(profileData);
    } catch (err) {
      console.error("Failed to fetch profile:", err);

      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
      } else if (err.response?.status === 404) {
        setError("Profile not found.");
      } else if (err.response?.status >= 500) {
        setError("Server error. Try again later.");
      } else {
        setError(err.message || "Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();

    // Refresh profile if auth state changes
    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchProfile();
    });

    return () => unsubscribe();
  }, []);

  // Skeleton loading component
  if (loading) return <ProfileSkeleton />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-md text-center max-w-2xl mx-auto">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={fetchProfile}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );

  if (!profile)
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-md text-center max-w-2xl mx-auto">
        <p className="text-gray-700 mb-4">No profile data available</p>
        <button
          onClick={fetchProfile}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Refresh
        </button>
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto">
      {/* Header background */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <div className="px-6 pb-6 relative -mt-16">
        {/* Avatar section */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img
              src={profile.photoURL || DefaultProfileImg}
              alt={profile.name || "Profile"}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              onError={(e) => {
                // If the image fails to load, use the default image
                e.target.src = DefaultProfileImg;
              }}
            />
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        {/* Profile info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {profile.name || profile.displayName || "Unknown User"}
          </h1>

          {profile.jobTitle && (
            <p className="text-gray-600 mb-1 flex items-center justify-center">
              <span className="mr-2"></span>
              {profile.jobTitle}
            </p>
          )}

          {profile.location && (
            <p className="text-gray-600 mb-1 flex items-center justify-center">
              <span className="mr-2">📍</span>
              {profile.location}
            </p>
          )}

          {profile.email && (
            <p className="text-gray-600 mb-3 flex items-center justify-center">
              <span className="mr-2">✉️</span>
              {profile.email}
            </p>
          )}

          {profile.bio && (
            <div className="bg-gray-50 p-4 rounded-lg mt-3">
              <p className="text-gray-700">{profile.bio}</p>
            </div>
          )}
        </div>

        {/* Stats section */}
        <div className="flex justify-center border-t border-gray-100 pt-4">
          <div className="flex space-x-6">
            <div className="text-center">
              <span className="block font-bold text-gray-800">245</span>
              <span className="text-sm text-gray-500">Friends</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-gray-800">47</span>
              <span className="text-sm text-gray-500">Posts</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-gray-800">89</span>
              <span className="text-sm text-gray-500">Likes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton loading component
const ProfileSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto animate-pulse">
      {/* Header background skeleton */}
      <div className="h-32 bg-gray-300"></div>

      <div className="px-6 pb-6 relative -mt-16">
        {/* Avatar skeleton */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-300 shadow-lg"></div>
        </div>

        {/* Profile info skeleton */}
        <div className="text-center mb-6 space-y-3">
          <div className="h-7 bg-gray-300 rounded mx-auto w-3/5"></div>
          <div className="h-4 bg-gray-300 rounded mx-auto w-2/5"></div>
          <div className="h-4 bg-gray-300 rounded mx-auto w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded mx-auto w-2/5"></div>
          <div className="h-16 bg-gray-300 rounded-lg mt-3 mx-auto w-full"></div>
        </div>

        {/* Stats skeleton */}
        <div className="flex justify-center border-t border-gray-100 pt-4">
          <div className="flex space-x-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="text-center space-y-2">
                <div className="h-5 bg-gray-300 rounded w-8 mx-auto"></div>
                <div className="h-3 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
