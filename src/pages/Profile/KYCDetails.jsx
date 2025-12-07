import React, { useState, useEffect } from "react";
import "./KycDetails.css";
import paniamge from "./1.png";
import adharfront from "./2.png";
import adharback from "./3.png";
import axios from "axios";

export default function KycDetails() {
  const [formData, setFormData] = useState({
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    branchName: "",
    panNo: "",
    aadhaarNo: "",
    transactionPin: "",
  });

  const [files, setFiles] = useState({
    panImage: null,
    aadhaarFront: null,
    aadhaarBack: null,
  });

  const [preview, setPreview] = useState({
    panImage: paniamge,
    aadhaarFront: adharfront,
    aadhaarBack: adharback,
  });

  const [loadingBank, setLoadingBank] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [kycStatus, setKycStatus] = useState("");

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload + preview + 100KB limit
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      const file = selectedFiles[0];

      // ✅ Check file size (100KB = 102400 bytes)
      if (file.size > 102400) {
        alert("❌ File size must be less than 100KB!");
        e.target.value = ""; // reset input
        return;
      }

      setFiles((prev) => ({ ...prev, [name]: file }));
      const previewUrl = URL.createObjectURL(file);
      setPreview((prev) => ({ ...prev, [name]: previewUrl }));
    }
  };

  // ✅ Auto-fetch bank details from IFSC
  const fetchBankDetails = async () => {
    const ifsc = formData.ifsc.trim().toUpperCase();
    if (!ifsc || ifsc.length < 4) return;

    setLoadingBank(true);
    try {
      const res = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
      if (!res.ok) throw new Error("Invalid IFSC Code");
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        bankName: data.BANK || "",
        branchName: data.BRANCH || "",
      }));
    } catch (err) {
      alert("❌ Invalid IFSC code or not found");
      setFormData((prev) => ({ ...prev, bankName: "", branchName: "" }));
    } finally {
      setLoadingBank(false);
    }
  };

  // ✅ On mount: check and fetch existing KYC for active user
  useEffect(() => {
    const fetchKycDetails = async () => {
      const activeUser = localStorage.getItem("activeUser");
      if (!activeUser) return;

      try {
        const checkRes = await axios.get(
          `https://api.vandv.ai/api/kyc/check/${activeUser}`
        );

        if (checkRes.data.exists) {
          setAlreadySubmitted(true);
          setKycStatus("pending");

          const kycRes = await axios.get(
            `https://api.vandv.ai/api/kyc/get/${activeUser}`
          );
          const data = kycRes.data;

          setFormData({
            accountHolder: data.accountHolder || "",
            accountNumber: data.accountNumber || "",
            ifsc: data.ifsc || "",
            bankName: data.bankName || "",
            branchName: data.branchName || "",
            panNo: data.panNo || "",
            aadhaarNo: data.aadharNo || "",
            transactionPin: data.transactionPin || "",
          });

          setPreview({
            panImage: data.panImage || paniamge,
            aadhaarFront: data.aadhaarFront || adharfront,
            aadhaarBack: data.aadhaarBack || adharback,
          });
        }
      } catch (err) {
        console.error("Error fetching KYC details:", err);
      }
    };

    fetchKycDetails();
  }, []);

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const activeUser = localStorage.getItem("activeUser");
    if (!activeUser) {
      alert("⚠️ Please login first!");
      return;
    }

    if (alreadySubmitted) {
      alert("⚠️ You have already submitted your KYC details.");
      return;
    }

    const formToSend = new FormData();
    formToSend.append("memberId", activeUser);
    formToSend.append("accountHolder", formData.accountHolder);
    formToSend.append("accountNumber", formData.accountNumber);
    formToSend.append("ifsc", formData.ifsc);
    formToSend.append("bankName", formData.bankName);
    formToSend.append("branchName", formData.branchName);
    formToSend.append("panNo", formData.panNo);
    formToSend.append("aadhaarNo", formData.aadhaarNo);
    formToSend.append("transactionPin", formData.transactionPin);

    if (files.panImage) formToSend.append("panImage", files.panImage);
    if (files.aadhaarFront) formToSend.append("aadhaarFront", files.aadhaarFront);
    if (files.aadhaarBack) formToSend.append("aadhaarBack", files.aadhaarBack);

    try {
      await axios.post("https://api.vandv.ai/api/kyc", formToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ KYC details submitted successfully!");
      setAlreadySubmitted(true);
      setKycStatus("pending");
    } catch (error) {
      console.error("KYC Submit Error:", error);
      alert("❌ Failed to submit KYC details");
    }
  };

  return (
    <div className="kyc-container">
      <h2 className="kyc-title">KYC Details</h2>
      <p className="kyc-subtitle">
        Update your bank and identity details here...
      </p>

      <form className="kyc-form" onSubmit={handleSubmit}>
        {/* Left column */}
        <div className="kyc-column">
          <label>
            Account Holder Name *
            <input
              type="text"
              name="accountHolder"
              value={formData.accountHolder}
              onChange={handleChange}
              required
              disabled={alreadySubmitted}
            />
          </label>

          <label>
            Account Number *
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              disabled={alreadySubmitted}
            />
          </label>

          <label>
            IFSC Code *
            <input
              type="text"
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              onBlur={fetchBankDetails}
              placeholder="Enter IFSC (e.g. SBIN0001234)"
              required
              disabled={alreadySubmitted}
            />
            {loadingBank && (
              <span className="loading-text">Fetching bank details...</span>
            )}
          </label>

          <label>
            Bank Name *
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              disabled
              required
            />
          </label>

          <label>
            Branch Name *
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              disabled
              required
            />
          </label>

          <label>
            Transaction Pin *
            <input
              type="password"
              name="transactionPin"
              value={formData.transactionPin}
              onChange={handleChange}
              required
              disabled={alreadySubmitted}
            />
          </label>
        </div>

        {/* Right column */}
        <div className="kyc-column">
          <label>
            PanCard No *
            <input
              type="text"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              required
              disabled={alreadySubmitted}
            />
          </label>

          <label>
            PanCard Image *
            <input
              type="file"
              name="panImage"
              accept="image/*"
              onChange={handleFileChange}
              disabled={alreadySubmitted}
            />
            <small className="note-text">Note: Each image must be less than 100KB</small>
            <img src={preview.panImage} alt="PAN Preview" className="kyc-preview" />
          </label>

          <label>
            Aadhar No *
            <input
              type="text"
              name="aadhaarNo"
              value={formData.aadhaarNo}
              onChange={handleChange}
              required
              disabled={alreadySubmitted}
            />
          </label>

          <label>
            Aadhar Front Image *
            <input
              type="file"
              name="aadhaarFront"
              accept="image/*"
              onChange={handleFileChange}
              disabled={alreadySubmitted}
            />
            <small className="note-text">Note: Each image must be less than 100KB</small>
            <img
              src={preview.aadhaarFront}
              alt="Aadhar Front Preview"
              className="kyc-preview"
            />
          </label>

          <label>
            Aadhar Back Image *
            <input
              type="file"
              name="aadhaarBack"
              accept="image/*"
              onChange={handleFileChange}
              disabled={alreadySubmitted}
            />
            <small className="note-text">Note: Each image must be less than 100KB</small>
            <img
              src={preview.aadhaarBack}
              alt="Aadhar Back Preview"
              className="kyc-preview"
            />
          </label>
        </div>

        <div className="kyc-btn-wrap">
          <button type="submit" className="kyc-btn" disabled={alreadySubmitted}>
            {alreadySubmitted
              ? kycStatus === "pending"
                ? "KYC Pending"
                : "Already Submitted"
              : "Save Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
