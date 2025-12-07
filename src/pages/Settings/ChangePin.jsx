import React, { useState } from "react";
import "./ChangePin.css";

const ChangePin = () => {
  const [formData, setFormData] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  });

  const [showPin, setShowPin] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Only allow numbers (0–9)
    if (/^[0-9]*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleShow = (field) => {
    setShowPin({ ...showPin, [field]: !showPin[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.currentPin || !formData.newPin || !formData.confirmPin) {
      alert("Please fill all fields.");
      return;
    }
    if (formData.newPin !== formData.confirmPin) {
      alert("New PIN and Confirm PIN must match.");
      return;
    }
    console.log("PIN changed successfully:", formData);
    alert("Transaction PIN changed successfully!");
    setFormData({ currentPin: "", newPin: "", confirmPin: "" });
  };

  return (
    <div className="change-pin-container">
      <div className="change-pin-card">
        <div className="header">
          <h3>Change Transaction Pin</h3>
        </div>

        <form onSubmit={handleSubmit} className="pin-form">
          {/* ===== CURRENT PIN ===== */}
          <div className="form-group">
            <label>Current Transaction Pin</label>
            <div className="input-group">
              <input
                type={showPin.current ? "text" : "password"}
                name="currentPin"
                placeholder="Current Transaction Pin"
                value={formData.currentPin}
                onChange={handleChange}
                maxLength={6}
                inputMode="numeric"
              />
              <button
                type="button"
                onClick={() => toggleShow("current")}
                className="show-btn"
              >
                {showPin.current ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ===== NEW PIN ===== */}
          <div className="form-group">
            <label>New Transaction Pin</label>
            <div className="input-group">
              <input
                type={showPin.new ? "text" : "password"}
                name="newPin"
                placeholder="New Transaction Pin"
                value={formData.newPin}
                onChange={handleChange}
                maxLength={6}
                inputMode="numeric"
              />
              <button
                type="button"
                onClick={() => toggleShow("new")}
                className="show-btn"
              >
                {showPin.new ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ===== CONFIRM PIN ===== */}
          <div className="form-group">
            <label>Confirm Transaction Pin</label>
            <div className="input-group">
              <input
                type={showPin.confirm ? "text" : "password"}
                name="confirmPin"
                placeholder="Confirm Transaction Pin"
                value={formData.confirmPin}
                onChange={handleChange}
                maxLength={6}
                inputMode="numeric"
              />
              <button
                type="button"
                onClick={() => toggleShow("confirm")}
                className="show-btn"
              >
                {showPin.confirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="button-row">
            <button type="submit" className="btn-proceed">
              Proceed
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() =>
                setFormData({ currentPin: "", newPin: "", confirmPin: "" })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePin;
