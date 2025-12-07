import React, { useState } from "react";
import "./LearnEarnWalletTransfer.css";

const LearnEarnWalletTransfer = () => {
  const [walletBalance, setWalletBalance] = useState(1000.0); // Example balance
  const [formData, setFormData] = useState({
    amount: "",
    pin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTransfer = (e) => {
    e.preventDefault();

    if (formData.amount < 10000) {
      alert("Minimum transfer amount is 10000 AP.");
      return;
    }

    // Example POST request
    // fetch("/api/learn-wallet-transfer", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));

    alert("Transfer request submitted successfully!");
  };

  const handleCancel = () => {
    setFormData({ amount: "", pin: "" });
  };

  return (
    <div className="learnwallet-container">
      <div className="learnwallet-card">
        <div className="card-header">
          <h3>Transfer Learn & Earn Wallet Balance</h3>
        </div>

        <p className="wallet-note">
          Get amount in your withdrawal wallet here. <br />
          <span className="note">
            <b>Note:</b> Minimum transfer amount is{" "}
            <span className="highlight">10000 AP.</span>
          </span>
        </p>

        <form onSubmit={handleTransfer}>
          <label className="wallet-label">Wallet Balance</label>
          <div className="wallet-balance">
            <div className="wallet-unit">AP</div>
            <input
              type="text"
              value={walletBalance.toFixed(2)}
              readOnly
              className="wallet-input"
            />
          </div>

          <input
            type="number"
            name="amount"
            placeholder="Please enter the amount"
            value={formData.amount}
            onChange={handleChange}
            className="input-field"
            required
          />

          <input
            type="password"
            name="pin"
            placeholder="Transaction Pin"
            value={formData.pin}
            onChange={handleChange}
            className="input-field"
            required
          />

          <div className="button-row">
            <button type="submit" className="btn primary">
              Transfer
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearnEarnWalletTransfer;
