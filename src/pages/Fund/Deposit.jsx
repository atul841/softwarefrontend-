// import React, { useState } from "react";
// import "./Deposit.css";

// const Deposit = () => {
//   const [walletBalance, setWalletBalance] = useState(0.0);
//   const [amount, setAmount] = useState("");

//   const handleProceed = (e) => {
//     e.preventDefault();
//     if (amount < 1000) {
//       alert("Minimum deposit amount is ₹1000.");
//       return;
//     }    

    
   



//     alert(`Deposit of ₹${amount} initiated successfully.`);
//   };

//   const handleCancel = () => {
//     setAmount("");
//   };

//   return (
//     <div className="deposit-page">
//       <div className="deposit-card">
//         <div className="deposit-header">
//           <h3>Deposit</h3>
//         </div>

//         <div className="deposit-body">
//           <p className="note-text">
//             get amount in your wallet here...{" "}
//             <strong>Note:</strong> Minimum deposit amount is{" "}
//             <span className="red-text">₹1000.00</span>.
//           </p>

//           <div className="wallet-section">
//             <label>Wallet Balance</label>
//             <div className="wallet-display">
//               <div className="wallet-tag">AP</div>
//               <input 
//                 type="text"
//                 value={walletBalance.toFixed(2)}
//                 readOnly
//                 className="wallet-input"
//               />
//             </div>
//           </div>

//           <form onSubmit={handleProceed}>
//             <input
//               type="number"
//               placeholder="Please enter the amount"
//               className="input-field"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               min="1000"
//             />

//             <div className="btn-group">
//               <button type="submit" className="btn btn-primary">
//                 Proceed
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Deposit;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Deposit.css";

const Deposit = () => {
  const [walletBalance, setWalletBalance] = useState(0.0);
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("6900a1fc4061318ee813ac33"); // Replace with actual logged-in user ID

  // Fetch wallet balance when component loads
  useEffect(() => {
    axios
      .get(`https://api.vandv.ai/api/user/${userId}`)
      .then((res) => {
        setWalletBalance(res.data.walletBalance || 0);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const handleProceed = async (e) => {
    e.preventDefault();
    if (amount < 1000) {
      alert("Minimum deposit amount is ₹1000.");
      return;
    }

    try {
      const res = await axios.post("https://api.vandv.ai/api/deposit", {
        userId,
        amount: parseFloat(amount),
      });

      setWalletBalance(res.data.walletBalance);
      alert(res.data.message);

      // ✅ Notify Dashboard to refresh Total Deposit
      window.dispatchEvent(new Event("depositSuccess"));

      setAmount("");
    } catch (err) {
      alert(err.response?.data?.message || "Deposit failed!");
    }
  };

  const handleCancel = () => {
    setAmount("");
  };

  return (
    <div className="deposit-page">
      <div className="deposit-card">
        <div className="deposit-header">
          <h3>Deposit</h3>
        </div>

        <div className="deposit-body">
          <p className="note-text">
            Get amount in your wallet here... <strong>Note:</strong> Minimum deposit amount is{" "}
            <span className="red-text">₹1000.00</span>.
          </p>

          <div className="wallet-section">
            <label>Wallet Balance</label>
            <div className="wallet-display">
              <div className="wallet-tag">AP</div>
              <input
                type="text"
                value={walletBalance.toFixed(2)}
                readOnly
                className="wallet-input"
              />
            </div>
          </div>

          <form onSubmit={handleProceed}>
            <input
              type="number"
              placeholder="Please enter the amount"
              className="input-field"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1000"
            />

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Proceed
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;


