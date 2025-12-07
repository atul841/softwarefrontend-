import React, { useState } from "react";
import "./ReferralWalletHistory.css";

const ReferralWalletHistory = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
  });

  const [walletHistory, setWalletHistory] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    // Example fetch
    // fetch(`/api/referral-wallet?from=${filters.fromDate}&to=${filters.toDate}`)
    //   .then((res) => res.json())
    //   .then((data) => setWalletHistory(data));

    console.log("Searching with filters:", filters);
  };

  const handleCancel = () => {
    setFilters({ fromDate: "", toDate: "" });
    setWalletHistory([]);
  };

  return (
    <div className="referral-history-container">
      {/* ===== Search Section ===== */}
      <div className="search-card">
        <h3>Search By</h3>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="date-row">
            <div className="form-group">
              <label>From Date*</label>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(e) =>
                  setFilters({ ...filters, fromDate: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>To Date*</label>
              <input
                type="date"
                value={filters.toDate}
                onChange={(e) =>
                  setFilters({ ...filters, toDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="btn-row">
            <button type="submit" className="btn primary">
              Search
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

      {/* ===== Wallet History Table ===== */}
      <div className="table-card">
        <h3>Referral Wallet History</h3>

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

          <input type="text" placeholder="Search..." />
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
            {walletHistory.length > 0 ? (
              walletHistory.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.type}</td>
                  <td>{item.amount}</td>
                  <td>{item.referenceNo}</td>
                  <td>{item.incomeType}</td>
                  <td>{item.remark}</td>
                  <td>{item.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="table-footer">
          <p>Showing 0 to 0 of 0 entries</p>
          <div className="pagination">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralWalletHistory;
