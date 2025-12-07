import React, { useEffect, useState } from "react";
import "./Topbar.css";

export default function Topbar() {
  const [userName, setUserName] = useState("User");
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    
    const storedUser = localStorage.getItem("registeredUser");
    const loggedUser = localStorage.getItem("user");

    let name = "User";
    let username = "";

    // ✅ Prefer data from registration
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      name = userData.name || "User";
      username = userData.username || "";
    } 
    // ✅ Fallback to login data if registration not found
    else if (loggedUser) {
      const userData = JSON.parse(loggedUser);
      name = userData.name || "User";
      username = userData.username || "";
    }

    setUserName(name);

    // ✅ Generate referral link using the same username as registration/login
    const baseUrl = window.location.origin;

    const referralCode =
      username && username.trim() !== ""
        ? username
        : `V&V25${Math.floor(100000 + Math.random() * 900000)}`;

    const refName = encodeURIComponent(name);

    const link = `${baseUrl}/?sponsorId=${referralCode}&refName=${refName}`;
    setReferralLink(link);
  }, []);

 
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied!");
  };

  
  const date = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
 
  
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="topbar-title">Hello {userName} 👋</h2>
        
      </div>

      <div className="dashboard-header">
        <div className="referral-box">
          <input
            readOnly
            value={referralLink}
            style={{
              padding: "12px 16px",
              width: "720px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "20px",
              color: "#000",
              background: "#ffffff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              outline: "none",
              position: "relative",
              top: "25px",
              right: "70px",
            }}
          />
          <button onClick={handleCopy}>Copy</button>
          <span className="active">Active</span>
        </div>
      </div>

      <div className="topbar-right">
        <span className="date-box">{date}</span>
        <button className="icon-btn">⚙️</button>
        <button className="icon-btn notification-btn">
          🔔
          <span className="notification-badge">3</span>
        </button>
      </div>
    </header>
  );
}
