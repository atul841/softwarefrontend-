import React, { useState } from "react";
import "./DepositHistory.css";

const DepositHistory = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Summary data
  const summary = {
    totalDeposits: records.length,
    successAmount: 0,
    pendingAmount: 0,
    failedAmount: 0,
  };

  // Pagination logic
  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const filteredData = records.filter(
    (item) =>
      item.transactionNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orderNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentRecords = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
    if (direction === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
  };

  return (
    <div className="deposit-history-container">
      <h2 className="deposit-title">My Deposit History</h2>

      {/* Summary Card */}
      <div className="summary-card">
        <div className="summary-item yellow">
          <strong>No Of Deposit:</strong>
          <span>{summary.totalDeposits}</span>
        </div>
        <div className="summary-item green">
          <strong>Total Success</strong>
          <span>Deposit: ₹{summary.successAmount.toFixed(2)}</span>
        </div>
        <div className="summary-item cyan">
          <strong>Total Pending</strong>
          <span>Deposit: ₹{summary.pendingAmount.toFixed(2)}</span>
        </div>
        <div className="summary-item red">
          <strong>Total Failed</strong>
          <span>Deposit: ₹{summary.failedAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-controls">
        <div className="entries-select">
          Show{" "}
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>{" "}
          entries
        </div>
        <div className="search-box">
          <label>Search:</label>
          <input
            type="text"
            placeholder=""
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="deposit-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Order Number</th>
              <th>Amount</th>
              <th>Transaction No.</th>
              <th>Approved Date</th>
              <th>Approved By</th>
              <th>Deposit Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No data available in table
                </td>
              </tr>
            ) : (
              currentRecords.map((item, index) => (
                <tr key={index}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{item.orderNo}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.transactionNo}</td>
                  <td>{item.approvedDate || "-"}</td>
                  <td>{item.approvedBy || "-"}</td>
                  <td>{item.depositDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>
          Showing {filteredData.length === 0 ? 0 : indexOfFirst + 1} to{" "}
          {Math.min(indexOfLast, filteredData.length)} of {filteredData.length}{" "}
          entries
        </span>
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositHistory;
