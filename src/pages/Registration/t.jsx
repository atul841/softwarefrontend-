import React, { useState } from "react";
import axios from "axios";
import "./Registration.css";
import { Link } from "react-router-dom";

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    transactionPin: "",
    referralCode: "12345",
    referralName: "V&V",
    hasReferral: true,
    agreed: false,
  });

  const [popup, setPopup] = useState({
    show: false,
    username: "",
    password: "",
  });

  // === Handle input changes ===
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // === Handle form submit ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agreed) {
      alert("Please agree to the Terms & Privacy.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // ✅ Generate random username
    const username = `V&V25${Math.floor(100000 + Math.random() * 900000)}`;

      // ✅ Send registration data to backend
      const res = await axios.post("https://api.vandv.ai/api/register", {
        ...form,
        username: randomUsername,
      });

      if (res.data && res.status === 200) {
        // ✅ Show popup with credentials
        setPopup({
          show: true,
          username: username,
          password: form.password,
        });

        // ✅ Reset the form
        setForm({
          name: "",
          mobile: "",
          email: "",
          password: "",
          confirmPassword: "",
          transactionPin: "",
          referralCode: "12345",
          referralName: "V&V",
          hasReferral: true,
          agreed: false,
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.response?.data?.message || "Registration failed! Check server or connection.");
    }
  };

  // === Handle popup close ===
  const handleClosePopup = () => {
    setPopup({ show: false, username: "", password: "" });
  };

  return (
    <div className="register-bg">
      <div className="register-overlay">
        <form className="register-box" onSubmit={handleSubmit}>
          <h1 className="brand-title">V&V</h1>
          <p className="login-note">
            You have an account? <Link to="/login">Login</Link>
          </p>
          <hr />
          <p className="signup-note">Sign up. It is fast and easy.</p>

          <label>Name*</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Mobile No.*</label>
          <div className="mobile-input">
            <select>
              <option value="+91">(+91) India</option>
            </select>
            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile No."
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <label>Email Id*</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Id"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password*</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <label>Transaction Pin*</label>
          <input
            type="password"
            name="transactionPin"
            placeholder="Enter Transaction Pin"
            value={form.transactionPin}
            onChange={handleChange}
            required
          />

          <div className="checkbox-row">
            <input
              type="checkbox"
              name="hasReferral"
              checked={!form.hasReferral}
              onChange={() => setForm({ ...form, hasReferral: !form.hasReferral })}
            />
            <span>Don’t have a Referral Code?</span>
          </div>

          {form.hasReferral && (
            <>
              <label>Referral Code*</label>
              <input
                type="text"
                name="referralCode"
                placeholder="Enter Referral Code"
                value={form.referralCode}
                onChange={handleChange}
              />

              <label>Referral Name*</label>
              <input
                type="text"
                name="referralName"
                placeholder="Referral Name"
                value={form.referralName}
                onChange={handleChange}
              />
            </>
          )}

          <div className="checkbox-row">
            <input
              type="checkbox"
              name="agreed"
              checked={form.agreed}
              onChange={handleChange}
              required
            />
            <span>
              I agree to the <a href="#">Terms & Privacy</a>
            </span>
          </div>

          <button type="submit" className="proceed-btn">
            PROCEED
          </button>
        </form>

        {/* ✅ Popup Modal */}
        {popup.show && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>🎉 Registration Successful!</h3>
              <p>Your Username: <b>{popup.username}</b></p>
              <p>Your Password: <b>{popup.password}</b></p>
              <button onClick={handleClosePopup} className="popup-btn">OK</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
