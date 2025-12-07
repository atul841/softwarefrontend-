// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Registration.css";
// import { Link, useNavigate } from "react-router-dom";
// import img from "./logo.png";

// const Login = ({ registeredUser }) => {
//   const [form, setForm] = useState({
//     username: "",
//     password: "",
//   });
//   const [showResetPopup, setShowResetPopup] = useState(false);
//   const [resetData, setResetData] = useState({
//     email: "",
//   });

//   const navigate = useNavigate();

//   // ✅ STEP 1: Capture and store referral code from URL
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const sponsorId = urlParams.get("sponsorId");
//     if (sponsorId) {
//       localStorage.setItem("referralCodeUsed", sponsorId);
//       console.log("Referral Sponsor ID Saved:", sponsorId);
//     }
//   }, []);

//   useEffect(() => {
//     if (registeredUser) {
//       setForm({
//         username: registeredUser.username || "",
//         password: registeredUser.password || "",
//       });
//     }
//   }, [registeredUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

//   // ✅ MAIN LOGIN LOGIC
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("https://api.vandv.ai/api/auth/login", form);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       const username = form.username.trim();
//       const progressKey = `videoProgress_${username}`;
//       const pointsKey = `learnEarnPoints_${username}`;
//       const incomeKey = `totalIncome_${username}`;
//       const estimatedKey = `totalEstimatedIncome_${username}`;
//       const purchaseKey = `hasPurchased_${username}`;

//       if (!localStorage.getItem(progressKey)) {
//         localStorage.setItem(pointsKey, JSON.stringify(0));
//         localStorage.setItem(incomeKey, JSON.stringify(0));
//         localStorage.setItem(estimatedKey, JSON.stringify(0));
//         localStorage.setItem(progressKey, JSON.stringify([]));
//       }

//       localStorage.setItem("activeUser", username);
//       localStorage.setItem("progressKey", progressKey);
//       localStorage.setItem("pointsKey", pointsKey);
//       localStorage.setItem("incomeKey", incomeKey);
//       localStorage.setItem("estimatedKey", estimatedKey);

//       alert(res.data.message);

//       let hasPurchased = localStorage.getItem(purchaseKey) === "true";

//       try {
//         const purchaseRes = await axios.get(
//           `https://api.vandv.ai/api/check-purchase/${username}`
//         );
//         if (purchaseRes.data?.hasPurchased) {
//           hasPurchased = true;
//           localStorage.setItem(purchaseKey, "true");
//         }
//       } catch {
//         console.log("Purchase check skipped (server not implemented).");
//       }

//       if (hasPurchased) {
//         navigate("/dashboard");
//       } else {
//         navigate("/Purchase");
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Login failed!");
//     }
//   };

//   // ✅ Handle email input for password reset
//   const handleResetChange = (e) => {
//     const { name, value } = e.target;
//     setResetData({
//       ...resetData,
//       [name]: value,
//     });
//   };

//   // ✅ Submit email to backend to send reset link
//   const handleResetSubmit = async (e) => {
//     e.preventDefault();

//     if (!resetData.email) {
//       return alert("Please enter your registered email!");
//     }

//     try {
//       const res = await axios.post("https://api.vandv.ai/api/auth/request-password-reset", {
//         email: resetData.email,
//       });

//       alert(res.data.message || "Password reset link sent to your email!");
//       setShowResetPopup(false);
//       setResetData({ email: "" });
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to send reset link!");
//     }
//   };

//   return (
//     <div className="register-bg">
//       <div className="register-overlay">
//         <form className="register-box" onSubmit={handleSubmit}>
//           <img src={img} alt="Logo" className="sidebar-logo" />

//           <p className="login-note">
//             Don’t have an account? <Link to="/">Signup</Link>
//           </p>

//           <hr />
//           <p className="signup-note">SIGN IN WITH YOUR CREDENTIALS </p>

//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter username"
//             value={form.username}
//             onChange={handleChange}
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />

//           <div className="checkbox-row">
//             <input type="checkbox" id="remember" />
//             <span>Remember me</span>
//             <a
//               href="#"
//               style={{ marginLeft: "auto" }}
//               onClick={() => setShowResetPopup(true)}
//             >
//               Forgot password?
//             </a>
//           </div>

//           <button type="submit" className="proceed-btn">
//             LOGIN
//           </button>
//         </form>

//         {/* 🔹 Reset Password Popup (email-based) */}
//         {showResetPopup && (
//           <div className="popup-overlay">
//             <div className="popup-box">
//               <h2>Forgot Password?</h2>
//               <p style={{ fontSize: "14px", marginBottom: "10px" }}>
//                 Enter your registered email, and we’ll send you a password reset link.
//               </p>
//               <form onSubmit={handleResetSubmit}>
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter your registered email"
//                   value={resetData.email}
//                   onChange={handleResetChange}
//                   required
//                 />

//                 <div className="popup-actions">
//                   <button type="submit" className="proceed-btn">
//                     Send Reset Link
//                   </button>
//                   <button
//                     type="button"
//                     className="cancel-btn"
//                     onClick={() => setShowResetPopup(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import img from "./logo.png";

