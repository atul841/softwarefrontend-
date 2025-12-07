// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Purchase.css";

// const Purchase = () => {
//   const plans = [
//     {
//       id: 1,
//       name: "ENTREPRENEUR LITE",
//       tag: "BASIC",
//       color: "#22c55e",
//       price: 7000,
//       desc: "Perfect for users who are just starting out.",
//     },
//     {
//       id: 2,
//       name: "ENTREPRENEUR PRO",
//       tag: "PRO",
//       color: "#0ea5e9",
//       price: 150000,
//       desc: "Ideal for growing businesses and professionals.",
//     },
//     {
//       id: 3,
//       name: "MEGA ENTREPRENEUR",
//       tag: "MEGA",
//       color: "#f59e0b",
//       price: 700000,
//       desc: "Best for enterprises needing full features.",
//     },
//   ];

//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [member, setMember] = useState({
//     id: "",
//     name: "",
//     referralCode: "",
//     referralName: "",
//   });
//   const [showPayment, setShowPayment] = useState(false);
//   const [transactionId, setTransactionId] = useState("");

//   // ✅ Check if already purchased
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       const username = storedUser.username;
//       const hasPurchased = localStorage.getItem(`hasPurchased_${username}`);

//       if (hasPurchased === "true") {
//         console.log("✅ Already purchased. Redirecting to dashboard...");
//         window.location.href = "/dashboard";
//         return;
//       }

//       setMember({
//         id: storedUser.username || "",
//         name: storedUser.name || storedUser.fullName || "",
//         referralCode: storedUser.referralCode || "",
//         referralName: storedUser.referralName || "",
//       });
//     }

//     // Load Cashfree SDK
//     const script = document.createElement("script");
//     script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.js";
//     script.async = true;
//     document.body.appendChild(script);

//     // ✅ Auto-mark success from return_url
//     const params = new URLSearchParams(window.location.search);
//     const successOrder = params.get("order_id");
//     if (successOrder && storedUser) {
//       const username = storedUser.username;

//       // 🔹 Call backend to mark purchase and add referral income
//       fetch(`https://api.vandv.ai/api/payment/mark-purchase/${username}`, {
//         method: "POST",
//       })
//         .then((res) => res.json())
//         .then(() => {
//           // 🔹 Save purchase flag locally
//           localStorage.setItem(`hasPurchased_${username}`, "true");

//           // 🔹 Also update user for ProtectedRoute
//           storedUser.hasPurchased = true;
//           localStorage.setItem("user", JSON.stringify(storedUser));

//           console.log(`🎉 Purchase confirmed for ${username}`);
//           // ✅ Redirect to PaymentSuccess page instead of dashboard
//           window.history.replaceState({}, document.title, "/payment-success");
//           window.location.href = "/payment-success";
//         })
//         .catch((err) => {
//           console.error("Error marking purchase:", err);
//         });
//     }
//   }, []);

//   const handleSelect = (plan) => setSelectedPlan(plan);

//   const gst = selectedPlan ? (selectedPlan.price * 0.18).toFixed(2) : 0;
//   const payable = selectedPlan
//     ? (selectedPlan.price + selectedPlan.price * 0.18).toFixed(2)
//     : 0;

//   const handleProceed = () => {
//     if (!selectedPlan) {
//       alert("Please select a plan first!");
//       return;
//     }

//     const tid = `ACT${new Date()
//       .toISOString()
//       .replace(/\D/g, "")
//       .slice(2, 14)}`;
//     setTransactionId(tid);
//     setShowPayment(true);
//   };

//   // ✅ Cashfree v2 SDK Flow + Referral logic
//   const handlePayNow = async () => {
//     try {
//       const payload = {
//         amount: payable,
//         orderId: transactionId,
//         customerName: member.name || "User",
//         customerPhone: "9999999999",
//         customerEmail: "test@example.com",
//         referralCode: member.referralCode || "",
//         referralName: member.referralName || "",
//         planName: selectedPlan.name,
//       };

//       const res = await axios.post(
//         "https://api.vandv.ai/api/payment/create-order",
//         payload
//       );

//       console.log("Payment Response:", res.data);

//       if (res.data?.paymentSessionId) {
//         if (!window.Cashfree) {
//           alert("Cashfree SDK not loaded. Please refresh and try again.");
//           return;
//         }

//         const cashfree = new window.Cashfree({ mode: "sandbox" });

