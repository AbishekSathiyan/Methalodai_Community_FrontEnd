import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, API_BASE_URL } from "../config/firebase";
import { getIdToken } from "firebase/auth";

const MessageThreadPage = () => {
  const { userId } = useParams(); // id of the user you are chatting with
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to see messages.");
        setLoading(false);
        return;
      }

      const token = await getIdToken(user, true);

      const res = await fetch(`${API_BASE_URL || "http://localhost:5000"}/api/messages/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch messages");

      const data = await res.json();
      setMessages(data.messages || []);

    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // auto-refresh every 3s
    return () => clearInterval(interval);
  }, [userId]);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await getIdToken(user, true);

      const res = await fetch(`${API_BASE_URL || "http://localhost:5000"}/api/messages/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newMessage }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setNewMessage("");
      fetchMessages(); // refresh messages
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to send message.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-800 via-emerald-700 to-green-800 text-white">
      <div className="flex items-center p-4 border-b border-white/20">
        <button onClick={() => navigate(-1)} className="mr-4 text-xl font-bold">←</button>
        <h1 className="text-lg font-bold">Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading && <p>Loading messages...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && messages.length === 0 && <p>No messages yet. Say hello!</p>}

        {messages.map((msg) => (
          <div
            key={msg._id || msg.id || Math.random()}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.senderId === auth.currentUser?.uid ? "bg-blue-600 ml-auto" : "bg-white/20"
            }`}
          >
            <p>{msg.text}</p>
            <span className="text-xs text-white/50">{new Date(msg.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/20 flex space-x-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-white/10 placeholder-white/50 focus:outline-none text-white"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageThreadPage;
