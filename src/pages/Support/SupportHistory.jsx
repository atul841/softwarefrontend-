import React, { useEffect, useState } from "react";
import "./SupportHistory.css";

const SupportHistory = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // ✅ localStorage से tickets लाओ
    const storedTickets = JSON.parse(localStorage.getItem("supportTickets")) || [];
    setTickets(storedTickets);
  }, []);

  // ✅ search filter (Ticket ID या Subject)
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="support-history-container">
      <h2 className="page-title">TICKET HISTORY</h2>

      <div className="table-controls">
        <div className="entries">
          <label>
            Show
            <select>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </label>
        </div>

        {/* ✅ Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by Ticket ID "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="styled-table">
          <thead>
            <tr>
              <th>SrNo</th>
              <th>TicketId</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Description</th>
              <th>Img</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No matching tickets found
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket, index) => (
                <tr key={ticket.id}>
                  <td>{index + 1}</td>
                  <td>{ticket.ticketId}</td>
                  <td>{ticket.subject}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        ticket.status.toLowerCase() === "closed" ? "closed" : "open"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td>{ticket.description}</td>
                  <td>
                    {ticket.img ? (
                      <img src={ticket.img} alt="ticket" className="ticket-img" />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{ticket.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Showing {filteredTickets.length > 0 ? 1 : 0} to {filteredTickets.length} of{" "}
          {tickets.length} entries
        </span>
        <div className="pagination">
          <button className="active">1</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SupportHistory;
