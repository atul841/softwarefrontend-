import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./Withdrawal.css";



const socket = io("http://localhost:4000"); // Adjust if backend is hosted elsewhere

const Withdrawal = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [tds, setTds] = useState("");
  const [payableAmount, setPayableAmount] = useState(""); 
  const [withdrawals, setWithdrawals] = useState([]);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // ✅ toggle for admin mode

  // 🔹 Initial setup & socket listeners
  useEffect(() => {
    fetchBalance();
    fetchWithdrawals();

    // Live balance updates
    socket.on("balanceUpdate", (data) => {
      setWalletBalance(data.balance);
    });

    // New withdrawal requested
    socket.on("withdrawalUpdate", (newW) => {
      setWithdrawals((prev) => [newW, ...prev]);
    });

    // Withdrawal marked paid
    socket.on("withdrawalPaid", (paidW) => {
      setWithdrawals((prev) =>
        prev.map((w) => (w._id === paidW._id ? paidW : w))
      );
    });      

    return () => socket.disconnect();
  }, []);

  // 🔹 Fetch wallet balance
  const fetchBalance = async () => {
    try {
      const res = await axios.get("http://localhost:4000/balance");
      setWalletBalance(res.data.balance);
    } catch (err) {
      console.error("Balance fetch error:", err);
    }
  };

  // 🔹 Fetch all withdrawals
  const fetchWithdrawals = async () => {
    try {
      const res = await axios.get("http://localhost:4000/withdrawals");
      setWithdrawals(res.data.withdrawals || []);
    } catch (err) {
      console.error("Withdrawal fetch error:", err);
    }
  };



  // 🔹 TDS & Payable calculation
  const handleAmountChange = (value) => {
    setWithdrawAmount(value);
    if (value > 0) {
      const tdsValue = (value * 5) / 100;
      setTds(tdsValue.toFixed(2));
      setPayableAmount((value - tdsValue).toFixed(2));
    } else {
      setTds("");
      setPayableAmount("");
    }
  };

  // 🔹 Handle withdrawal request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (withdrawAmount < 10000) {
      setError("Minimum withdrawal amount is ₹10,000");
      return;
    }

    try {
      await axios.post("http://localhost:4000/withdraw", {
        amount: Number(withdrawAmount),
      });

      alert("✅ Withdrawal request submitted successfully!");
      setWithdrawAmount("");
      setTds("");
      setPayableAmount("");
      fetchWithdrawals();
      fetchBalance();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // 🔹 Approve and send payment (Admin only)
  const approveWithdrawal = async (id) => {
    if (!window.confirm("Are you sure you want to send this amount?")) return;

    try {
      const res = await axios.put(
        `http://localhost:4000/withdraw/approve/${id}`
      );

      alert("✅ Withdrawal approved & payment sent successfully!");
      fetchWithdrawals();
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to approve payment");
    }
  };

  return (
    <div className="withdrawal-container">
      <div className="withdrawal-card">
        <div className="withdrawal-header">
          <h3>Withdrawal Portal</h3>
        </div>

        <p className="withdrawal-note">
          Withdrawal सिर्फ बैंकिंग दिनों (सोमवार से शुक्रवार, सार्वजनिक छुट्टियों को
          छोड़कर) में ही प्रोसेस किए जाएंगे। वीकेंड या छुट्टी वाले दिन किए गए
          withdrawal, अगले कार्य दिवस में प्रोसेस होंगे। आपके सहयोग के लिए धन्यवाद।
        </p>

        {/* ✅ Admin Mode Toggle */}
        {/* <div style={{ marginBottom: "10px", textAlign: "right" }}>
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />{" "}
            Admin Mode
          </label>
        </div> */}

        {/* ✅ User Withdrawal Form */}
        {!isAdmin && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Wallet Balance</label>
              <div className="wallet-box">
                <span className="wallet-label">₹</span>
                <input type="text" value={walletBalance.toFixed(2)} readOnly />
              </div>
            </div>

            <div className="form-group">
              <label>Withdrawal Amount*</label>
              <input
                type="number"
                value={withdrawAmount}
                placeholder="Enter amount"
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                required
              />
              {error && <p className="error-text">{error}</p>}
            </div>

            <div className="form-group">
              <label>TDS (5%)</label>
              <input type="text" value={tds} readOnly />
            </div>

            <div className="form-group">
              <label>Payable Amount</label>
              <input type="text" value={payableAmount} readOnly />
            </div>

            <div className="button-group">
              <button
                type="submit"
                className="btn-proceed"
                disabled={withdrawAmount < 10000}
              >
                Proceed
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setWithdrawAmount("");
                  setTds("");
                  setPayableAmount("");
                  setError("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* ✅ Withdrawal History / Admin Table */}
        <div className="history-section">
          <h4>
            {isAdmin ? "All User Withdrawal Requests" : "Your Withdrawal History"}
          </h4>
          {withdrawals.length === 0 ? (
            <p>No withdrawals yet.</p>
          ) : (
            <table className="withdrawal-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>TDS</th>
                  <th>Payable</th>
                  <th>Status</th>
                  <th>Date</th>
                  {isAdmin && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w, index) => (
                  <tr key={index}>
                    <td>₹{w.amount}</td>
                    <td>₹{w.tds}</td>
                    <td>₹{w.payable}</td>
                    <td
                      style={{
                        color:
                          w.status === "requested"
                            ? "orange"
                            : w.status === "paid"
                            ? "green"
                            : "red",
                      }}
                    >
                      {w.status.toUpperCase()}
                    </td>
                    <td>{new Date(w.createdAt).toLocaleString()}</td>
                    {isAdmin && (
                      <td>
                        {w.status === "requested" ? (
                          <button
                            className="btn-proceed"
                            onClick={() => approveWithdrawal(w._id)}
                          >
                            Approve & Send
                          </button>
                        ) : (
                          <span>✅ Sent</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