//         await cashfree.checkout({
//           paymentSessionId: res.data.paymentSessionId,
//           redirectTarget: "_self",
//         });
//       } else {
//         alert("Payment session not received from server.");
//       }
//     } catch (err) {
//       console.error("Payment init error:", err);
//       alert("Failed to initialize payment. Please try again.");
//     }
//   };

//   if (showPayment && selectedPlan) {
//     return (
//       <div className="payment-bg">
//         <div className="payment-card">
//           <h2 className="payment-title">💳 Payment Details</h2>

//           <div className="payment-row">
//             <span>Member ID</span>
//             <span>{member.id}</span>
//           </div>
//           <div className="payment-row">
//             <span>Member Name</span>
//             <span>{member.name}</span>
//           </div>

//           {member.referralCode && (
//             <>
//               <div className="payment-row">
//                 <span>Referral Code</span>
//                 <span>{member.referralCode}</span>
//               </div>
//               <div className="payment-row">
//                 <span>Referral Name</span>
//                 <span>{member.referralName}</span>
//               </div>
//             </>
//           )}

//           <div className="payment-row">
//             <span>Plan</span>
//             <span>{selectedPlan.name}</span>
//           </div>
//           <div className="payment-row">
//             <span>Transaction ID</span>
//             <span>{transactionId}</span>
//           </div>
//           <div className="payment-row">
//             <span>Amount</span>
//             <span>₹ {selectedPlan.price}</span>
//           </div>
//           <div className="payment-row">
//             <span>GST (18%)</span>
//             <span>₹ {gst}</span>
//           </div>

//           <hr />
//           <h3 className="total">Total: ₹ {payable}</h3>

//           <button className="pay-btn" onClick={handlePayNow}>
//             🔒 Proceed to Pay ₹ {payable}
//           </button>

//           <p className="secure-note">🔒 100% Secure Payment via Cashfree</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="Purchase-container">
//       <h2 className="plans-heading">AVAILABLE SUBSCRIPTION PLANS</h2>
//       <div className="plans-wrapper">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className={`plan-card-modern ${
//               selectedPlan?.id === plan.id ? "active" : ""
//             }`}
//             onClick={() => handleSelect(plan)}
//           >
//             <div className="ribbon" style={{ backgroundColor: plan.color }}>
//               {plan.tag}
//             </div>
//             <h3 className="plan-title">{plan.name}</h3>
//             <h1 className="plan-price">₹ {plan.price.toFixed(2)}</h1>
//             <p className="plan-desc">{plan.desc}</p>
//             <button className="select-modern-btn">Select</button>
//           </div>
//         ))}
//       </div>

//       <div className="form-section">
//         <div className="form-card">
//           <h2>🔔 Subscription</h2>
//           <form>
//             <label>Member ID</label>
//             <input type="text" value={member.id} readOnly />
//             <label>Member Name</label>
//             <input type="text" value={member.name} readOnly />

//             {member.referralCode && (
//               <>
//                 <label>Referral Code</label>
//                 <input type="text" value={member.referralCode} readOnly />
//                 <label>Referral Name</label>
//                 <input type="text" value={member.referralName} readOnly />
//               </>
//             )}

//             <label>Amount</label>
//             <input
//               type="text"
//               value={selectedPlan ? selectedPlan.price : 0}
//               readOnly
//             />
//             <label>GST (18%)</label>
//             <input type="text" value={gst} readOnly />
//             <label>Payable Amount</label>
//             <input type="text" value={payable} readOnly />
//             <button
//               type="button"
//               className="proceed-btn"
//               onClick={handleProceed}
//             >
//               Proceed
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Purchase;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Purchase.css";

// const Purchase = () => {
//   const plans = [
//     {
//       id: 1,
//       name: "ENTREPRENEUR LITE",
//       tag: "BASIC",
//       color: "#22c55e",
//       price: 7000,
//       desc: "Perfect for users who are just starting out.",
//     },
//     {
//       id: 2,
//       name: "ENTREPRENEUR PRO",
//       tag: "PRO",
//       color: "#0ea5e9",
//       price: 150000,
//       desc: "Ideal for growing businesses and professionals.",
//     },
//     {
//       id: 3,
//       name: "MEGA ENTREPRENEUR",
//       tag: "MEGA",
//       color: "#f59e0b",
//       price: 700000,
//       desc: "Best for enterprises needing full features.",
//     },
//   ];

