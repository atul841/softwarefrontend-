import React, { useEffect, useState } from "react";
import "./Report.css";

const Report = () => {
  const [withdrawData, setWithdrawData] = useState([]);
  const [summary, setSummary] = useState({
    totalWithdraw: 0,
    totalPending: 0,
    totalSuccess: 0,
    totalFailed: 0,
    noOfWithdraw: 0,
  });

  useEffect(() => {
    // Example: API call simulation
    const fetchData = async () => {
      // const res = await fetch("/api/withdrawals");
      // const data = await res.json();

      const data = []; // Sample empty data
      setWithdrawData(data);
      setSummary({
        totalWithdraw: 0,
        totalPending: 0,
        totalSuccess: 0,
        totalFailed: 0,
        noOfWithdraw: data.length,
      });
    };

    fetchData();
  }, []);

  return (
    <div className="report-container">
      <h2 className="report-title">My Deposit History</h2>

      <div className="summary-card">
        <div className="summary-item">
          <h4 className="yellow">No Of Withdraw:</h4>
          <p>{summary.noOfWithdraw}</p>
        </div>

        <div className="summary-item green">
          <h4>Total Success</h4>
          <p>Withdraw: ₹ {summary.totalSuccess.toFixed(2)}</p>
        </div>

        <div className="summary-item cyan">
          <h4>Total Pending</h4>
          <p>Withdraw: ₹ {summary.totalPending.toFixed(2)}</p>
        </div>

        <div className="summary-item red">
          <h4>Total Failed</h4>
          <p>Withdraw: ₹ {summary.totalFailed.toFixed(2)}</p>
        </div>
      </div>

      <div className="table-section">
        <div className="table-controls">
          <label>
            Show{" "}
            <select>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>{" "}
            entries
          </label>
          <input type="text" placeholder="Search..." className="search-box" />
        </div>

        <table className="report-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Order Number</th>
              <th>Amount</th>
              <th>Admin Charge</th>
              <th>TDS</th>
              <th>AccountHolderName</th>
              <th>AccountNo</th>
              <th>IFSCCode</th>
              <th>BankName</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {withdrawData.length === 0 ? (
              <tr>
                <td colSpan="11" className="no-data">
                  No data available in table
                </td>
              </tr>
            ) : (
              withdrawData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.orderNumber}</td>
                  <td>{item.amount}</td>
                  <td>{item.adminCharge}</td>
                  <td>{item.tds}</td>
                  <td>{item.accountHolderName}</td>
                  <td>{item.accountNo}</td>
                  <td>{item.ifscCode}</td>
                  <td>{item.bankName}</td>
                  <td>{item.status}</td>
                  <td>{item.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="table-footer">
          <p>
            Showing 0 to {withdrawData.length} of {withdrawData.length} entries
          </p>
          <div className="pagination">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
