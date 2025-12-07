import React from "react";
import "./SubscriptionPlans.css";

export default function SubscriptionPlans() {
  const plans = [
    {
      title: "ENTREPRENEUR LITE",
      price: "₹ 7000.00",
      desc: "Perfect for users who are just starting out.",
      tag: "BASIC",
      purchased: true,
    },
    {
      title: "ENTREPRENEUR PRO",
      price: "₹ 150000.00",
      desc: "Great for growing users who need more power.",
      tag: "PRO",
      purchased: false,
    },
    {
      title: "MEGA ENTREPRENEUR",
      price: "₹ 700000.00",
      desc: "Ultimate package for professionals & enterprises.",
      tag: "MEGA",
      purchased: false,
    },
  ];

 

  return (
    <div className="subscription-container">
      
      <div className="plans-section">
        <h2 className="section-title">UPGRADE AVAILABLE TO OTHER SUBSCRIPTIONS COURSES</h2>
        

        <div className="plans-grid">
          
          {plans.map((plan, index) => (
            <div className="plan-card" key={index}>
              <div className={`ribbon ${plan.tag.toLowerCase()}`}>
                {plan.tag}
              </div>
              <h3 className="plan-title" style={{ color: "#0a3069", fontSize: "1.9rem", fontWeight: "bold" }} >{plan.title}</h3>
              <h2 className="plan-price">{plan.price}</h2>
              <p className="plan-desc" style={{ color: "#0a3069", fontSize: "0.9rem", fontWeight: "bold" }}>{plan.desc}</p>

              <button
                className={`plan-btn ${plan.purchased ? "disabled" : "active"}`}
              >
                {plan.purchased ? "Purchased" : "Select"}
              </button>
            </div>
          ))}
        </div>
      </div>

     


    </div>
  );
}
