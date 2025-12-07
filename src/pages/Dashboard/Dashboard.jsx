// import React, { useEffect, useState, useRef } from "react";
// import "./Dashboard.css";
// import StatusSection from "./StatusSection";
// import SubscriptionPlans from "./SubscriptionPlans";
// import {
//   FaWallet,
//   FaUsers,
//   FaArrowDown,
//   FaArrowUp,
//   FaGift,
// } from "react-icons/fa";
// import axios from "axios";

// export default function Dashboard() {
//   const [learnEarnPoints, setLearnEarnPoints] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [referralIncome, setReferralIncome] = useState(0);
//   const [totalEstimated, setTotalEstimated] = useState(0);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     const username = localStorage.getItem("activeUser");
    
//     if (username) {
//       const pointsKey = `learnEarnPoints_${username}`;
//       const totalIncomeKey = `totalIncome_${username}`;
//       const estimatedKey = `totalEstimatedIncome_${username}`;
//       const referralKey = `referralIncome_${username}`; 
      

//       const points = JSON.parse(localStorage.getItem(pointsKey)) || 0;
//       const total = JSON.parse(localStorage.getItem(totalIncomeKey)) || 0;
//       const estimated = JSON.parse(localStorage.getItem(estimatedKey)) || 0;
//       const referral = JSON.parse(localStorage.getItem(referralKey)) || 0;

//       setLearnEarnPoints(points);
//       setTotalIncome(total);
//       setTotalEstimated(estimated);
//       setReferralIncome(referral);
//     } else {
//       setLearnEarnPoints(0);
//       setTotalIncome(0);
//       setTotalEstimated(0);
//       setReferralIncome(0);
//     }
//   }, []);

  
//   const handleAddReferralIncome = async () => {
//     try {
//       const sponsorUsername = localStorage.getItem("referralCodeUsed"); // jisne refer kiya
//       if (!sponsorUsername) return;

//       // call backend API (optional)
//       await axios.post("https://api.vandv.ai/api/addReferralIncome", {
//         sponsorUsername,
//       });

//       // localStorage me referral income update karo
//       const referralCountKey = `referralCount_${sponsorUsername}`;
//       const referralIncomeKey = `referralIncome_${sponsorUsername}`;

//       let count = JSON.parse(localStorage.getItem(referralCountKey)) || 0;
//       count += 1;

//       const income = count * 2000;

//       localStorage.setItem(referralCountKey, JSON.stringify(count));
//       localStorage.setItem(referralIncomeKey, JSON.stringify(income));

//       console.log(`✅ ${sponsorUsername} earned ₹2000 (${count} referrals)`);

//     } catch (err) {
//       console.error("❌ Error adding referral income:", err);
//     }
//   };

//   // ✅ Whenever Learn & Earn income > 0 → add referral
//   useEffect(() => {
//     if (learnEarnPoints > 0) {
//       handleAddReferralIncome();
//     }
//   }, [learnEarnPoints]);

//   // ✅ Fetch latest referral income from localStorage
//   useEffect(() => {
//     const username = localStorage.getItem("activeUser");
//     if (!username) return;

//     const referralKey = `referralIncome_${username}`;
//     const income = JSON.parse(localStorage.getItem(referralKey)) || 0;
//     setReferralIncome(income);
//   }, [learnEarnPoints]);

//   // ✅ Auto update total income (learnEarn + referral)
//   useEffect(() => {
//     const username = localStorage.getItem("activeUser");
//     const total = learnEarnPoints + referralIncome;

//     setTotalIncome(total);

//     if (username) {
//       const totalIncomeKey = `totalIncome_${username}`;
//       localStorage.setItem(totalIncomeKey, JSON.stringify(total));
//     }
//   }, [learnEarnPoints, referralIncome]);

//   // ✅ Center cards horizontally on first load
//   useEffect(() => {
//     const container = scrollRef.current;
//     if (container) {
//       const center =
//         container.scrollWidth / 2 - container.clientWidth / 2;
//       container.scrollLeft = center;
//     }
//   }, []);

