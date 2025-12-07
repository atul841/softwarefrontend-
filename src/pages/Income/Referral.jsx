import React, { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "./Referral.css";

const Referral = () => {
  const [filters, setFilters] = useState({
    memberId: "",
    fromDate: "",
    toDate: "",
  });
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const totalPages = Math.ceil(filtered.length / perPage);

  // ====== Handle Input ======
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // ====== Search API ======
  const handleSearch = async () => {
    if (!filters.memberId || !filters.fromDate || !filters.toDate) {
      alert("Please fill Member ID, From Date, and To Date");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.vandv.ai/api/referral?memberId=${filters.memberId}&from=${filters.fromDate}&to=${filters.toDate}`
      );
      setData(res.data);
      setFiltered(res.data);
      setPage(1);
    } catch (err) {
      console.error(err);
      alert("Error fetching referral data");
    } finally {
      setLoading(false);
    }
  };

  // ====== Export to Excel ======
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ReferralIncome");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, "ReferralIncome.xlsx");
  };

  // ====== Pagination Logic ======
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="referral-container">
      <h2>Referral Income Report</h2>

      {/* ===== Filters ===== */}
      <div className="filter-box">
        <div className="filter-row">
          <label>Member ID*</label>
          <input
            type="text"
            name="memberId"
            value={filters.memberId}
            onChange={handleChange}
            placeholder="Enter Member ID"
          />

          <label>From Date*</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleChange}
          />

          <label>To Date*</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleChange}
          />

          <button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            onClick={() => {
              setFilters({ memberId: "", fromDate: "", toDate: "" });
              setData([]);
              setFiltered([]);
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* ===== Table Section ===== */}
      <div className="table-section">
        <div className="table-header">
          <h3>Referral Income</h3>
          <div>
            <button onClick={exportToExcel}>Export Excel</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>SrNo</th>
              <th>MemberId</th>
              <th>Levels</th>
              <th>Business</th>
              <th>Income</th>
              <th>Income Date</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((item, index) => (
                <tr key={index}>
                  <td>{(page - 1) * perPage + index + 1}</td>
                  <td>{item.memberId}</td>
                  <td>{item.level}</td>
                  <td>{item.business}</td>
                  <td>{item.income}</td>
                  <td>{item.incomeDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ===== Pagination Controls ===== */}
        {filtered.length > 0 && (
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Referral;