//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [member, setMember] = useState({
//     id: "",
//     name: "",
//     referralCode: "",
//     referralName: "",
//   });
//   const [showPayment, setShowPayment] = useState(false);
//   const [transactionId, setTransactionId] = useState("");

  
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       const username = storedUser.username;
//       const hasPurchased = localStorage.getItem(`hasPurchased_${username}`);

//       if (hasPurchased === "true") {
//         console.log("✅ Already purchased. Redirecting to dashboard...");
//         window.location.href = "/dashboard";
//         return;
//       }

//       setMember({
//         id: storedUser.username || "",
//         name: storedUser.name || storedUser.fullName || "",
//         referralCode: storedUser.referralCode || "",
//         referralName: storedUser.referralName || "",
//       });
//     }

    
//     const script = document.createElement("script");
//     script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.js";
//     script.async = true;
//     script.onload = () => console.log("✅ Cashfree SDK loaded");
//     document.body.appendChild(script);

    
//     const params = new URLSearchParams(window.location.search);
//     const successOrder = params.get("order_id");
//     if (successOrder && storedUser) {
//       const username = storedUser.username;

//       fetch(`https://api.vandv.ai/api/payment/mark-purchase/${username}`, {
//         method: "POST",
//       })
//         .then((res) => res.json())
//         .then(() => {
//           localStorage.setItem(`hasPurchased_${username}`, "true");
//           storedUser.hasPurchased = true;
//           localStorage.setItem("user", JSON.stringify(storedUser));
//           console.log(`🎉 Purchase confirmed for ${username}`);
//           window.history.replaceState({}, document.title, "/payment-success");
//           window.location.href = "/payment-success";
//         })
//         .catch((err) => {
//           console.error("Error marking purchase:", err);
//         });
//     }
//   }, []);

//   const handleSelect = (plan) => setSelectedPlan(plan);

//   const gst = selectedPlan ? (selectedPlan.price * 0.18).toFixed(2) : 0;
//   const payable = selectedPlan
//     ? (selectedPlan.price + selectedPlan.price * 0.18).toFixed(2)
//     : 0;

//   const handleProceed = () => {
//     if (!selectedPlan) {
//       alert("Please select a plan first!");
//       return;
//     }

//     const tid = `ACT${new Date()
//       .toISOString()
//       .replace(/\D/g, "")
//       .slice(2, 14)}`;
//     setTransactionId(tid);
//     setShowPayment(true);
//   };

//   // ✅ Correct Cashfree v2 Integration
//   const handlePayNow = async () => {
//     try {
//       const payload = {
//         amount: payable,
//         orderId: transactionId,
//         customerName: member.name || "User",
//         customerPhone: "9999999999",
//         customerEmail: "test@example.com",
//         referralCode: member.referralCode || "",
//         referralName: member.referralName || "",
//         planName: selectedPlan.name,
//       };

//       const res = await axios.post(
//         "https://api.vandv.ai/api/payment/create-order",
//         payload
//       );

//       console.log("Payment Response:", res.data);

//       // ✅ Use correct Cashfree key
//       const paymentSessionId = res.data?.payment_session_id;

//       if (!paymentSessionId) {
//         alert("Payment session not received from server.");
//         return;
//       }

//       if (!window.Cashfree) {
//         alert("Cashfree SDK not loaded. Please refresh and try again.");
//         return;
//       }

//       // ✅ Correct initialization (no await)
//       const cashfree = window.Cashfree({ mode: "live" });

//       await cashfree.checkout({
//         paymentSessionId,
//         redirectTarget: "_self",
//       });
//     } catch (err) {
//       console.error("Payment init error:", err);
//       alert("Failed to initialize payment. Please try again.");
//     }
//   };

//   if (showPayment && selectedPlan) {
//     return (
//       <div className="payment-bg">
//         <div className="payment-card">
//           <h2 className="payment-title">💳 Payment Details</h2>

//           <div className="payment-row">
//             <span>Member ID</span>
//             <span>{member.id}</span>
//           </div>
//           <div className="payment-row">
//             <span>Member Name</span>
//             <span>{member.name}</span>
//           </div>

//           {member.referralCode && (
//             <>
//               <div className="payment-row">
//                 <span>Referral Code</span>
//                 <span>{member.referralCode}</span>
//               </div>
//               <div className="payment-row">
//                 <span>Referral Name</span>
//                 <span>{member.referralName}</span>
//               </div>
//             </>
//           )}