//   const scrollLeft = () => {
//     scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   };
//   const scrollRight = () => {
//     scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   // 🧮 All Dashboard Cards
//   const cards = [
//     {
//       title: "Withdraw Balance",
//       value: "UP 0.00",
//       color: "red",
//       icon: <FaWallet />,
//     },
//     {
//       title: "Referral Income",
//       value: `UP ${2000}`,
//       color: "green",
//       icon: <FaGift />,
//     },
//     {
//       title: "Learn & Earn Income",
//       value: `UP ${learnEarnPoints.toFixed(1)}`,
//       color: "green",
//       icon: <FaUsers />,
//     },
//     {
//       title: "Referral Income Wallet",
//       value: `UP ${referralIncome.toFixed(1)}`,
//       color: "blue",
//       icon: <FaGift />,
//     },
//     {
//       title: "Total Deposit",
//       value: "UP 0.00",
//       color: "red",
//       icon: <FaArrowUp />,
//     },
//     {
//       title: "Total Income",
//       value: `UP ${totalIncome.toFixed(1)}`,
//       color: "green",
//       icon: <FaWallet />,
//     },
//     {
//       title: "Total Withdrawal",
//       value: "UP 0.00",
//       color: "red",
//       icon: <FaArrowDown />,
//     },
//     {
//       title: "Learn & Earn Income Wallet",
//       value: `UP ${learnEarnPoints.toFixed(1)}`,
//       color: "blue",
//       icon: <FaUsers />,
//     },
//     {
//       title: "Total Direct",
//       value: "UP 0.00",
//       color: "yellow",
//       icon: <FaUsers />,
//     },
//     {
//       title: "Total Active Direct",
//       value: "UP 0.00",
//       color: "yellow",
//       icon: <FaUsers />,
//     },
//     {
//       title: "Total Team",
//       value: "UP 0.00",
//       color: "yellow",
//       icon: <FaUsers />,
//     },
//     {
//       title: "Total Active Team",
//       value: "UP 0.00",
//       color: "yellow",
//       icon: <FaUsers />,
//     },
//   ];

//   return (
//     <div className="dashboard">
//       <div className="scroll-container">
//         {/* ← Scroll Button */}
//         <button className="scroll-btn scroll-left" onClick={scrollLeft}>
//           <span className="arrow-icon">‹</span>
//         </button>

//         {/* Cards Row */}
//         <div className="card-row" ref={scrollRef}>
//           {cards.map((card, idx) => (
//             <div key={idx} className={`card ${card.color}`}>
//               <div className="card-icon">{card.icon}</div>
//               <h3>{card.title}</h3>
//               <p>{card.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* → Scroll Button */}
//         <button className="scroll-btn scroll-right" onClick={scrollRight}>
//           <span className="arrow-icon">›</span>
//         </button>
//       </div>

//       {/* Other Sections */}
//       <StatusSection />
//       <SubscriptionPlans />
//     </div>
//   );
// }



    




// import React, { useEffect, useState, useRef } from "react";
// import "./Dashboard.css";
// import StatusSection from "./StatusSection";
// import SubscriptionPlans from "./SubscriptionPlans";
// import { FaWallet, FaUsers, FaArrowDown, FaArrowUp, FaGift } from "react-icons/fa"; 

// export default function Dashboard() {
//   const [learnEarnPoints, setLearnEarnPoints] = useState(0);
//   const [totalIncome, setTotalIncome] = useState(0);
//   const [referralIncome, setReferralIncome] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false); // ✅ Track when dashboard is fully loaded
//   const scrollRef = useRef(null);

//   // ✅ Simulate “dashboard ready” after everything is rendered
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 800); // wait 0.8s before starting count logic (adjust as needed)
//     return () => clearTimeout(timer);
//   }, []);

//   // ✅ Run referral income logic *only when fully loaded*
//   useEffect(() => {
//     if (!isLoaded) return; // ❌ stop until loaded

