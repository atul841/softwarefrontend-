import React, { useState } from "react";
import "./ReferralWalletTransfer.css";

const ReferralWalletTransfer = () => {
  const [walletBalance] = useState(0.0);
  const [amount, setAmount] = useState("");
  const [transactionPin, setTransactionPin] = useState("");

  const handleTransfer = (e) => {
    e.preventDefault();

    if (!amount || !transactionPin) {
      alert("Please fill all fields!");
      return;
    }

    if (amount < 10000) {
      alert("Minimum transfer amount is 10000 AP!");
      return;
    }

    console.log("Transfer Initiated:", { amount, transactionPin });
    // Example backend call:
    // fetch("/api/referral-transfer", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount, transactionPin }),
    // });
  };

  const handleCancel = () => {
    setAmount("");
    setTransactionPin("");
  };

  return (
    <div className="referral-transfer-container">
      <div className="transfer-card">
        <div className="card-header">
          <h3>Transfer Referral Wallet Balance</h3>
        </div>

        <div className="card-body">
          <p className="info-text">
            Get amount in your withdrawal wallet here. <br />
            <span className="note">
              Note: <span className="highlight">Minimum transfer amount is 10000 AP.</span>
            </span>
          </p>

          {/* Wallet Balance */}
          <div className="wallet-balance">
            <label>Wallet Balance</label>
            <div className="balance-box">
              <div className="currency-tag">AP</div>
              <input
                type="text"
                className="balance-input"
                value={walletBalance.toFixed(2)}
                disabled
              />
            </div>
          </div>

          {/* Amount Input */}
          <input
            type="number"
            className="input-field"
            placeholder="Please enter the amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Transaction Pin */}
          <input
            type="password"
            className="input-field"
            placeholder="Transaction Pin"
            value={transactionPin}
            onChange={(e) => setTransactionPin(e.target.value)}
          />

          {/* Buttons */}
          <div className="button-row">
            <button className="btn primary" onClick={handleTransfer}>
              Transfer
            </button>
            <button className="btn secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralWalletTransfer;