//           <div className="payment-row">
//             <span>Plan</span>
//             <span>{selectedPlan.name}</span>
//           </div>
//           <div className="payment-row">
//             <span>Transaction ID</span>
//             <span>{transactionId}</span>
//           </div>
//           <div className="payment-row">
//             <span>Amount</span>
//             <span>₹ {selectedPlan.price}</span>
//           </div>
//           <div className="payment-row">
//             <span>GST (18%)</span>
//             <span>₹ {gst}</span>
//           </div>

//           <hr />
//           <h3 className="total">Total: ₹ {payable}</h3>

//           <button className="pay-btn" onClick={handlePayNow}>
//             🔒 Proceed to Pay ₹ {payable}
//           </button>

//           <p className="secure-note">🔒 100% Secure Payment via Cashfree</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="Purchase-container">
//       <h2 className="plans-heading">AVAILABLE SUBSCRIPTION PLANS</h2>
//       <div className="plans-wrapper">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className={`plan-card-modern ${
//               selectedPlan?.id === plan.id ? "active" : ""
//             }`}
//             onClick={() => handleSelect(plan)}
//           >
//             <div className="ribbon" style={{ backgroundColor: plan.color }}>
//               {plan.tag}
//             </div>
//             <h3 className="plan-title">{plan.name}</h3>
//             <h1 className="plan-price">₹ {plan.price.toFixed(2)}</h1>
//             <p className="plan-desc">{plan.desc}</p>
//             <button className="select-modern-btn">Select</button>
//           </div>
//         ))}
//       </div>

//       <div className="form-section">
//         <div className="form-card">
//           <h2>🔔 Subscription</h2>
//           <form>
//             <label>Member ID</label>
//             <input type="text" value={member.id} readOnly />
//             <label>Member Name</label>
//             <input type="text" value={member.name} readOnly />

//             {member.referralCode && (
//               <>
//                 <label>Referral Code</label>
//                 <input type="text" value={member.referralCode} readOnly />
//                 <label>Referral Name</label>
//                 <input type="text" value={member.referralName} readOnly />
//               </>
//             )}

//             <label>Amount</label>
//             <input
//               type="text"
//               value={selectedPlan ? selectedPlan.price : 0}
//               readOnly
//             />
//             <label>GST (18%)</label>
//             <input type="text" value={gst} readOnly />
//             <label>Payable Amount</label>
//             <input type="text" value={payable} readOnly />
//             <button
//               type="button"
//               className="proceed-btn"
//               onClick={handleProceed}
//             >
//               Proceed
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Purchase;








import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Purchase.css";

