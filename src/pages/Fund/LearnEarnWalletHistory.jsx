import React, { useState } from "react";
import "./LearnEarnWalletHistory.css";

const LearnEarnWalletHistory = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Demo Data — replace this with API response
  const transactions = [
    {
      id: 1,
      type: "Credit",
      amount: 1000.0,
      referenceNo: "ACT250925115970345",
      incomeType: "Learn & Earn Income",
      remark: "Learn & Earn Income",
      date: "25-Sep-2025 12:05 PM",
    },
  ];

  const totalCredit = transactions
    .filter((t) => t.type === "Credit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = transactions
    .filter((t) => t.type === "Debit")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalCredit - totalDebit;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Filter between:", fromDate, "and", toDate);
  };

  return (
    <div className="wallet-history-container">
      {/* ===== SEARCH FILTER ===== */}
      <div className="search-section">
        <h3>Search By</h3>
        <form onSubmit={handleSearch} className="search-form">
          <div className="date-inputs">
            <div className="date-field">
              <label>From Date*</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="date-field">
              <label>To Date*</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          <div className="button-row">
            <button type="submit" className="btn-search">
              Search
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                setFromDate("");
                setToDate("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* ===== TABLE SECTION ===== */}
      <div className="table-section">
        <h3>Learn & Earn Wallet History</h3>

        <div className="table-controls">
          <div>
            Show{" "}
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>{" "}
            entries
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>

        <table className="wallet-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Type</th>
              <th>Amount</th>
              <th>ReferenceNo</th>
              <th>Income Type</th>
              <th>Remark</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <span
                    className={
                      item.type === "Credit"
                        ? "badge badge-credit"
                        : "badge badge-debit"
                    }
                  >
                    {item.type}
                  </span>
                </td>
                <td>{item.amount.toFixed(2)}</td>
                <td>{item.referenceNo}</td>
                <td>{item.incomeType}</td>
                <td>{item.remark}</td>
                <td>{item.date}</td>
              </tr>
            ))}
            <tr className="totals-row">
              <td colSpan="2" style={{ fontWeight: "600" }}>
                Total:
              </td>
              <td colSpan="2">
                <strong>Cr:- {totalCredit.toFixed(2)}</strong>
              </td>
              <td colSpan="2">
                <strong>Dr:- {totalDebit.toFixed(2)}</strong>
              </td>
              <td>
                <strong>Balance:- {balance.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="pagination">
          <span>Showing 1 to 1 of 1 entries</span>
          <div>
            <button className="page-btn disabled">Previous</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnEarnWalletHistory;
