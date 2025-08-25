import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, API_BASE_URL } from "../config/firebase"; // adjust if needed
import { getIdToken } from "firebase/auth";

const MessagesPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to see users.");
        setLoading(false);
        return;
      }

      const token = await getIdToken(user, true);

      const res = await fetch(`${API_BASE_URL || "http://localhost:5000"}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to fetch users.");
      }

      const data = await res.json();
      setUsers(data.users || data); // depends on your API structure

    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user._id || user.id}
              className="p-4 rounded-lg shadow-md bg-white/10 hover:bg-white/20 cursor-pointer transition-all duration-200"
              onClick={() => navigate(`/messages/${user._id || user.id}`)}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL || "/assets/kamarajar (3).jpeg"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
                />
                <div>
                  <p className="font-semibold text-white">{user.name || user.displayName}</p>
                  {user.bio && <p className="text-sm text-white/70 truncate">{user.bio}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
