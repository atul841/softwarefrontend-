import React, { useState } from "react";
import "./DepositWalletHistory.css";

const DepositWalletHistory = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered data
  const filteredData = records.filter((item) => {
    const matchesSearch =
      item.referenceNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentRecords = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const handlePageChange = (dir) => {
    if (dir === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
    if (dir === "prev" && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = () => {
    console.log("Search clicked:", fromDate, toDate);
    // Example: fetch(`/api/wallet-history?from=${fromDate}&to=${toDate}`)
  };

  const handleCancel = () => {
    setFromDate("");
    setToDate("");
    setSearchTerm("");
    setRecords([]);
  };

  return (
    <div className="wallet-history-container">
      {/* ===== Search By Section ===== */}
      <div className="search-card">
        <h3 className="section-title">Search By</h3>
        <div className="search-row">
          <div className="form-group">
            <label>From Date*</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>To Date*</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        <div className="button-row">
          <button className="btn primary" onClick={handleSearch}>
            Search
          </button>
          <button className="btn secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>

      {/* ===== Table Section ===== */}
      <div className="table-card">
        <h3 className="section-title">Deposit Wallet History</h3>

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="table-container">
          <table className="wallet-table">
            <thead>
              <tr>
                <th>SrNo</th>
                <th>Type</th>
                <th>Amount</th>
                <th>ReferenceNo</th>
                <th>Income Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    No data available in table
                  </td>
                </tr>
              ) : (
                currentRecords.map((item, i) => (
                  <tr key={i}>
                    <td>{indexOfFirst + i + 1}</td>
                    <td>{item.type}</td>
                    <td>₹{item.amount}</td>
                    <td>{item.referenceNo}</td>
                    <td>{item.incomeType}</td>
                    <td>{item.date}</td>
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
            {Math.min(indexOfLast, filteredData.length)} of{" "}
            {filteredData.length} entries
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
    </div>
  );
};

export default DepositWalletHistory;
