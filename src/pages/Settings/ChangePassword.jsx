import React, { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShow = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New Password and Confirm Password must match.");
      return;
    }
    alert("Password changed successfully!");
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <div className="header">
          <h3>Change Password</h3>
        </div>

        <form onSubmit={handleSubmit} className="password-form">
          {/* ===== CURRENT PASSWORD ===== */}
          <div className="form-group">
            <label>Current Password</label>
            <div className="input-group">
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                placeholder="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => toggleShow("current")}
                className="show-btn"
              >
                {showPassword.current ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ===== NEW PASSWORD ===== */}
          <div className="form-group">
            <label>New Password</label>
            <div className="input-group">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => toggleShow("new")}
                className="show-btn"
              >
                {showPassword.new ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ===== CONFIRM PASSWORD ===== */}
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-group">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => toggleShow("confirm")}
                className="show-btn"
              >
                {showPassword.confirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ===== BUTTONS ===== */}
          <div className="button-row">
            <button type="submit" className="btn-proceed">
              Proceed
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() =>
                setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
