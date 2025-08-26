// AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VillageLogin from "./pages/Login";
import VillageSignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./components/Profile/ProfilePage";
import NoticeBoardPage from "./components/Announcement";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SearchUsersPage from "./pages/Search";
import MessagesPage from "./pages/MessagePage";
import MessageThreadPage from "./pages/MessageThreadPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin"; // Import the AdminLogin component
import AdminRoute from "./components/AdminRoute"; // Import the AdminRoute component
import ProductLaunch from "./components/ProductLanch/Launch";
export default function AppRoutes() {
  return (
    <Routes>
      {/* 404
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <VillageLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <VillageSignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-email"
        element={
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        }
      />
      <Route
        path="/notices"
        element={
          <PublicRoute>
            <NoticeBoardPage />
          </PublicRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicRoute>
            <Contact />
          </PublicRoute>
        }
      />
      <Route
        path="/search"
        element={
          <PublicRoute>
            <SearchUsersPage />
          </PublicRoute>
        }
      />
      <Route
        path="/admin/login"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <PrivateRoute>
            <MessagesPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/messages/:userId"
        element={
          <PrivateRoute>
            <MessageThreadPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      
      <Route path="*" element={<NotFound />} />
*/}
      <Route path="/" element={<ProductLaunch />} />
      <Route path="*" element={<ProductLaunch />} />
    </Routes>
  );
}
