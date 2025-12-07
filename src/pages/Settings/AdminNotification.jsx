import React, { useState, useEffect } from "react";
import "./Notification.css";

const AdminNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Example data (replace with API call)
    setNotifications([
      // { id: 1, title: "Money Problem", message: "kya kar rahe ho sir", date: "29-Sep-2025 06:01 PM" },
      // { id: 2, title: "it", message: "efe", date: "21-Sep-2025 02:38 PM" },
    ]);
  }, []);

  return (
    <div className="notification-container">
      <h2 className="page-title">Notification</h2>

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

      <table className="styled-table">
        <thead>
          <tr>
            <th>SrNo</th>
            <th>Title</th>
            <th>Notification</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.message}</td>
              <td></td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <span>Showing 1 to {notifications.length} of {notifications.length} entries</span>
        <div>
          <button>Previous</button>
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
