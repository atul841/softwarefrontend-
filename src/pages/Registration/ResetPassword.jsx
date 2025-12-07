import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css"; // use your existing styling if you like
import img from "./logo.png";

const ResetPassword = () => {
  const { token } = useParams(); // extract token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return setMessage("❌ Password must be at least 6 characters long.");
    }
    if (password !== confirmPassword) {
      return setMessage("❌ Passwords do not match!");
    }

    try {
      setLoading(true);
      const res = await axios.post("https://api.vandv.ai/api/auth/reset-password", {
        token,
        newPassword: password,
      });

      setMessage("✅ " + res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Reset failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-bg">
      <div className="register-overlay">
        <form className="register-box" onSubmit={handleSubmit}>
          <img src={img} alt="Logo" className="sidebar-logo" />
          <h2 className="signup-note">Reset Your Password</h2>

          {message && (
            <p
              style={{
                backgroundColor: "#fff3cd",
                color: "#856404",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "14px",
                marginBottom: "10px",
              }}
            >
              {message}
            </p>
          )}

          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="proceed-btn" disabled={loading}>
            {loading ? "Resetting..." : "Update Password"}
          </button>

          <p className="login-note" style={{ marginTop: "10px" }}>
            Remembered your password? <a href="/login">Go to Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
