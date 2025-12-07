import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Registration.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import img from "./logo.png";

const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const sponsorId = searchParams.get("sponsorId") || "";
  const refName = searchParams.get("refName") || "";

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    transactionPin: "",
    referralCode: sponsorId || "",
    referralName: decodeURIComponent(refName) || "",
    hasReferral: true,
    agreed: false,
  });

  const [popup, setPopup] = useState({ show: false, username: "", password: "" });

  useEffect(() => {
    if (sponsorId || refName) {
      setForm((prev) => ({
        ...prev,
        referralCode: sponsorId || "",
        referralName: decodeURIComponent(refName) || "",
      }));
    }
  }, [sponsorId, refName]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name" && /[^a-zA-Z\s]/.test(value)) return;
    if (name === "mobile" && (!/^\d*$/.test(value) || value.length > 10)) return;
    if (name === "transactionPin" && (!/^\d*$/.test(value) || value.length > 6)) return;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🟢 Generate referral code (same database logic integration)
  const generateReferralCode = (name) => {
    const base = name.replace(/\s+/g, "").toUpperCase().slice(0, 4);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${base}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agreed) return alert("Please agree to the Terms & Privacy.");
    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match!");

    try {
      // ✅ Step 1: Generate referral code before saving user
      const userReferralCode = generateReferralCode(form.name);

      // ✅ Step 2: Register user with referral code
     const res = await axios.post("https://api.vandv.ai/api/auth/register", {
  ...form,
  selfReferralCode: userReferralCode,
});


      console.log("Server Response:", res.data);

      const username = res.data?.username;
      if (!username) {
        alert("Invalid server response: username missing");
        return;
      }

      // ✅ Step 3: Save locally
      const registeredUser = { ...form, username, selfReferralCode: userReferralCode };
      localStorage.setItem("registeredUser", JSON.stringify(registeredUser));

      // ✅ Step 4: Save referral usage (if any)
      if (form.referralCode) {
        localStorage.setItem("referralCodeUsed", form.referralCode);
      }

      // ✅ Step 5: Create sponsor notification
      if (form.referralCode) {
        try {
          await axios.post("https://api.vandv.ai/api/notifications", {
            username: form.referralCode,
            message: `${form.name} has joined using your referral link! 🎉`,
          });
        } catch (err) {
          console.warn("Notification creation failed:", err.message);
        }
      }

      // ✅ Step 6: Save referral to database (optional separate table)
      try {
        await axios.post("https://api.vandv.ai/api/referral/create", {
          userEmail: form.email,
          userName: form.name,
          referralCode: userReferralCode,
          sponsorId: form.referralCode || null,
        });
      } catch (err) {
        console.warn("Referral DB save failed:", err.message);
      }

      // ✅ Step 7: Send welcome email (with referral code)
     // ✅ Step 7: Send welcome email via backend
try {
  await axios.post("https://api.vandv.ai/api/auth/send-welcome-email", {
    email: form.email,
    name: form.name,
    username,
    password: form.password,
    referralCode: userReferralCode,
  });
} catch (mailErr) {
  console.warn("Email send failed:", mailErr.message);
}


      // ✅ Step 8: Show popup
      setPopup({ show: true, username, password: form.password });

      // Reset form
      setForm({
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        transactionPin: "",
        referralCode: "",
        referralName: "",
        hasReferral: true,
        agreed: false,
      });
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.response?.data?.message || "Registration failed!");
    }
  };

  const handlePopupClose = () => {
    setPopup({ show: false, username: "", password: "" });
    navigate("/login");
  };

  return (
    <div className="register-bg">
      <div className="register-overlay">
        <form className="register-box" onSubmit={handleSubmit}>
          <img src={img} alt="Logo" className="sidebar-logo" />
          <p className="login-note">
            Have an account? <Link to="/login">Login</Link>
          </p>
          <hr />
          <p className="signup-note">Continue Signing Up</p>

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
              maxLength={10}
              inputMode="numeric"
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
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter Confirm Password"
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
            maxLength={6}
            inputMode="numeric"
          />

          {!sponsorId && (
            <div className="checkbox-row">
              <input
                type="checkbox"
                name="hasReferral"
                checked={!form.hasReferral}
                onChange={() =>
                  setForm({ ...form, hasReferral: !form.hasReferral })
                }
              />
              <span>Don’t have a Referral Code?</span>
            </div>
          )}

          {form.hasReferral && (
            <>
              <label>Referral Code*</label>
              <input
                type="text"
                name="referralCode"
                placeholder="Enter Referral Code"
                value={form.referralCode}
                onChange={handleChange}
                readOnly={!!sponsorId}
              />

              <label>Referral Name*</label>
              <input
                type="text"
                name="referralName"
                placeholder="Referral Name"
                value={form.referralName}
                onChange={handleChange}
                readOnly={!!refName}
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
              I agree to the{" "}
              <a href="https://vandvagro.com/updatep.html">Terms & Privacy</a>
            </span>
          </div>

          <button type="submit" className="proceed-btn">
            PROCEED
          </button>
        </form>
      </div>

      {popup.show && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>🎉 Registration Successful!</h3>
            <p>Your login details are:</p>
            <h2 className="username-highlight">Username: {popup.username}</h2>
            <h3 className="password-highlight">Password: {popup.password}</h3>
            <p>We’ve also sent these details to your registered email address.</p>
            <button onClick={handlePopupClose}>Go to Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
