import React, { useState } from "react";
import "./MySubordinateLevel.css";

export default function MySubordinateLevel() {
  const [filters, setFilters] = useState({
    memberId: "",
    level: "",
    fromDate: "",
    toDate: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for ${filters.memberId || "All Members"}`);
  };

  return (
    <div className="subordinate-page">
      {/* ===== FILTER FORM ===== */}
      <div className="filter-card">
        <h3>Search By</h3>
        <form className="filter-form" onSubmit={handleSearch}>
          <div className="form-group">
            <label>Member Id*</label>
            <input
              type="text"
              name="memberId"
              placeholder="Member Id"
              value={filters.memberId}
              onChange={handleChange}
            />
          </div>
         <br />
          <div className="form-group">
            <label>Level*</label>
            <select name="level" value={filters.level} onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
          </div>

          <div className="form-group">
            <label>From Date*</label>
            <input
              type="date"
              name="fromDate"
              value={filters.fromDate}
              onChange={handleChange}
            />
          </div>
            <br />
          <div className="form-group">
            <label>To Date*</label>
            <input
              type="date"
              name="toDate"
              value={filters.toDate}
              onChange={handleChange}
            />
          </div>
  <br />
          <div className="button-group">
            <button type="submit" className="btn-search">
              Search
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() =>
                setFilters({ memberId: "", level: "", fromDate: "", toDate: "" })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* ===== SUMMARY BOX ===== */}
      <div className="summary-container">
        <h3>My Subordinate Level</h3>
        <div className="summary-card">
          <div className="summary-item text-yellow">Total Team: 0</div>
          <div className="summary-item text-green">Total Active: 0</div>
          <div className="summary-item text-red">Total Inactive: 0</div>
          <div className="summary-item text-cyan">Total Package: ₹ 0.00</div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="table-card">
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
          <input type="text" placeholder="Search..." />
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>MemberId</th>
              <th>RegDate</th>
              <th>ActivationDate</th>
              <th>Levels</th>
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