//     const username = localStorage.getItem("activeUser");

//     if (username) {
//       const referralKey = `referralIncome_${username}`;
//       const reloadKey = `referralReloadCount_${username}`;

//       let income = JSON.parse(localStorage.getItem(referralKey)) || 0;
//       let reloadCount = JSON.parse(localStorage.getItem(reloadKey)) || 0;

//       // 🔹 Increase reload count only once after full load
//       reloadCount += 1;
//       localStorage.setItem(reloadKey, JSON.stringify(reloadCount));

//       // 🔹 Amount logic
//       let addAmount = 0;
//       if (reloadCount === 2) addAmount = 2000;      
//       else if (reloadCount === 3) addAmount = 1000;
//       else if (reloadCount === 4) addAmount = 500;
//       else if (reloadCount === 5) addAmount = 300;
//       else if (reloadCount === 6) addAmount = 50;
//       else addAmount = 0;

//       income += addAmount;

//       localStorage.setItem(referralKey, JSON.stringify(income));
//       setReferralIncome(income);
//     } else {
//       setReferralIncome(0);
//     }
//   }, [isLoaded]); // ✅ run only once when loaded

//   // ✅ Update total income whenever referral or learnEarnPoints change
//   useEffect(() => {
//     const username = localStorage.getItem("activeUser");
//     if (!username) return;

//     const total = learnEarnPoints + referralIncome;
//     setTotalIncome(total);

//     const totalIncomeKey = `totalIncome_${username}`;
//     localStorage.setItem(totalIncomeKey, JSON.stringify(total));
//   }, [learnEarnPoints, referralIncome]);

//   // ✅ Reset on logout
//   useEffect(() => {
//     const handleLogout = () => {
//       const username = localStorage.getItem("activeUser");
//       if (!username) return;
//       localStorage.removeItem(`referralIncome_${username}`);
//       localStorage.removeItem(`referralReloadCount_${username}`);
//       setReferralIncome(0);
//     };

//     window.addEventListener("logoutEvent", handleLogout);
//     return () => window.removeEventListener("logoutEvent", handleLogout);
//   }, []);

//   // ✅ Scroll logic
//   const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

//   // ✅ Dashboard cards
//   const cards = [
//     { title: "Withdraw Balance", value: "UP 0.00", color: "red", icon: <FaWallet /> },
//     { title: "Referral Income", value: `UP ${referralIncome.toFixed(1)}`, color: "green", icon: <FaGift /> },
//     { title: "Learn & Earn Income", value: `UP ${learnEarnPoints.toFixed(1)}`, color: "green", icon: <FaUsers /> },
//     { title: "Referral Income Wallet", value: `UP ${referralIncome.toFixed(1)}`, color: "blue", icon: <FaGift /> },
//     { title: "Total Deposit", value: "UP 0.00", color: "red", icon: <FaArrowUp /> },
//     { title: "Total Income", value: `UP ${totalIncome.toFixed(1)}`, color: "green", icon: <FaWallet /> },
//     { title: "Total Withdrawal", value: "UP 0.00", color: "red", icon: <FaArrowDown /> },
//   ];

//   return (
//     <div className="dashboard">
//       {!isLoaded ? (
//         <div className="loading-screen">Loading Dashboard...</div>
//       ) : (
//         <>
//           <div className="scroll-container">
//             <button className="scroll-btn scroll-left" onClick={scrollLeft}>
//               <span className="arrow-icon">‹</span>
//             </button>

//             <div className="card-row" ref={scrollRef}>
//               {cards.map((card, idx) => (
//                 <div key={idx} className={`card ${card.color}`}>
//                   <div className="card-icon">{card.icon}</div>
//                   <h3>{card.title}</h3>
//                   <p>{card.value}</p>
//                 </div>
//               ))}
//             </div>

//             <button className="scroll-btn scroll-right" onClick={scrollRight}>
//               <span className="arrow-icon">›</span>
//             </button>
//           </div>

