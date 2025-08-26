import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginPopup(true);

      // After 2s redirect to login
      const timer = setTimeout(() => setRedirect(true), 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, user]);

  if (loading) return <div>Loading...</div>;

  if (redirect) return <Navigate to="/login" replace />;

  if (user) return children;

  return (
    <>
      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-bold mb-2">Login Required</h2>
            <p className="text-gray-600">Please login to access your profile.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PrivateRoute;