const Purchase = () => {
  const plans = [
    { id: 1, name: "ENTREPRENEUR LITE", tag: "BASIC", color: "#22c55e", price: 7000, desc: "Perfect for users who are just starting out." },
    { id: 2, name: "ENTREPRENEUR PRO", tag: "PRO", color: "#0ea5e9", price: 150000, desc: "Ideal for growing businesses and professionals." },
    { id: 3, name: "MEGA ENTREPRENEUR", tag: "MEGA", color: "#f59e0b", price: 700000, desc: "Best for enterprises needing full features." },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [member, setMember] = useState({ id: "", name: "", referralCode: "", referralName: "" });
  const [showPayment, setShowPayment] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [sdkReady, setSdkReady] = useState(false);

  // ==========================
  //  LOAD CASHFREE SDK
  // ==========================
  useEffect(() => {
    const loadSDK = () => {
      return new Promise((resolve, reject) => {
        if (window.Cashfree) return resolve();

        const script = document.createElement("script");
script.src = "/cashfree-sdk";
script.async = true;
script.onload = () => {
  console.log("Cashfree SDK Loaded ✓");
  resolve();
};
script.onerror = () => reject("Failed to load Cashfree SDK");
document.body.appendChild(script);

      });
    };

    loadSDK()
      .then(() => setSdkReady(true))
      .catch((err) => console.error(err));

    // Load user
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      setMember({
        id: stored.username || "",
        name: stored.name || stored.fullName || "",
        referralCode: stored.referralCode || "",
        referralName: stored.referralName || "",
      });
    }
  }, []);

  // ==========================
  //  PAYMENT PAGE SHOW
  // ==========================
  const handleProceed = () => {
    if (!selectedPlan) return alert("Select a plan first!");

    const tid = `ACT${new Date().toISOString().replace(/\D/g, "").slice(2, 14)}`;
    setTransactionId(tid);
    setShowPayment(true);
  };

  // ==========================
  //  PAY NOW FUNCTION
  // ==========================
  const handlePayNow = async () => {
    try {
      if (!sdkReady) return alert("Payment system loading...");

      const gst = selectedPlan.price * 0.18;
      const total = selectedPlan.price + gst;

      const payload = {
        amount: total.toFixed(2),
        orderId: transactionId,
        customerName: member.name,
        customerPhone: "9999999999",
        customerEmail: "test@example.com",
        planName: selectedPlan.name,
      };

      const res = await axios.post("https://api.vandv.ai/api/payment/create-order", payload);

      const sessionId = res.data.payment_session_id;
      if (!sessionId) return alert("Invalid payment session");

      const cashfree = new window.Cashfree({ mode: "production" });

      cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed.");
    }
  };

  const gst = selectedPlan ? (selectedPlan.price * 0.18).toFixed(2) : 0;
  const payable = selectedPlan ? (selectedPlan.price + selectedPlan.price * 0.18).toFixed(2) : 0;

  // ==========================
  //  PAYMENT PAGE UI
  // ==========================
  if (showPayment && selectedPlan) {
    return (
      <div className="payment-bg">
        <div className="payment-card">
          <h2>💳 Payment Details</h2>

          <div className="payment-row"><span>Member ID</span><span>{member.id}</span></div>
          <div className="payment-row"><span>Member Name</span><span>{member.name}</span></div>

          <div className="payment-row"><span>Plan</span><span>{selectedPlan.name}</span></div>
          <div className="payment-row"><span>Transaction ID</span><span>{transactionId}</span></div>
          <div className="payment-row"><span>Amount</span><span>₹ {selectedPlan.price}</span></div>
          <div className="payment-row"><span>GST</span><span>₹ {gst}</span></div>

          <h3 className="total">Total: ₹ {payable}</h3>

          <button className="pay-btn" onClick={handlePayNow}>
            🔒 Proceed to Pay ₹ {payable}
          </button>

          <p className="secure-note">🔒 Secure Payment via Cashfree</p>
        </div>
      </div>
    );
  }

  // ==========================
  //  PLAN SELECTION UI
  // ==========================
  return (
    <div className="Purchase-container">
      <h2 className="plans-heading">AVAILABLE SUBSCRIPTION PLANS</h2>

      <div className="plans-wrapper">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`plan-card-modern ${selectedPlan?.id === p.id ? "active" : ""}`}
            onClick={() => setSelectedPlan(p)}
          >
            <div className="ribbon" style={{ backgroundColor: p.color }}>{p.tag}</div>
            <h3 className="plan-title">{p.name}</h3>
            <h1 className="plan-price">₹ {p.price.toFixed(2)}</h1>
            <p className="plan-desc">{p.desc}</p>
            <button className="select-modern-btn">Select</button>
          </div>
        ))}
      </div>

      <div className="form-section">
        <div className="form-card">
          <h2>🔔 Subscription</h2>
          <form>
            <label>Member ID</label>
            <input type="text" value={member.id} readOnly />

            <label>Member Name</label>
            <input type="text" value={member.name} readOnly />

            <label>Amount</label>
            <input type="text" value={selectedPlan ? selectedPlan.price : 0} readOnly />

            <label>GST (18%)</label>
            <input type="text" value={gst} readOnly />

            <label>Total</label>
            <input type="text" value={payable} readOnly />

            <button type="button" className="proceed-btn" onClick={handleProceed}>
              Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Purchase;









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Purchase.css";

// const Purchase = () => {
//   const plans = [
//     {
//       id: 1,
//       name: "ENTREPRENEUR LITE",
//       tag: "BASIC",
//       color: "#22c55e",
//       price: 7000,
//       desc: "Perfect for users who are just starting out.",
//     },
//     {
//       id: 2,
//       name: "ENTREPRENEUR PRO",
//       tag: "PRO",
//       color: "#0ea5e9",
//       price: 150000,
//       desc: "Ideal for growing businesses and professionals.",
//     },
//     {
//       id: 3,
//       name: "MEGA ENTREPRENEUR",
//       tag: "MEGA",
//       color: "#f59e0b",
//       price: 700000,
//       desc: "Best for enterprises needing full features.",
//     },
//   ];

