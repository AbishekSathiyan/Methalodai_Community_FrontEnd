import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMessageCircle, FiX, FiClock } from "react-icons/fi";
import { auth } from "../config/firebase";
import { getIdToken } from "firebase/auth";
import UserSearchSkeleton from "../components/UserSearchSkeleton";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SearchUsersPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [sendingRequest, setSendingRequest] = useState(null); // track in-progress requests

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    handleSearch();
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const token = await getIdToken(user);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
        }/api/search/users?q=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setSearchResults(data.users || []);

      if (data.users && data.users.length > 0) {
        setRecentSearches((prev) => [
          searchQuery,
          ...prev
            .filter((item) => item.toLowerCase() !== searchQuery.toLowerCase())
            .slice(0, 4),
        ]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // Send friend/request
  const sendRequest = async (userId) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      setSendingRequest(userId);

      const token = await getIdToken(user);
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
        }/api/search/friends/request/${userId}`, // ✅ fixed URL
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send request");

      setSentRequests((prev) => [...prev, userId]);
      alert("Request sent successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setSendingRequest(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="pt-16 pb-10">
        <main className="flex-1 px-4 max-w-4xl w-full mx-auto">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100 mt-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Find People</h1>
            <div className="relative flex items-center">
              <FiSearch size={20} className="absolute left-4 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search by name, email, or username"
                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">Press Enter to search</p>
          </div>

          {/* Recent Searches */}
          {!searchQuery && recentSearches.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
              <h2 className="font-semibold text-gray-700 mb-4 flex items-center">
                <FiClock className="mr-2" /> Recent Searches
              </h2>
              <div className="flex flex-wrap gap-3">
                {recentSearches.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(query)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 flex items-center"
                  >
                    <FiSearch size={14} className="mr-2" />
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          <div className="space-y-4 relative">
            {error ? (
              <div className="bg-red-50 text-red-600 p-6 rounded-xl text-center border border-red-200">
                {error}
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between border border-gray-100 hover:shadow"
                >
                  <div
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className="flex items-center cursor-pointer min-w-0"
                  >
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      className="w-14 h-14 rounded-full border mr-4 object-cover"
                      alt={user.name}
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-800 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">@{user.username}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/messages/${user._id}`)}
                      className="p-2 rounded-full text-blue-500 hover:bg-blue-50"
                      title="Message"
                    >
                      <FiMessageCircle size={20} />
                    </button>

                    <button
                      onClick={() => sendRequest(user._id)}
                      disabled={sentRequests.includes(user._id) || sendingRequest === user._id}
                      className={`px-3 py-1.5 rounded-lg text-white text-sm ${
                        sentRequests.includes(user._id) || sendingRequest === user._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {sentRequests.includes(user._id)
                        ? "Request Sent"
                        : sendingRequest === user._id
                        ? "Sending..."
                        : "Send Request"}
                    </button>
                  </div>
                </div>
              ))
            ) : searchQuery.length > 0 ? (
              <div className="bg-white rounded-xl p-12 text-center text-gray-500">
                No User Found
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center text-gray-500">
                Start typing to search users
              </div>
            )}

            {isLoading && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-xl">
                <UserSearchSkeleton count={4} />
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SearchUsersPage;
