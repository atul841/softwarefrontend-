import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SubscriptionReport.css";

const SubscriptionReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // ✅ Fetch purchased subscriptions from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://api.vandv.ai/api/subscriptions"); 
        setData(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Search filter
  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.memberId?.includes(searchTerm) ||
        item.memberName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.totalPackage?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // ✅ Summary calculations
  const totalCount = data.length;
  const totalPackageValue = data.reduce((acc, item) => {
    const match = item.totalPackage?.match(/\((?:AP\s)?([\d.]+)\)/);
    const value = match ? parseFloat(match[1]) : 0;
    return acc + value;
  }, 0);

  return (
    <div className="subscription-report">
      <h2 className="page-title">My Subordinate Data</h2>

      {/* ===== Summary Box ===== */}
      <div className="summary-box">
        <div>
          <strong>Total Purchase Count:</strong> {totalCount}
        </div>
        <div>
          <strong>Total Package:</strong> AP {totalPackageValue.toLocaleString()}
        </div>
      </div>

      {/* ===== Table Section ===== */}
      <div className="table-container">
        <div className="table-header">
          <label>Show</label>
          <select>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries</span>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="report-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>#</th>
              <th>MemberId</th>
              <th>TotalPackage</th>
              <th>EntryBy</th>
              <th>ActivationDate</th>
              <th>Status</th>
              <th>EntryDate</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="icon-box">
                      <i className="fa fa-print"></i>
                    </div>
                  </td>
                  <td>
                    <div className="member-info">
                      <div>{item.memberId}</div>
                      <small>{item.memberName}</small>
                    </div>
                  </td>
                  <td>{item.totalPackage}</td>
                  <td>{item.entryBy}</td>
                  <td>{item.activationDate}</td>
                  <td>
                    <span className={`status ${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.entryDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <span>
            Showing 1 to {filteredData.length} of {data.length} entries
          </span>
          <div className="page-controls">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionReport;
