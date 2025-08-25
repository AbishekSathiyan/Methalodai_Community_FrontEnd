import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLogIn, FiUser, FiLock, FiHome, FiSun, FiAlertCircle, FiLoader } from "react-icons/fi";
import { GiPalmTree } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../AuthContext";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  theme: "colored",
};

const welcomeMessages = [
  "Welcome back, {name}! We've missed you!",
  "Great to see you again, {name}!",
  "Hello {name}! Ready to continue your journey?",
  "Welcome home, {name}!",
  "{name}! So glad you're back with us!",
];

const getRandomWelcomeMessage = (name = "friend") => {
  const idx = Math.floor(Math.random() * welcomeMessages.length);
  return welcomeMessages[idx].replace("{name}", name);
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VillageLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateInputs = () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError(null);
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading || !validateInputs()) return;

    setLoading(true);
    setError(null);

    try {
      const firebaseUser = await login(email.trim(), password.trim());
      const token = await firebaseUser.getIdToken();
      localStorage.setItem("firebaseToken", token);

      toast.success(getRandomWelcomeMessage(firebaseUser.displayName || firebaseUser.email), toastConfig);

      navigate("/home", { replace: true });
    } catch (err) {
      const displayMessage = err.message || "Login failed. Please check your credentials.";
      setError(displayMessage);
      toast.error(displayMessage, toastConfig);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-green-50 relative overflow-hidden font-[Poppins]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute top-10 right-20 text-yellow-300 text-6xl">
          <FiSun />
        </motion.div>
        <GiPalmTree className="absolute bottom-0 left-10 text-green-700 text-4xl" />
        <GiPalmTree className="absolute bottom-0 right-20 text-green-800 text-5xl" />
        <GiPalmTree className="absolute bottom-0 left-1/3 text-green-600 text-3xl" />
        <FiHome className="absolute bottom-0 left-1/4 text-amber-800 text-4xl" />
        <FiHome className="absolute bottom-0 right-1/3 text-amber-900 text-3xl" />
      </div>

      {/* Login Panel */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-8 py-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200"
      >
        <div className="text-center mb-8">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center justify-center mb-4">
            <FiHome className="text-4xl text-amber-600 mr-2" />
            <h1 className="text-3xl font-bold text-amber-800">Methalodai Village</h1>
          </motion.div>
          <p className="text-amber-700">Welcome back to our community</p>
        </div>

        {error && (
          <div className="flex items-center p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            <FiAlertCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <motion.div animate={{ y: isFocused.email ? -5 : 0, color: isFocused.email ? "#b45309" : "#92400e" }} className="flex items-center mb-1">
              <FiUser className="mr-2" />
              <label htmlFor="email">Email</label>
            </motion.div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, email: true })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
              placeholder="your@email.com"
              className="w-full px-4 py-3 pl-10 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-amber-50/50"
              disabled={loading}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <motion.div animate={{ y: isFocused.password ? -5 : 0, color: isFocused.password ? "#b45309" : "#92400e" }} className="flex items-center mb-1">
              <FiLock className="mr-2" />
              <label htmlFor="password">Password</label>
            </motion.div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused({ ...isFocused, password: true })}
              onBlur={() => setIsFocused({ ...isFocused, password: false })}
              placeholder="••••••••"
              className="w-full px-4 py-3 pl-10 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-amber-50/50"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-md text-white font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800"
            }`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              <>
                <FiLogIn className="mr-2" />
                Sign in to your account
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-amber-700">New to our village? </span>
          <button onClick={() => navigate("/signup")} disabled={loading} className="text-amber-600 hover:text-amber-500 disabled:opacity-50">
            Create your account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VillageLogin;