//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [member, setMember] = useState({
//     id: "",
//     name: "",
//     referralCode: "",
//     referralName: "",
//   });
//   const [showPayment, setShowPayment] = useState(false);
//   const [transactionId, setTransactionId] = useState("");
//   const [isCashfreeReady, setCashfreeReady] = useState(false); // ✅ Added

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       const username = storedUser.username;
//       const hasPurchased = localStorage.getItem(`hasPurchased_${username}`);

//       if (hasPurchased === "true") {
//         console.log("✅ Already purchased. Redirecting to dashboard...");
//         window.location.href = "/dashboard";
//         return;
//       }

//       setMember({
//         id: storedUser.username || "",
//         name: storedUser.name || storedUser.fullName || "",
//         referralCode: storedUser.referralCode || "",
//         referralName: storedUser.referralName || "",
//       });
//     }

//     // ✅ Load Cashfree SDK only once, wait until ready
//     // ✅ Improved Cashfree SDK loader   
// const loadCashfreeSDK = async () => {
//   try {
//     // If already loaded, just mark ready
//     if (window.Cashfree) {
//       console.log("✅ Cashfree SDK already available");
//       setCashfreeReady(true);
//       return;
//     }

//     // Try loading from both possible CDNs
//     const script = document.createElement("script");
//     script.src = "https://sdk.cashfree.com/js/ui/2.0.0/cashfree.js";
//     script.async = true;

//     script.onload = () => {
//       if (window.Cashfree) {
//         console.log("✅ Cashfree SDK loaded successfully");
//         setCashfreeReady(true);
//       } else {
//         console.warn("⚠️ Cashfree global object not found even after load");
//       }
//     };

//     script.onerror = () => {
//       console.error("❌ Failed to load Cashfree SDK from primary URL, retrying...");
//       const fallback = document.createElement("script");
//       fallback.src = "https://sdk.cashfree.com/js/ui/1.0.26/cashfree.js";
//       fallback.onload = () => {
//         if (window.Cashfree) {
//           console.log("✅ Fallback SDK loaded successfully");
//           setCashfreeReady(true);
//         } else {
//           console.error("❌ Cashfree SDK fallback also failed");
//         }
//       };
//       document.body.appendChild(fallback);
//     };

//     document.body.appendChild(script);
//   } catch (err) {
//     console.error("Unexpected SDK load error:", err);
//   }
// };


//     loadCashfreeSDK()
//       .then(() => console.log("Cashfree SDK ready"))
//       .catch((err) => console.error(err));

//     // ✅ Handle payment success redirect
//     const params = new URLSearchParams(window.location.search);
//     const successOrder = params.get("order_id");
//     if (successOrder && storedUser) {
//       const username = storedUser.username;
//       fetch(`https://api.vandv.ai/api/payment/mark-purchase/${username}`, {
//         method: "POST",
//       })
//         .then((res) => res.json())
//         .then(() => {
//           localStorage.setItem(`hasPurchased_${username}`, "true");
//           storedUser.hasPurchased = true;
//           localStorage.setItem("user", JSON.stringify(storedUser));
//           console.log(`🎉 Purchase confirmed for ${username}`);
//           window.history.replaceState({}, document.title, "/payment-success");
//           window.location.href = "/payment-success";
//         })
//         .catch((err) => {
//           console.error("Error marking purchase:", err);
//         });
//     }
//   }, []);

//   const handleSelect = (plan) => setSelectedPlan(plan);

//   const gst = selectedPlan ? (selectedPlan.price * 0.18).toFixed(2) : 0;
//   const payable = selectedPlan
//     ? (selectedPlan.price + selectedPlan.price * 0.18).toFixed(2)
//     : 0;

//   const handleProceed = () => {
//     if (!selectedPlan) {
//       alert("Please select a plan first!");
//       return;
//     }

//     const tid = `ACT${new Date()
//       .toISOString()
//       .replace(/\D/g, "")
//       .slice(2, 14)}`;
//     setTransactionId(tid);
//     setShowPayment(true);
//   };

//   // ✅ Correct Cashfree v2 Integration (fixed)
//   const handlePayNow = async () => {
//     try {
//       if (!isCashfreeReady) { // ✅ Fix: Wait until SDK is ready
//         alert("Please wait, payment system is still loading...");
//         return;
//       }

//       const payload = {
//         amount: payable,
//         orderId: transactionId,
//         customerName: member.name || "User",
//         customerPhone: "9999999999",
//         customerEmail: "test@example.com",
//         referralCode: member.referralCode || "",
//         referralName: member.referralName || "",
//         planName: selectedPlan.name,
//       };

