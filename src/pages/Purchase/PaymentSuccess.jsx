import React, { useEffect } from "react";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {
  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "/dashboard";
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <p>You will be redirected to your dashboard shortly...</p>
      </div>
    </div>
  );
}