//           <StatusSection />
//           <SubscriptionPlans />
//         </>
//       )}
//     </div>
//   );
// }





import React, { useEffect, useState, useRef } from "react";
import "./Dashboard.css";
import axios from "axios";
import StatusSection from "./StatusSection";
import SubscriptionPlans from "./SubscriptionPlans";
import { FaWallet, FaUsers, FaArrowDown, FaArrowUp, FaGift } from "react-icons/fa";

export default function Dashboard() {
  const [learnEarnPoints, setLearnEarnPoints] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [referralIncome, setReferralIncome] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalDeposit, setTotalDeposit] = useState(0); // ✅ keep deposit here

  const scrollRef = useRef(null);

  // ✅ Simulate dashboard load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Referral Income Logic
  useEffect(() => {
    if (!isLoaded) return;
    const username = localStorage.getItem("activeUser");

    if (username) {
      const referralKey = `referralIncome_${username}`;
      const reloadKey = `referralReloadCount_${username}`;

      let income = JSON.parse(localStorage.getItem(referralKey)) || 0;
      let reloadCount = JSON.parse(localStorage.getItem(reloadKey)) || 0;

      reloadCount += 1;
      localStorage.setItem(reloadKey, JSON.stringify(reloadCount));

      let addAmount = 0;
      if (reloadCount === 2) addAmount = 2000;
      else if (reloadCount === 3) addAmount = 1000;
      else if (reloadCount === 4) addAmount = 500;
      else if (reloadCount === 5) addAmount = 150;
      else if (reloadCount === 6) addAmount = 50;
      else if (reloadCount > 6) addAmount = 2.5;

      income += addAmount;

      const referralBonusKey = `referralBonus_${username}`;
      const bonusFromSignups =
        JSON.parse(localStorage.getItem(referralBonusKey)) || 0;
      income += bonusFromSignups;

      localStorage.setItem(referralKey, JSON.stringify(income));
      setReferralIncome(income);
    } else {
      setReferralIncome(0);
    }
  }, [isLoaded]);

  // ✅ Update total income dynamically
  useEffect(() => {
    const username = localStorage.getItem("activeUser");
    if (!username) return;

    const total = learnEarnPoints + referralIncome;
    setTotalIncome(total);

    const totalIncomeKey = `totalIncome_${username}`;
    localStorage.setItem(totalIncomeKey, JSON.stringify(total));
  }, [learnEarnPoints, referralIncome]);

  // ✅ Reset on logout
  useEffect(() => {
    const handleLogout = () => {
      const username = localStorage.getItem("activeUser");
      if (!username) return;
      localStorage.removeItem(`referralIncome_${username}`);
      localStorage.removeItem(`referralReloadCount_${username}`);
      localStorage.removeItem(`referralBonus_${username}`);
      setReferralIncome(0);
    };

    window.addEventListener("logoutEvent", handleLogout);
    return () => window.removeEventListener("logoutEvent", handleLogout);
  }, []);

  // ✅ Scroll functions
  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  // ✅ LocalStorage keys
  const username = localStorage.getItem("activeUser");
  const totalWithdrawKey = `totalWithdraw_${username}`;
  const totalWithdraw = JSON.parse(localStorage.getItem(totalWithdrawKey)) || 0;
  const totalIncome1 = referralIncome + learnEarnPoints - totalWithdraw;

  // ✅ Total Deposit Logic (Single clean version)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) return;

    const fetchDeposit = async () => {
      try {
        const res = await axios.get(`https://api.vandv.ai/api/user/${userId}`);
        setTotalDeposit(res.data?.totalDeposit || 0);
      } catch (err) {
        console.error("Error fetching total deposit:", err);
      }
    };

    fetchDeposit(); // initial fetch

    // 👇 Refresh dashboard on successful deposit
    const handleDepositSuccess = () => {
      fetchDeposit();
    };

    window.addEventListener("depositSuccess", handleDepositSuccess);
    return () =>
      window.removeEventListener("depositSuccess", handleDepositSuccess);
  }, []);

  // ✅ Card data
  const cards = [
    {
      title: "Withdraw Balance",
      value: `UP ${totalWithdraw.toFixed(1)}`,
      color: "red",
      icon: <FaWallet />,
    },
    {
      title: "Referral Income",
      value: `UP ${referralIncome.toFixed(1)}`,
      color: "green",
      icon: <FaGift />,
    },
    {
      title: "Learn & Earn Income",
      value: `UP ${1000}`,
      color: "green",
      icon: <FaUsers />,
    },
    {
      title: "Referral Income Wallet",
      value: `UP ${referralIncome.toFixed(1)}`,
      color: "blue",
      icon: <FaGift />,
    },
    {
      title: "Total Deposit",
      value: `₹${totalDeposit.toFixed(2)}`,
      color: "red",
      icon: <FaArrowUp />,
    },
    {
      title: "Total Income",
      value: `UP ${totalIncome1.toFixed(1)}`,
      color: "green",
      icon: <FaWallet />,
    },
    {
      title: "Total Withdrawal",
      value: `UP ${totalWithdraw.toFixed(1)}`,
      color: "red",
      icon: <FaArrowDown />,
    },
    {
      title: "Learn & Earn Income Wallet",
      value: `UP ${learnEarnPoints.toFixed(1)}`,
      color: "blue",
      icon: <FaUsers />,
    },
    { title: "Total Direct", value: "UP 0.00", color: "yellow", icon: <FaUsers /> },
    { title: "Total Active Direct", value: "UP 0.00", color: "yellow", icon: <FaUsers /> },
    { title: "Total Team", value: "UP 0.00", color: "yellow", icon: <FaUsers /> },
    { title: "Total Active Team", value: "UP 0.00", color: "yellow", icon: <FaUsers /> },
  ];

  // ✅ Auto-scroll to middle
  useEffect(() => {
    if (isLoaded && scrollRef.current) {
      const container = scrollRef.current;
      const middlePosition =
        (container.scrollWidth - container.clientWidth) / 2;
      container.scrollTo({ left: middlePosition, behavior: "smooth" });
    }
  }, [isLoaded]);

  return (
    <div className="dashboard">
      {!isLoaded ? (
        <div className="loading-screen">Loading Dashboard...</div>
      ) : (
        <>
          <div className="scroll-container">
            <button className="scroll-btn scroll-left" onClick={scrollLeft}>
              ‹
            </button>

            <div className="card-row" ref={scrollRef}>
              {cards.map((card, idx) => (
                <div key={idx} className={`card ${card.color}`}>
                  <div className="card-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.value}</p>
                </div>
              ))}
            </div>

            <button className="scroll-btn scroll-right" onClick={scrollRight}>
              ›
            </button>
          </div>

          <StatusSection />
          <SubscriptionPlans />
        </>
      )}
    </div>
  );
}











