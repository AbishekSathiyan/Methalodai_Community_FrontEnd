import React from "react";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return children; // Don't redirect authenticated users
};

export default PublicRoute;
