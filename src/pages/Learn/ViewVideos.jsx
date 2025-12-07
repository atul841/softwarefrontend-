import React from "react";
import "./ViewVideos.css";
import { Link } from "react-router-dom";

const ViewVideos = () => {
  const plans = [
    {
      id: 1,
      name: "AGRIPRENEUR LITE",
      tag: "BASIC",
      amount: 7000.0,
      status: "open",
      gradient: "linear-gradient(135deg, #d49c9c, #c8a6a6, #e6d1b2)",
    },
    {
      id: 2,
      name: "AGRIPRENEUR PRO",
      tag: "PRO",
      amount: 150000.0,
      status: "locked",
      gradient: "linear-gradient(135deg, #b3b3b3, #c0c0c0, #d6d6d6)",
    },
    {
      id: 3,
      name: "MEGA AGRIPRENEUR",
      tag: "MEGA",
      amount: 700000.0,
      status: "locked",
      gradient: "linear-gradient(135deg, #b3b3b3, #c0c0c0, #d6d6d6)",
    },
  ];

  return (
    <div className="view-videos-container">
      <h2 className="page-title">AVAILABLE SUBSCRIPTION PLANS</h2>

      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${plan.status}`}
            style={{ background: plan.gradient }}
          >
            <div className="ribbon">{plan.tag}</div>
            <h3>{plan.name}</h3>
            <p>
              Amount <span>₹ {plan.amount.toLocaleString()}</span>
            </p>
            
            <div className="card-footer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4762/4762318.png"
                alt="astronaut"
                className="astronaut"
              />
         
              {plan.status === "open" ? (
                <button className="open-btn">
                  <Link
                    to="/viewvideo"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Open
                  </Link>
                </button>
              ) : (
                <div className="locked-box">
                  <i className="fa fa-lock lock-icon"></i>
                  <button className="locked-btn">Locked</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewVideos;