const Login = ({ registeredUser }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [resetData, setResetData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  // ✅ STEP 1:   Capture and store referral code from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sponsorId = urlParams.get("sponsorId");
    if (sponsorId) {
      localStorage.setItem("referralCodeUsed",  sponsorId);
      console.log("Referral Sponsor ID Saved:", sponsorId);
    }
  }, []);

  useEffect(() => {
    if (registeredUser) {
      setForm({
        username: registeredUser.username || "",
        password: registeredUser.password || "",
      });
    }
  }, [registeredUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //  Add your special credentials here (change only for dev/testing) 
  const SPECIAL_USERNAME = "V&V25213482";
  const SPECIAL_PASSWORD = "Indra@123";
  // ------------------------------------------------------------------------

  // ✅ MAIN LOGIN LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const progressKey = `videoProgress_${username}`;
    const pointsKey = `learnEarnPoints_${username}`;
    const incomeKey = `totalIncome_${username}`;
    const estimatedKey = `totalEstimatedIncome_${username}`;
    const purchaseKey = `hasPurchased_${username}`;

    // Helper to initialize localStorage keys for a user
    const initLocalStorageForUser = (uname) => {
      if (!localStorage.getItem(`videoProgress_${uname}`)) {
        localStorage.setItem(`learnEarnPoints_${uname}`, JSON.stringify(0));
        localStorage.setItem(`totalIncome_${uname}`, JSON.stringify(0));
        localStorage.setItem(`totalEstimatedIncome_${uname}`, JSON.stringify(0));
        localStorage.setItem(`videoProgress_${uname}`, JSON.stringify([]));
      }

      localStorage.setItem("activeUser", uname);
      localStorage.setItem("progressKey", `videoProgress_${uname}`);
      localStorage.setItem("pointsKey", `learnEarnPoints_${uname}`);
      localStorage.setItem("incomeKey", `totalIncome_${uname}`);
      localStorage.setItem("estimatedKey", `totalEstimatedIncome_${uname}`);    
    };

    // If user entered the special credentials, we'll bypass purchase-check later.
    const isSpecial = username === SPECIAL_USERNAME && form.password === SPECIAL_PASSWORD;

    try {
      const res = await axios.post("https://api.vandv.ai/api/auth/login", form);

      // store token and user from server
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      initLocalStorageForUser(username);

      alert(res.data.message);

      // By default read purchase flag from localStorage or from server check.
      let hasPurchased = localStorage.getItem(purchaseKey) === "true";

      try {
        const purchaseRes = await axios.get(
          `https://api.vandv.ai/api/payment/check-purchase/${username}`
        );
        if (purchaseRes.data?.hasPurchased) {
          hasPurchased = true;
          localStorage.setItem(purchaseKey, "true");              
        }
      } catch {
        console.log("Purchase check skipped (server not implemented).");
      }

      // ---- IMPORTANT: FREEUSER FLAG CHECK (OPTION 2) ----
      if (res.data.user?.freeUser === true) {
        hasPurchased = true;
        localStorage.setItem(purchaseKey, "true");
        console.log("freeUser flag detected — purchase bypassed.");
      }
      // ---------------------------------------------------

      // ---- IMPORTANT: If this is the special account, bypass purchase requirement ----
      if (isSpecial) {
        hasPurchased = true;
        localStorage.setItem(purchaseKey, "true");
        console.log("Special credentials detected — bypassing purchase check.");
      }
      // ------------------------------------------------------------------------------

      // ---- UPDATED REDIRECT LOGIC (OPTION 2) ----
      if (hasPurchased || res.data.user?.freeUser === true) {
        navigate("/dashboard");
      } else {
        navigate("/Purchase");
      }
      // -------------------------------------------

    } catch (error) {
      console.log("Login error:", error?.response?.data || error.message);

      if (isSpecial) {
        console.log("Server login failed, but special credentials provided. Creating local test session.");

        const fakeToken = "local-fake-token-for-special-user";
        const fakeUser = { username: SPECIAL_USERNAME, name: "Special User (local)" };

        localStorage.setItem("token", fakeToken);
        localStorage.setItem("user", JSON.stringify(fakeUser));

        initLocalStorageForUser(SPECIAL_USERNAME);
        localStorage.setItem(`hasPurchased_${SPECIAL_USERNAME}`, "true");

        alert("Logged in (local fallback) - special account granted dashboard access.");
        navigate("/dashboard");
        return;
      }

      alert(error.response?.data?.message || "Login failed!");
    }
  };

  // Reset password
  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData({
      ...resetData,
      [name]: value,
    });
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (!resetData.email) {
      return alert("Please enter your registered email!");
    }

    try {
      const res = await axios.post("https://api.vandv.ai/api/auth/request-password-reset", {
        email: resetData.email,
      });

      alert(res.data.message || "Password reset link sent to your email!");
      setShowResetPopup(false);
      setResetData({ email: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send reset link!");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-overlay">
        <form className="register-box" onSubmit={handleSubmit}>
          <img src={img} alt="Logo" className="sidebar-logo" />

          <p className="login-note">
            Don’t have an account? <Link to="/">Signup</Link>
          </p>

          <hr />
          <p className="signup-note">SIGN IN WITH YOUR CREDENTIALS </p>

          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="checkbox-row">
            <input type="checkbox" id="remember" />
            <span>Remember me</span>
            <a
              href="#"
              style={{ marginLeft: "auto" }}
              onClick={() => setShowResetPopup(true)}
            >
              Forgot password?
            </a>
          </div>

          <button type="submit" className="proceed-btn">
            LOGIN
          </button>
        </form>

        {showResetPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>Forgot Password?</h2>
              <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                Enter your registered email, and we’ll send you a password reset link.
              </p>
              <form onSubmit={handleResetSubmit}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  value={resetData.email}
                  onChange={handleResetChange}
                  required
                />

                <div className="popup-actions">
                  <button type="submit" className="proceed-btn">
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowResetPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

