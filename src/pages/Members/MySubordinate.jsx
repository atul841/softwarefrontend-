import React, { useState } from "react";
import "./MySubordinate.css";

export default function MySubordinate() {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching data from ${filters.fromDate} to ${filters.toDate}`);
  };

  return (
    <div className="subordinate-container">
      <h2 className="subordinate-title">My Subordinate Data</h2>

      {/* ===== SEARCH FILTER ===== */}
      <div className="search-card">
        <h3>Search By</h3>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>From Date*</label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>To Date*</label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-primary">
              Search
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setFilters({ fromDate: "", toDate: "" })}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* ===== SUMMARY BOX ===== */}
      <div className="summary-box">
        <p className="text-yellow">
          <strong>Total Direct:</strong> 0
        </p>
        <p className="text-green">
          <strong>Total Active:</strong> 0
        </p>
        <p className="text-red">
          <strong>Total Inactive:</strong> 0
        </p>
        <p className="text-cyan">
          <strong>Total Package:</strong> AP 0.00
        </p>
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-container">
        <div className="table-header">
          <label>
            Show
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </label>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>MemberId</th>
              <th>MobileNo</th>
              <th>RegDate</th>
              <th>ActivationDate</th>
              <th>Status</th>
              <th>TotalPackage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="7" className="no-data">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