//       const res = await axios.post(
//         "https://api.vandv.ai/api/payment/create-order",
//         payload
//       );

//       console.log("Payment Response:", res.data);

//       // ✅ Cashfree session ID fix
//       const paymentSessionId =
//         res.data?.payment_session_id || res.data?.paymentSessionId;

//       if (!paymentSessionId) {
//         alert("Payment session not received from server.");
//         return;
//       }

//       if (!window.Cashfree) {
//         alert("Cashfree SDK not loaded. Please refresh and try again.");
//         return;
//       }

//       // ✅ Corrected initialization
//       const cashfree = new window.Cashfree({ mode: "live" });

//       cashfree.checkout({
//         paymentSessionId,
//         redirectTarget: "_self",
//       });
//     } catch (err) {
//       console.error("Payment init error:", err);
//       alert("Failed to initialize payment. Please try again.");
//     }
//   };

//   if (showPayment && selectedPlan) {
//     return (
//       <div className="payment-bg">
//         <div className="payment-card">
//           <h2 className="payment-title">💳 Payment Details</h2>

//           <div className="payment-row">
//             <span>Member ID</span>
//             <span>{member.id}</span>
//           </div>
//           <div className="payment-row">
//             <span>Member Name</span>
//             <span>{member.name}</span>
//           </div>

//           {member.referralCode && (
//             <>
//               <div className="payment-row">
//                 <span>Referral Code</span>
//                 <span>{member.referralCode}</span>
//               </div>
//               <div className="payment-row">
//                 <span>Referral Name</span>
//                 <span>{member.referralName}</span>
//               </div>
//             </>
//           )}

//           <div className="payment-row">
//             <span>Plan</span>
//             <span>{selectedPlan.name}</span>
//           </div>
//           <div className="payment-row">
//             <span>Transaction ID</span>
//             <span>{transactionId}</span>
//           </div>
//           <div className="payment-row">
//             <span>Amount</span>
//             <span>₹ {selectedPlan.price}</span>
//           </div>
//           <div className="payment-row">
//             <span>GST (18%)</span>
//             <span>₹ {gst}</span>
//           </div>

//           <hr />
//           <h3 className="total">Total: ₹ {payable}</h3>

//           <button
//             className="pay-btn"
//             onClick={handlePayNow}
//             disabled={!isCashfreeReady} // ✅ Prevent early click
//           >
//             {isCashfreeReady
//               ? `🔒 Proceed to Pay ₹ ${payable}`
//               : "Loading Payment System..."}
//           </button>

//           <p className="secure-note">🔒 100% Secure Payment via Cashfree</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="Purchase-container">
//       <h2 className="plans-heading">AVAILABLE SUBSCRIPTION PLANS</h2>
//       <div className="plans-wrapper">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className={`plan-card-modern ${
//               selectedPlan?.id === plan.id ? "active" : ""
//             }`}
//             onClick={() => handleSelect(plan)}
//           >
//             <div className="ribbon" style={{ backgroundColor: plan.color }}>
//               {plan.tag}
//             </div>
//             <h3 className="plan-title">{plan.name}</h3>
//             <h1 className="plan-price">₹ {plan.price.toFixed(2)}</h1>
//             <p className="plan-desc">{plan.desc}</p>
//             <button className="select-modern-btn">Select</button>
//           </div>
//         ))}
//       </div>

//       <div className="form-section">
//         <div className="form-card">
//           <h2>🔔 Subscription</h2>
//           <form>
//             <label>Member ID</label>
//             <input type="text" value={member.id} readOnly />
//             <label>Member Name</label>
//             <input type="text" value={member.name} readOnly />

//             {member.referralCode && (
//               <>
//                 <label>Referral Code</label>
//                 <input type="text" value={member.referralCode} readOnly />
//                 <label>Referral Name</label>
//                 <input type="text" value={member.referralName} readOnly />
//               </>
//             )}

//             <label>Amount</label>
//             <input
//               type="text"
//               value={selectedPlan ? selectedPlan.price : 0}
//               readOnly
//             />
//             <label>GST (18%)</label>
//             <input type="text" value={gst} readOnly />
//             <label>Payable Amount</label>
//             <input type="text" value={payable} readOnly />
//             <button
//               type="button"
//               className="proceed-btn"
//               onClick={handleProceed}
//             >
//               Proceed
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Purchase;


