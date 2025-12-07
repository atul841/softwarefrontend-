import React, { useState } from "react";
import "./LearnEarn.css";

const LearnEarn = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
  });

  const data = [
    {
      srNo: 1,
      business: "7000.00",
      income: "1000.00",
      incomeDate: "25-Sep-2025",
      months: "1 Month",
    },
  ];

  const totalBusiness = data.reduce((sum, item) => sum + parseFloat(item.business), 0);
  const totalIncome = data.reduce((sum, item) => sum + parseFloat(item.income), 0);

  const handleSearch = () => {
    console.log("Search clicked", filters);
  };

  const handleCancel = () => {
    setFilters({ fromDate: "", toDate: "" });
  };

  return (
    <div className="learnEarn-container">
      {/* ===== Search Section ===== */}
      <div className="search-section">
        <h3 className="section-title">Search By</h3>
        <div className="search-row">
          <div className="form-group">
            <label>From Date*</label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>To Date*</label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
            />
          </div>
        </div>
        <div className="btn-group">
          <button className="btn search-btn" onClick={handleSearch}>
            Search
          </button>
          <button className="btn cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>

      {/* ===== Data Table ===== */}
      <div className="table-section">
        <h3 className="section-title">Learn & Earn Income</h3>
        <table>
          <thead>
            <tr>
              <th>SrNo</th>
              <th>Business</th>
              <th>Income</th>
              <th>Income Date</th>
              <th>Income Months</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.srNo}</td>
                <td>{item.business}</td>
                <td>{item.income}</td>
                <td>{item.incomeDate}</td>
                <td>{item.months}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="1" className="total-label">Total:</td>
              <td>{totalBusiness.toFixed(2)}</td>
              <td>{totalIncome.toFixed(2)}</td>
              <td colSpan="2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LearnEarn;