// import React, { useEffect, useState, useRef } from "react";
// import "./Dashboard.css";
// import StatusSection from "./StatusSection";
// import SubscriptionPlans from "./SubscriptionPlans";
// import { FaWallet, FaUsers, FaArrowDown, FaArrowUp, FaGift } from "react-icons/fa";

// export default function Dashboard() { 
//   const [learnEarnPoints, setLearnEarnPoints] = useState(0);
//   // const [totalIncome, setTotalIncome] = useState(0);
//   const [referralIncome, setReferralIncome] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const scrollRef = useRef(null);

//   // ✅ NEW: Load saved data when the same user logs in
//   useEffect(() => {
//     const username = localStorage.getItem("activeUser");
//     if (username) {
//       const referralKey = `referralIncome_${username}`;
//       const totalIncomeKey = `totalIncome_${username}`;
//       const learnEarnKey = `learnEarn_${username}`;

//       const savedReferral = JSON.parse(localStorage.getItem(referralKey)) || 0;
//       const savedTotal = JSON.parse(localStorage.getItem(totalIncomeKey)) || 0;
//       const savedLearnEarn = JSON.parse(localStorage.getItem(learnEarnKey)) || 0;

//       setReferralIncome(savedReferral);
//       setTotalIncome(savedTotal);
//       setLearnEarnPoints(savedLearnEarn);
//     }
//   }, []);

