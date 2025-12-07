import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Dispatch custom logout event for dashboard reset
    window.dispatchEvent(new Event("logoutEvent"));

    // ✅ Remove all localStorage data (complete reset)
    localStorage.clear();

    // ✅ Optional: also clear sessionStorage (if used anywhere)
    sessionStorage.clear();

    // ✅ Optional short delay before redirect
    setTimeout(() => {
      navigate("/"); // redirect to home or login
      window.location.reload(); // 🔁 force full reload = fresh start
    }, 300);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        background: "#f9f9f9",
      }}
    >
      <h2 style={{ color: "#333" }}>Logging out...</h2>
      <p style={{ color: "#777" }}>
        Please wait, redirecting to the registration page.
      </p>
    </div>
  );
};

export default Logout;
