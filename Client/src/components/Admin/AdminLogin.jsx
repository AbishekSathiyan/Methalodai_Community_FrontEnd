import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiShield,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get logged-in user from context
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  // Redirect if already logged in
  useEffect(() => {
    if (user && user.email !== adminEmail) {
      navigate("/home"); // Not admin → go home
    } else if (user && user.email === adminEmail) {
      navigate("/admin"); // Admin → go to dashboard
    }
  }, [user, navigate, adminEmail]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Check if email matches admin email
    if (formData.email !== adminEmail) {
      setErrors({ email: "You are not authorized as admin" });
      return;
    }

    setIsLoading(true);

    // Simulate API call (replace with real auth if needed)
    setTimeout(() => {
      setIsLoading(false);

      // Store dummy admin auth token
      localStorage.setItem("adminAuthToken", "your-auth-token-here");

      // Navigate to admin dashboard
      navigate("/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </button>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-6">
              {/* Logo */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <FiShield className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
                <p className="text-gray-600 mt-2">Sign in to access the dashboard</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="admin@example.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-75"
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>

              <div className="mt-6 p-3 bg-blue-50 rounded-lg text-center text-xs text-blue-800">
                <FiShield className="inline-block mr-1" />
                This is a secure admin portal. Ensure you're on the correct domain before entering credentials.
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Methalodai Community. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
