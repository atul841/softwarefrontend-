import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
  const location = useLocation();

  // 🟥 Agar login hi nahi kiya (token missing)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🟨 Agar login hai par purchase nahi kiya (sirf naye user ke liye)
  if (storedUser && storedUser.hasPurchased === false) {
    // agar user dashboard khol raha hai to rok do
    if (location.pathname.startsWith("/dashboard")) {
      return <Navigate to="/purchase" replace />;
    }
  }

  // 🟩 Agar purana user hai ya purchase complete hai
  return children;
};

export default ProtectedRoute;
