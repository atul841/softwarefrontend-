import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import navConfig from "../config/navConfig";
import "./Sidebar.css";
import img from "./V&V logo black.png";

export default function Sidebar() {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ NEW state
  const [loginTime, setLoginTime] = useState(
    () => JSON.parse(localStorage.getItem("loginTime")) || null
  );
  const [elapsedTime, setElapsedTime] = useState("0h 0m");

  const disabledMenus = ["Members", "Income Report"];

  const toggleMenu = (index, title) => {
    if (disabledMenus.includes(title)) return;
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (!loginTime) {
      const now = new Date().getTime();
      localStorage.setItem("loginTime", JSON.stringify(now));
      setLoginTime(now);
    }
  }, [loginTime]);

  // ✅ हर 1 मिनट में logged-in time update करें
  useEffect(() => {
    if (!loginTime) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = now - loginTime;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setElapsedTime(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [loginTime]);

  return (
    <>
      {/* ✅ Toggle Button (for mobile) */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={img} alt="Logo" className="sidebar-logo" />
          <div className="logged-info">Logged in: {elapsedTime}</div>
        </div>

        <nav className="nav-section">
          {navConfig.map((section, sIdx) => (
            <div key={sIdx}>
              {section.items.map((item, i) =>
                item.children ? (
                  <div key={i} className="menu-group">
                    <button
                      onClick={() => toggleMenu(`${sIdx}-${i}`, item.title)}
                      className={`menu-item ${
                        disabledMenus.includes(item.title) ? "disabled" : ""
                      } ${
                        location.pathname.includes(item.path) ? "active" : ""
                      }`}
                      disabled={disabledMenus.includes(item.title)}
                    >
                      <span className="menu-title">
                        <span className="icon">{item.icon}</span> {item.title}
                      </span>
                      <span className="toggle-icon">
                        {openIndex === `${sIdx}-${i}` ? "−" : "+"}
                      </span>
                    </button>

                    {/* केवल allowed menus के लिए submenu दिखाना */}
                    {openIndex === `${sIdx}-${i}` &&
                      !disabledMenus.includes(item.title) && (
                        <div className="submenu">
                          {item.children.map((child, ci) => (
                            <Link
                              key={ci}
                              to={child.path}
                              className={`submenu-link ${
                                location.pathname === child.path ? "active" : ""
                              }`}
                              onClick={() => setSidebarOpen(false)} // ✅ Auto close on link click (mobile)
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ) : (
                  <Link
                    key={i}
                    to={item.path}
                    className={`menu-item ${
                      disabledMenus.includes(item.title) ? "disabled" : ""
                    } ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    onClick={(e) => {
                      if (disabledMenus.includes(item.title)) {
                        e.preventDefault();
                      } else {
                        setSidebarOpen(false); // ✅ Close sidebar after navigation (mobile)
                      }
                    }}
                  >
                    <span className="menu-title">
                      <span className="icon">{item.icon}</span> {item.title}
                    </span>
                  </Link>
                )
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