//   // ✅ Simulate dashboard load
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//     }, 800);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (!isLoaded) return;

//     const username = localStorage.getItem("activeUser");

//     if (username) {
//       const referralKey = `referralIncome_${username}`;
//       const reloadKey = `referralReloadCount_${username}`;

//       let income = JSON.parse(localStorage.getItem(referralKey)) || 0;
//       let reloadCount = JSON.parse(localStorage.getItem(reloadKey)) || 0;

//       reloadCount += 1;
//       localStorage.setItem(reloadKey, JSON.stringify(reloadCount));

//       let addAmount = 0;
//       if (reloadCount === 2) addAmount = 2000;
//       else if (reloadCount === 3) addAmount = 1000;
//       else if (reloadCount === 4) addAmount = 500;
//       else if (reloadCount === 5) addAmount = 150;
//       else if (reloadCount === 6) addAmount = 50;
//       else if (reloadCount > 6) addAmount = 2.5;

//       income += addAmount;

//       const referralBonusKey = `referralBonus_${username}`;
//       const bonusFromSignups = JSON.parse(localStorage.getItem(referralBonusKey)) || 0;
//       income += bonusFromSignups;

//       localStorage.setItem(referralKey, JSON.stringify(income));
//       setReferralIncome(income);
//     } else {
//       setReferralIncome(0);
//     }
//   }, [isLoaded]);

//   // ✅ Update total income and save progress
//   useEffect(() => {
//     const username = localStorage.getItem("activeUser");
//     if (!username) return;

//     const total = learnEarnPoints + referralIncome;
//     setTotalIncome(total);

//     const totalIncomeKey = `totalIncome_${username}`;
//     localStorage.setItem(totalIncomeKey, JSON.stringify(total));

//     // ✅ Save Learn & Earn progress
//     const learnEarnKey = `learnEarn_${username}`;
//     localStorage.setItem(learnEarnKey, JSON.stringify(learnEarnPoints));
//   }, [learnEarnPoints, referralIncome]);

//   // ✅ Reset on logout
//   useEffect(() => {
//     const handleLogout = () => {
//       const username = localStorage.getItem("activeUser");
//       if (!username) return;
//       localStorage.removeItem(`referralIncome_${username}`);
//       localStorage.removeItem(`referralReloadCount_${username}`);
//       localStorage.removeItem(`referralBonus_${username}`);
//       setReferralIncome(0);
//     };

//     window.addEventListener("logoutEvent", handleLogout);
//     return () => window.removeEventListener("logoutEvent", handleLogout);
//   }, []);

//   // ✅ Scroll functions
//   const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

//   // ✅ Dashboard cards
//   const username = localStorage.getItem("activeUser");
//   const totalWithdrawKey = `totalWithdraw_${username}`;
//   const totalWithdraw = JSON.parse(localStorage.getItem(totalWithdrawKey)) || 0;


//    const totalIncome = (referralIncome + learnEarnPoints - totalWithdraw);

