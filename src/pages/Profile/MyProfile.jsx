import React, { useState, useEffect } from "react";
import "./MyProfile.css";

export default function MyProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    memberName: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    city: "",
    state: "",
    country: "",
    transactionPin: "",
  });

  // ✅ Registration से user data लाओ (localStorage से)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (storedUser) {
      setFormData((prev) => ({
        ...prev,
        memberName: storedUser.name || "",
        email: storedUser.email || "",
        mobile: storedUser.mobile || "",
      }));
    }
  }, []);

  // ✅ Handle image change + size limit (100KB)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 102400) {
        alert("❌ Image size must be less than 100KB!");
        e.target.value = "";
        return;
      }

      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
      setFormData({ ...formData, profileImage: file });
    }
  };

  // ✅ Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit profile to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = new FormData();
    Object.keys(formData).forEach((key) => {
      body.append(key, formData[key]);
    });

    try {
      const res = await fetch("https://api.vandv.ai/api/profile", {
        method: "POST",
        body,
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Profile update failed!");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h3 className="profile-title">Profile Detail</h3>
        <p className="profile-subtitle">Update your profile details here...</p>

        <form
          className="profile-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* 🟩 Row 1 - Member Name & DOB */}
          <div className="form-row">
            <div className="form-group">
              <label>Member Name *</label>
              <input
                type="text"
                name="memberName"
                value={formData.memberName}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 🟩 Row 2 - Gender & Email */}
          <div className="form-row">
            <div className="form-group">
              <label>Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input type="email" value={formData.email} disabled />
            </div>
          </div>

          {/* 🟩 Row 3 - Mobile Number & City */}
          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number *</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                disabled
              />
            </div>

            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 🟩 Row 4 - State & Country */}
          <div className="form-row">
            <div className="form-group">
              <label>State *</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option>Select State</option>
                <option>Andhra Pradesh</option>
                <option>Arunachal Pradesh</option>
                <option>Assam</option>
                <option>Bihar</option>
                <option>Chhattisgarh</option>
                <option>Goa</option>
                <option>Gujarat</option>
                <option>Haryana</option>
                <option>Himachal Pradesh</option>
                <option>Jharkhand</option>
                <option>Karnataka</option>
                <option>Kerala</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Manipur</option>
                <option>Meghalaya</option>
                <option>Mizoram</option>
                <option>Nagaland</option>
                <option>Odisha</option>
                <option>Punjab</option>
                <option>Rajasthan</option>
                <option>Sikkim</option>
                <option>Tamil Nadu</option>
                <option>Telangana</option>
                <option>Tripura</option>
                <option>Uttar Pradesh</option>
                <option>Uttarakhand</option>
                <option>West Bengal</option>
              </select>
            </div>

            <div className="form-group">
              <label>Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option>Select Country</option>
                <option>India</option>
              </select>
            </div>
          </div>

          {/* 🟩 Row 5 - Profile Image & Transaction Pin */}
          <div className="form-row">
            <div className="form-group image-upload">
              <label>Profile Picture *</label>
              <div className="image-upload-box">
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <small className="note-text">Note: Image must be less than 100KB</small>
                <div className="preview">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" />
                  ) : (
                    <div className="no-image">No Image Available</div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Transaction Pin *</label>
              <input
                type="password"
                name="transactionPin"
                value={formData.transactionPin}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 🟩 Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Update Profile
            </button>
            <button type="reset" className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
