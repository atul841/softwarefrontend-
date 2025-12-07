import React, { useState } from "react";
import "./Support.css";

const Support = () => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    screenshot: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ existing tickets लाओ localStorage से
    const existingTickets = JSON.parse(localStorage.getItem("supportTickets")) || [];

    // ✅ नया ticket बनाओ
    const newTicket = {
      id: existingTickets.length + 1,
      ticketId: `TIC${Date.now()}`,
      subject: formData.subject,
      status: "Open",
      description: formData.description,
      img: formData.screenshot ? URL.createObjectURL(formData.screenshot) : "",
      date: new Date().toLocaleString(),
    };

    // ✅ localStorage में save करो
    const updatedTickets = [newTicket, ...existingTickets];
    localStorage.setItem("supportTickets", JSON.stringify(updatedTickets));

    alert("Ticket submitted successfully!");
    setFormData({
      subject: "",
      description: "",
      screenshot: null,
    });
  };

  const handleCancel = () => {
    setFormData({
      subject: "",
      description: "",
      screenshot: null,
    });
  };

  return (
    <div className="support-container">
      <h2 className="page-title">Generate Ticket</h2>
      <p className="page-subtitle">write your issue here...</p>

      <form className="support-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject<span className="required">*</span></label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select Issue Type</option>
            <option value="Wallet Transfer Failed">Wallet Transfer Failed</option>
            <option value="Login Issue">Agri Points Not Credited</option>
            <option value="Subscription Not Activated">Subscription Not Activated</option>
            <option value="Withdrawal Failed">Withdrawal Failed</option>
            <option value="Deposit Not Reflected">Deposit Not Reflected</option>
            <option value="Referral Bonus Not Credited">Referral Bonus Not Credited</option>
            <option value="Login OTP Not Received">Login OTP Not Received</option>
            <option value="Change Bank Account Details">Change Bank Account Details</option>
            <option value="Course Access Issue">Course Access Issue</option>

            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description<span className="required">*</span></label>
          <textarea
            name="description"
            placeholder="Please describe your issue clearly so our team can assist you faster. Include details like transaction ID, date, or error message if available.
You may also attach a screenshot to help us understand the problem better."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Screenshot</label>
          <input
            type="file"
            name="screenshot"
            accept="image/*"
            onChange={handleChange}
          />
           <small className="note-text">Note: Each image must be less than 100KB</small>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Submit
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Support;