// // ✅ Card Data
// const cards = [
//   { title: "Withdraw Balance", value: `UP ${totalWithdraw.toFixed(1)}`, color: "red", icon: <FaWallet /> },
//   { title: "Referral Income", value: `UP ${referralIncome.toFixed(1)}`, color: "green", icon: <FaGift /> },
//   { title: "Learn & Earn Income", value: `UP ${learnEarnPoints.toFixed(1)}`, color: "green", icon: <FaUsers /> },
//   { title: "Referral Income Wallet", value: `UP ${referralIncome.toFixed(1)}`, color: "blue", icon: <FaGift /> },
//   { title: "Total Deposit", value: "UP 0.00", color: "red", icon: <FaArrowUp /> },
//   { title: "Total Income", value: `UP ${totalIncome.toFixed(1)}`, color: "green", icon: <FaWallet /> },
//   { title: "Total Withdrawal", value: `UP ${totalWithdraw.toFixed(1)}`, color: "red", icon: <FaArrowDown /> },
//   { title: "Learn & Earn Income Wallet", value: `UP ${learnEarnPoints.toFixed(1)}`, color: "blue", icon: <FaUsers /> },
//   { title: "Total Direct", value: "UP 0.00", color: "yellow", icon: <FaUsers /> },
//   { title: "Total Active Direct", value: "UP 0.00", color: "yellow", icon: <FaUsers /> },
//   { title: "Total Team", value: "UP 0.00", color: "yellow", icon: <FaUsers /> },
//   { title: "Total Active Team", value: "UP 0.00", color: "yellow", icon: <FaUsers /> },
// ];



// // const cards = [ 
// //                 { title: "Withdraw Balance", value: "UP 0.00", color: "red", icon: <FaWallet /> },
// //                 { title: "Referral Income", value:"  UP ${referralIncome.toFixed(1)}", color: "green", icon: <FaGift /> }, 
// //                 { title: "Learn & Earn Income", value: "UP ${learnEarnPoints.toFixed(1)}", color: "green", icon: <FaUsers /> }, 
// //                 { title: "Referral Income Wallet", value: "UP ${referralIncome.toFixed(1)}", color: "blue", icon: <FaGift /> },
// //                 { title: "Total Deposit", value: "UP 0.00", color: "red", icon: <FaArrowUp /> }, 
// //                 { title: "Total Income", value: "UP ${totalIncome.toFixed(1)}", color: "green", icon: <FaWallet /> },
// //                 { title: "Total Withdrawal", value: "UP 0.00", color: "red", icon: <FaArrowDown /> }, 
// //                 { title: "Learn & Earn Income Wallet", value: "UP 0.00", color: "blue", icon: <FaUsers /> }, 
// //                 { title: "Total Direct", value: "UP 0.00", color: "yellow", icon: <FaUsers /> }, 
// //                 { title: "Total Active Direct", value: "UP 0.00", color: "yellow", icon: <FaUsers /> }, 
// //                 { title: "Total Team", value: "UP 0.00", color: "yellow", icon: <FaUsers /> }, 
// //                 { title: "Total Active Team", value: "UP 0.00", color: "yellow", icon: <FaUsers /> }, 
// //               ];


//   // ✅ Auto-scroll to middle card when dashboard loads
//   useEffect(() => {
//     if (isLoaded && scrollRef.current) {
//       const container = scrollRef.current;
//       const middlePosition = (container.scrollWidth - container.clientWidth) / 2;
//       container.scrollTo({ left: middlePosition, behavior: "smooth" });
//     }
//   }, [isLoaded]);

//   return (
//     <div className="dashboard">
//       {!isLoaded ? (
//         <div className="loading-screen">Loading Dashboard...</div>
//       ) : (
//         <>
//           <div className="scroll-container">
//             <button className="scroll-btn scroll-left" onClick={scrollLeft}>
//               <span className="arrow-icon">‹</span>
//             </button>

//             <div className="card-row" ref={scrollRef}>
//               {cards.map((card, idx) => (
//                 <div key={idx} className={`card ${card.color}`}>
//                   <div className="card-icon">{card.icon}</div>
//                   <h3>{card.title}</h3>
//                   <p>{card.value}</p>
//                 </div>
//               ))}
//             </div>

//             <button className="scroll-btn scroll-right" onClick={scrollRight}>
//               <span className="arrow-icon">›</span>
//             </button>
//           </div>

//           <StatusSection />
//           <SubscriptionPlans />
//         </>
//       )}
//     </div>
//   );
// }

