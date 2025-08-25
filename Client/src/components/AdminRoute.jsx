import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth(); // Get logged-in user from context
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL; // Frontend .env admin email

  if (!user) {
    // Not logged in at all
    return <Navigate to="/login" replace />;
  }

  if (user.email !== adminEmail) {
    // Logged in but not admin
    return <Navigate to="/home" replace />;
  }

  // User is admin
  return children;
};

export default AdminRoute;
