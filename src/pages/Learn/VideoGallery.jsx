import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./VideoGallery.css";
import img from "./image.png";
import Certificate from "./Certificate";
import html2canvas from "html2canvas";
import axios from "axios";

const VideoGallery = () => {
  const videos = [
    { id: 1, title: "Promoting Innovation", duration: "1 Month", desc: "Explore the fundamentals of creativity and innovation.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
    { id: 2, title: "Sustainable Farming", duration: "1 Month", desc: "Learn techniques to make farming more eco-friendly and profitable.", src: "https://www.w3schools.com/html/movie.mp4", img },
    { id: 3, title: "Water Management", duration: "1 Month", desc: "Understand the importance of efficient water usage in agriculture.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
    { id: 4, title: "Organic Practices", duration: "1 Month", desc: "Discover the benefits of organic fertilizers and pest management.", src: "https://www.w3schools.com/html/movie.mp4", img },
    { id: 5, title: "Market Linkages", duration: "1 Month", desc: "Learn to connect with buyers and enhance profitability.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
    { id: 6, title: "Agri Finance", duration: "1 Month", desc: "Master basic agricultural finance and budgeting.", src: "https://www.w3schools.com/html/movie.mp4", img },
    { id: 7, title: "Technology in Agriculture", duration: "1 Month", desc: "Learn how AI, drones, and sensors improve productivity.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
    { id: 8, title: "Soil Health", duration: "1 Month", desc: "Understand soil testing, composition, and maintenance.", src: "https://www.w3schools.com/html/movie.mp4", img },
    { id: 9, title: "Climate-Smart Agriculture", duration: "1 Month", desc: "Adapt to climate change through sustainable agri-practices.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
    { id: 10, title: "Export Readiness", duration: "1 Month", desc: "Learn international trade standards and export procedures.", src: "https://www.w3schools.com/html/movie.mp4", img },
  ];

  const quizData = [
    { question: "What is innovation?", options: ["Copying ideas", "Creating new ideas", "Ignoring ideas", "None"], correct: 1 },
    { question: "What helps farming sustainability?", options: ["Excessive fertilizers", "Crop rotation", "Deforestation", "Pollution"], correct: 1 },
    { question: "Which practice improves soil health?", options: ["Burning residues", "Organic farming", "Deforestation", "Over-irrigation"], correct: 1 },
    { question: "What supports market linkages?", options: ["Middlemen", "Direct selling", "Ignoring market", "Random sales"], correct: 1 },
    { question: "What is the role of technology in agriculture?", options: ["Reduce productivity", "Improve efficiency", "Increase cost only", "None"], correct: 1 },
  ];

  const [stages, setStages] = useState(videos.map(() => "locked"));
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(null);
  const [openVideo, setOpenVideo] = useState(null);
  const [unlockDates, setUnlockDates] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [referralIncome, setReferralIncome] = useState(0);
  const [maxPlayedTimes, setMaxPlayedTimes] = useState({});

  const videoRefs = useRef([]);

  const username = localStorage.getItem("activeUser");
  const progressKey = "videoProgress";
  const pointsKey = "userPoints";
  const incomeKey = "userIncome";
  const estimatedKey = "estimatedIncome";

  // ✅ Fetch referral income
  useEffect(() => {
    const fetchReferralIncome = async () => {
      try {
        const res = await axios.get(`https://api.vandv.ai/api/referrals/${username}`);
        const referralCount = res.data.count || 0;
        setReferralIncome(referralCount * 2000);
      } catch (err) {
        console.error("❌ Error fetching referral income:", err);
      }
    };
    if (username) fetchReferralIncome();
  }, [username]);

  // ✅ Restore progress
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(progressKey));
    if (saved && saved.length) {
      const updated = videos.map((_, i) => {
        if (saved[i]?.unlocked) return "unlocked";
        if (saved[i - 1]?.watchedDate) {
          const prevDate = new Date(saved[i - 1].watchedDate);
          const unlockDate = new Date(prevDate);
          unlockDate.setMonth(unlockDate.getMonth() + 1);
          return new Date() >= unlockDate ? "unlocked" : "locked";
        }
        return "locked";
      });
      const unlockInfo = videos.map((_, i) => {
        if (i === 0) return null;
        if (saved[i - 1]?.watchedDate) {
          const prevDate = new Date(saved[i - 1].watchedDate);
          const unlockDate = new Date(prevDate);
          unlockDate.setMonth(unlockDate.getMonth() + 1);
          return unlockDate;
        }
        return null;
      });
      setStages(updated);
      setUnlockDates(unlockInfo);
    } else setStages(videos.map(() => "locked"));
  }, [progressKey]);

  // ✅ Track current time
  const handleTimeUpdate = (i) => {
    const currentTime = videoRefs.current[i]?.currentTime || 0;
    localStorage.setItem(`videoTime_${i}`, currentTime);
    setMaxPlayedTimes((prev) => ({
      ...prev,
      [i]: Math.max(prev[i] || 0, currentTime),
    }));
  };

  // ✅ Prevent skipping forward (⏩)
  const handleSeeking = (i) => {
    const video = videoRefs.current[i];
    const maxTime = maxPlayedTimes[i] || 0;

    if (video.currentTime > maxTime + 1) {
      video.pause();
      video.currentTime = maxTime;
      alert("⏩ Forward skipping disabled! Resuming from your last watched point.");
      setTimeout(() => video.play(), 500);
    }
  };

  // ✅ Watch video (resume)
  const handleWatch = (i) => {
    const progress = JSON.parse(localStorage.getItem(progressKey)) || [];
    const savedTime = localStorage.getItem(`videoTime_${i}`);

    if (i === 0 && stages[i] === "locked") {
      const updatedStages = [...stages];
      updatedStages[i] = "unlocked";
      setStages(updatedStages);
      progress[i] = { ...progress[i], unlocked: true };
      localStorage.setItem(progressKey, JSON.stringify(progress));
    }

    setOpenVideo(i);
    const updated = [...stages];
    updated[i] = "watching";
    setStages(updated);

    setTimeout(() => {
      if (videoRefs.current[i]) {
        videoRefs.current[i].currentTime = savedTime ? parseFloat(savedTime) : 0;
        videoRefs.current[i].play();
      }
    }, 500);
  };

  // ✅ When video ends
 
  const handleVideoEnd = async (i) => {
  localStorage.removeItem(`videoTime_${i}`);
  const progress = JSON.parse(localStorage.getItem(progressKey)) || [];

  // Check if already watched before
  const alreadyWatched = progress[i]?.watchedDate ? true : false;

  // Update progress regardless (so it saves first watch date)
  progress[i] = {
    ...progress[i],
    watchedDate: progress[i]?.watchedDate || new Date().toISOString(),
    unlocked: true,
  };
  localStorage.setItem(progressKey, JSON.stringify(progress));

  // Update stage → show quiz only if not watched before
  const updated = [...stages];
  updated[i] = "quiz";
  setStages(updated);
  setShowQuiz(i); // ✅ this ensures quiz always opens
  setOpenVideo(null);

  // Only add points the *first time* this video is completed
  if (!alreadyWatched) {
    const username = localStorage.getItem("activeUser");
    if (username) {
      const learnEarnKey = `learnEarn_${username}`;
      const totalIncomeKey = `totalIncome_${username}`;

      let learnPoints = JSON.parse(localStorage.getItem(learnEarnKey)) || 0;
      let totalIncome = JSON.parse(localStorage.getItem(totalIncomeKey)) || 0;

      learnPoints += 1000;
      totalIncome += 1000;

      localStorage.setItem(learnEarnKey, JSON.stringify(learnPoints));
      localStorage.setItem(totalIncomeKey, JSON.stringify(totalIncome));
    }

    // Optional — update points visible on same page
    let currentPoints = JSON.parse(localStorage.getItem(pointsKey)) || 0;
    let income = JSON.parse(localStorage.getItem(incomeKey)) || 0;
    let estimated = JSON.parse(localStorage.getItem(estimatedKey)) || 0;
    currentPoints += 1000;
    income += 1000;
    estimated += 1000;
    localStorage.setItem(pointsKey, JSON.stringify(currentPoints));
    localStorage.setItem(incomeKey, JSON.stringify(income));
    localStorage.setItem(estimatedKey, JSON.stringify(estimated));

    // ✅ Optional: notify Dashboard to live-update without reload
    window.dispatchEvent(new Event("learnEarnUpdated"));
  }
};



  // ✅ Quiz functions
  const handleAnswer = (qIdx, optIdx) => setAnswers({ ...answers, [qIdx]: optIdx });

  const handleQuizSubmit = (i) => {
    let newScore = 0;
    quizData.forEach((q, idx) => {
      if (answers[idx] === q.correct) newScore++;
    });
    setScore(newScore);
    const passingScore = Math.ceil(quizData.length * 0.6);
    if (newScore >= passingScore) {
      const updated = [...stages];
      updated[i] = "certificate";
      setStages(updated);
      alert(`🎉 Congratulations! You passed with ${newScore}/${quizData.length} and unlocked your certificate!`);
    } else {
      alert(`❌ You scored ${newScore}/${quizData.length}. You need at least ${passingScore} to pass. Try again!`);
    }
    setShowQuiz(null);
    setCurrentQuestion(0);
  };

  // ✅ Certificate generation
  const handleDownloadCertificate = async (title) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || { username: "User" };
      const userName = user.username || "Your Name";
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.top = "-9999px";
      document.body.appendChild(container);

      import("react-dom/client").then(async (ReactDOM) => {
        const root = ReactDOM.createRoot(container);
        root.render(<Certificate userName={userName} courseTitle={title} />);
        await new Promise((res) => setTimeout(res, 1000));
        const canvas = await html2canvas(container, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "px", [1000, 700]);
        pdf.addImage(imgData, "PNG", 0, 0, 1000, 700);
        pdf.save(`${userName}_${title}_Certificate.pdf`);
        root.unmount();
        document.body.removeChild(container);
      });
    } catch (err) {
      console.error("Error generating certificate:", err);
      alert("Something went wrong while generating the certificate!");
    }
  };

  return (
    <div className="video-gallery">
      <h2>🎓 Video Gallery ({username})</h2>

      <div className="referral-income-card">
        <h3>💰 Referral Earnings: ₹{referralIncome.toLocaleString()}</h3>
      </div>

      <div className="video-grid">
        {videos.map((vid, i) => (
          <div className="video-card" key={vid.id}>
            <img src={vid.img} alt={vid.title} className="thumbnail" />
            <h3>{vid.title} <span>{vid.duration}</span></h3>
            <p>{vid.desc}</p>

            <div className="btn-row">
              {stages[i] === "locked" && (
                <button className="locked-btn" onClick={() => i === 0 && handleWatch(i)}>
                  🔒 Locked{" "}
                  {unlockDates[i] && (
                    <small>(Unlocks on {unlockDates[i].toLocaleDateString()})</small>
                  )}
                </button>
              )}

              {stages[i] === "unlocked" && (
                <button className="watch-btn" onClick={() => handleWatch(i)}>
                  ▶ Watch Now
                </button>
              )}

              {stages[i] === "quiz" && (
                <button className="quiz-btn" onClick={() => setShowQuiz(i)}>
                  🧠 Take Quiz
                </button>
              )}

              {stages[i] === "certificate" && (
                <button className="cert-btn" onClick={() => handleDownloadCertificate(vid.title)}>
                  🏆 Download Certificate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {openVideo !== null && (
        <div className="video-modal">
          <div className="video-popup">
            <div className="video-header">
              <h3>📹 Course Video</h3>
              <button className="close-btn" onClick={() => setOpenVideo(null)}>✕</button>
            </div>

            <video
              ref={(el) => (videoRefs.current[openVideo] = el)}
              src={videos[openVideo].src}
              onEnded={() => handleVideoEnd(openVideo)}
              onTimeUpdate={() => handleTimeUpdate(openVideo)}
              onSeeking={() => handleSeeking(openVideo)}
              controls
              controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              autoPlay
            />
          </div>
        </div>
      )}

      {showQuiz !== null && (
        <div className="quiz-modal">
          <div className="quiz-container">
            <div className="quiz-header">
              <span className="quiz-icon">📘</span>
              <h3>Course Quiz</h3>
              <button className="close-btn" onClick={() => setShowQuiz(null)}>✕</button>
            </div>

            <div className="progress-bar">
              <div className="progress" style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}></div>
            </div>

            <div className="quiz-content">
              <p className="question-text">
                Q{currentQuestion + 1}. {quizData[currentQuestion].question}
              </p>
              <div className="options">
                {quizData[currentQuestion].options.map((opt, optIdx) => (
                  <label key={optIdx} className="option-item">
                    <input
                      type="radio"
                      name={`q${currentQuestion}`}
                      checked={answers[currentQuestion] === optIdx}
                      onChange={() => handleAnswer(currentQuestion, optIdx)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              <p className="question-count">
                Question {currentQuestion + 1} of {quizData.length}
              </p>
            </div>

            <div className="quiz-footer">
              <button
                className="prev-btn"
                onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>

              {currentQuestion < quizData.length - 1 ? (
                <button className="next-btn" onClick={() => setCurrentQuestion((prev) => prev + 1)}>Next →</button>
              ) : (
                <button className="submit-btn" onClick={() => handleQuizSubmit(showQuiz)}>✅ Submit</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;




// import React, { useState, useRef, useEffect } from "react";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import "./VideoGallery.css";
// import img from "./image.png";
// import Certificate from "./Certificate";
// import html2canvas from "html2canvas";
// import axios from "axios";

// const VideoGallery = () => {
//   const videos = [
//     { id: 1, title: "Promoting Innovation", duration: "1 Month", desc: "Explore the fundamentals of creativity and innovation.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
//     { id: 2, title: "Sustainable Farming", duration: "1 Month", desc: "Learn techniques to make farming more eco-friendly and profitable.", src: "https://www.w3schools.com/html/movie.mp4", img },
//     { id: 3, title: "Water Management", duration: "1 Month", desc: "Understand the importance of efficient water usage in agriculture.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
//     { id: 4, title: "Organic Practices", duration: "1 Month", desc: "Discover the benefits of organic fertilizers and pest management.", src: "https://www.w3schools.com/html/movie.mp4", img },
//     { id: 5, title: "Market Linkages", duration: "1 Month", desc: "Learn to connect with buyers and enhance profitability.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
//     { id: 6, title: "Agri Finance", duration: "1 Month", desc: "Master basic agricultural finance and budgeting.", src: "https://www.w3schools.com/html/movie.mp4", img },
//     { id: 7, title: "Technology in Agriculture", duration: "1 Month", desc: "Learn how AI, drones, and sensors improve productivity.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
//     { id: 8, title: "Soil Health", duration: "1 Month", desc: "Understand soil testing, composition, and maintenance.", src: "https://www.w3schools.com/html/movie.mp4", img },
//     { id: 9, title: "Climate-Smart Agriculture", duration: "1 Month", desc: "Adapt to climate change through sustainable agri-practices.", src: "https://www.w3schools.com/html/mov_bbb.mp4", img },
//     { id: 10, title: "Export Readiness", duration: "1 Month", desc: "Learn international trade standards and export procedures.", src: "https://www.w3schools.com/html/movie.mp4", img },
//   ];

//   const quizData = [
//     { question: "What is innovation?", options: ["Copying ideas", "Creating new ideas", "Ignoring ideas", "None"], correct: 1 },
//     { question: "What helps farming sustainability?", options: ["Excessive fertilizers", "Crop rotation", "Deforestation", "Pollution"], correct: 1 },
//     { question: "Which practice improves soil health?", options: ["Burning residues", "Organic farming", "Deforestation", "Over-irrigation"], correct: 1 },
//     { question: "What supports market linkages?", options: ["Middlemen", "Direct selling", "Ignoring market", "Random sales"], correct: 1 },
//     { question: "What is the role of technology in agriculture?", options: ["Reduce productivity", "Improve efficiency", "Increase cost only", "None"], correct: 1 },
//   ];

//   const [stages, setStages] = useState(videos.map(() => "locked"));
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(0);
//   const [showQuiz, setShowQuiz] = useState(null);
//   const [openVideo, setOpenVideo] = useState(null);
//   const [unlockDates, setUnlockDates] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [referralIncome, setReferralIncome] = useState(0);
//   const [maxPlayedTimes, setMaxPlayedTimes] = useState({});

//   const videoRefs = useRef([]);
//   const username = localStorage.getItem("activeUser");

//   const progressKey = "videoProgress";
//   const pointsKey = "userPoints";
//   const incomeKey = "userIncome";
//   const estimatedKey = "estimatedIncome";

//   // ✅ Fetch referral income
//   useEffect(() => {
//     const fetchReferralIncome = async () => {
//       try {
//         const res = await axios.get(`http://localhost:6000/api/referrals/${username}`);
//         const referralCount = res.data.count || 0;
//         setReferralIncome(referralCount * 2000);
//       } catch (err) {
//         console.error("❌ Error fetching referral income:", err);
//       }
//     };
//     if (username) fetchReferralIncome();
//   }, [username]);

//   // ✅ Load progress on first render
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem(progressKey));

//     if (saved && saved.length) {
//       const updatedStages = videos.map((_, i) => {
//         if (i === 0) return saved[i]?.unlocked ? "unlocked" : "unlocked"; // first always unlocked
//         if (saved[i]?.watchedDate) return "certificate"; // completed videos
//         if (saved[i]?.unlocked) return "unlocked";
//         return "locked";
//       });

//       const unlockInfo = videos.map((_, i) => {
//         if (i === 0) return null;
//         if (saved[i - 1]?.watchedDate) {
//           const prevDate = new Date(saved[i - 1].watchedDate);
//           const unlockDate = new Date(prevDate);
//           unlockDate.setMonth(unlockDate.getMonth() + 1);
//           return unlockDate;
//         }
//         return null;
//       });

//       setStages(updatedStages);
//       setUnlockDates(unlockInfo);
//     } else {
//       const newProgress = videos.map((_, i) => (i === 0 ? { unlocked: true } : { unlocked: false }));
//       localStorage.setItem(progressKey, JSON.stringify(newProgress));
//       setStages(videos.map((_, i) => (i === 0 ? "unlocked" : "locked")));
//       setUnlockDates(videos.map(() => null));
//     }
//   }, []);

//   const handleTimeUpdate = (i) => {
//     const currentTime = videoRefs.current[i]?.currentTime || 0;
//     localStorage.setItem(`videoTime_${i}`, currentTime);
//     setMaxPlayedTimes((prev) => ({ ...prev, [i]: Math.max(prev[i] || 0, currentTime) }));
//   };

//   const handleSeeking = (i) => {
//     const video = videoRefs.current[i];
//     const maxTime = maxPlayedTimes[i] || 0;
//     if (video.currentTime > maxTime + 1) {
//       video.pause();
//       video.currentTime = maxTime;
//       alert("⏩ Forward skipping disabled!");
//       setTimeout(() => video.play(), 400);
//     }
//   };

//   const handleWatch = (i) => {
//     const savedTime = localStorage.getItem(`videoTime_${i}`);
//     setOpenVideo(i);
//     const updated = [...stages];
//     updated[i] = "watching";
//     setStages(updated);

//     setTimeout(() => {
//       if (videoRefs.current[i]) {
//         videoRefs.current[i].currentTime = savedTime ? parseFloat(savedTime) : 0;
//         videoRefs.current[i].play();
//       }
//     }, 400);
//   };

//   // ✅ FIXED: Video end → quiz open
//   const handleVideoEnd = (i) => {
//     localStorage.removeItem(`videoTime_${i}`);
//     const progress = JSON.parse(localStorage.getItem(progressKey)) || [];

//     if (progress[i]?.watchedDate) return;

//     progress[i] = { ...progress[i], watchedDate: new Date().toISOString(), unlocked: true };
//     localStorage.setItem(progressKey, JSON.stringify(progress));

//     if (i + 1 < videos.length) {
//       const unlockDate = new Date();
//       unlockDate.setMonth(unlockDate.getMonth() + 1);
//       progress[i + 1] = { ...progress[i + 1], unlockedDate: unlockDate };
//       localStorage.setItem(progressKey, JSON.stringify(progress));
//     }

//     let totalIncome = JSON.parse(localStorage.getItem(incomeKey)) || 0;
//     totalIncome += 1000;
//     localStorage.setItem(incomeKey, JSON.stringify(totalIncome));

//     setOpenVideo(null);
//     setTimeout(() => {
//       const updated = [...stages];
//       updated[i] = "quiz";
//       setStages(updated);
//       setShowQuiz(i);
//     }, 400);
//   };

//   const handleAnswer = (qIdx, optIdx) => setAnswers({ ...answers, [qIdx]: optIdx });

//   const handleQuizSubmit = (i) => {
//     let newScore = 0;
//     quizData.forEach((q, idx) => {
//       if (answers[idx] === q.correct) newScore++;
//     });

//     setScore(newScore);
//     const passingScore = Math.ceil(quizData.length * 0.6);

//     if (newScore >= passingScore) {
//       const updated = [...stages];
//       updated[i] = "certificate";
//       setStages(updated);
//       alert(`🎉 Passed with ${newScore}/${quizData.length}! Certificate unlocked.`);
//     } else {
//       alert(`❌ Scored ${newScore}/${quizData.length}. Try again!`);
//     }
//     setShowQuiz(null);
//     setCurrentQuestion(0);
//   };

//   // ✅ FIXED: Certificate download
//   const handleDownloadCertificate = async (title) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user")) || { username: "User" };
//       const userName = user.username || "Your Name";
//       const container = document.createElement("div");
//       container.style.position = "absolute";
//       container.style.top = "-9999px";
//       document.body.appendChild(container);

//       const { createRoot } = await import("react-dom/client");
//       const root = createRoot(container);
//       root.render(<Certificate userName={userName} courseTitle={title} />);

//       await new Promise((res) => setTimeout(res, 1200));

//       const canvas = await html2canvas(container, { scale: 2 });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("l", "px", [1000, 700]);
//       pdf.addImage(imgData, "PNG", 0, 0, 1000, 700);
//       pdf.save(`${userName}_${title}_Certificate.pdf`);

//       root.unmount();
//       document.body.removeChild(container);
//     } catch (err) {
//       console.error("Certificate error:", err);
//       alert("❌ Something went wrong while generating the certificate!");
//     }
//   };

//   return (
//     <div className="video-gallery">
//       <h2>🎓 Video Gallery ({username})</h2>
//       <div className="referral-income-card">
//         <h3>💰 Referral Earnings: ₹{referralIncome.toLocaleString()}</h3>
//       </div>

//       <div className="video-grid">
//         {videos.map((vid, i) => (
//           <div className="video-card" key={vid.id}>
//             <img src={vid.img} alt={vid.title} className="thumbnail" />
//             <h3>{vid.title} <span>{vid.duration}</span></h3>
//             <p>{vid.desc}</p>

//             <div className="btn-row">
//               {stages[i] === "locked" && (
//                 <button className="locked-btn">
//                   🔒 Locked{" "}
//                   {unlockDates[i] && (
//                     <small>(Unlocks on {unlockDates[i].toLocaleDateString()})</small>
//                   )}
//                 </button>
//               )}

//               {stages[i] === "unlocked" && (
//                 <button className="watch-btn" onClick={() => handleWatch(i)}>
//                   ▶ Watch Now
//                 </button>
//               )}

//               {stages[i] === "quiz" && (
//                 <button className="quiz-btn" onClick={() => setShowQuiz(i)}>
//                   🧠 Take Quiz
//                 </button>
//               )}

//               {stages[i] === "certificate" && (
//                 <button className="cert-btn" onClick={() => handleDownloadCertificate(vid.title)}>
//                   🏆 Download Certificate
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {openVideo !== null && (
//         <div className="video-modal">
//           <div className="video-popup">
//             <div className="video-header">
//               <h3>📹 Course Video</h3>
//               <button className="close-btn" onClick={() => setOpenVideo(null)}>✕</button>
//             </div>
//             <video
//               ref={(el) => (videoRefs.current[openVideo] = el)}
//               src={videos[openVideo].src}
//               onEnded={() => handleVideoEnd(openVideo)}
//               onTimeUpdate={() => handleTimeUpdate(openVideo)}
//               onSeeking={() => handleSeeking(openVideo)}
//               controls
//               controlsList="nodownload noremoteplayback noplaybackrate nofullscreen"
//               disablePictureInPicture
//               onContextMenu={(e) => e.preventDefault()}
//               autoPlay
//             />
//           </div>
//         </div>
//       )}

//       {showQuiz !== null && (
//         <div className="quiz-modal">
//           <div className="quiz-container">
//             <div className="quiz-header">
//               <h3>🧠 Course Quiz</h3>
//               <button className="close-btn" onClick={() => setShowQuiz(null)}>✕</button>
//             </div>
//             <div className="progress-bar">
//               <div
//                 className="progress"
//                 style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
//               ></div>
//             </div>
//             <div className="quiz-content">
//               <p className="question-text">
//                 Q{currentQuestion + 1}. {quizData[currentQuestion].question}
//               </p>
//               <div className="options">
//                 {quizData[currentQuestion].options.map((opt, optIdx) => (
//                   <label key={optIdx} className="option-item">
//                     <input
//                       type="radio"
//                       name={`q${currentQuestion}`}
//                       checked={answers[currentQuestion] === optIdx}
//                       onChange={() => handleAnswer(currentQuestion, optIdx)}
//                     />
//                     {opt}
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div className="quiz-footer">
//               <button
//                 className="prev-btn"
//                 onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
//                 disabled={currentQuestion === 0}
//               >
//                 ← Prev
//               </button>
//               {currentQuestion < quizData.length - 1 ? (
//                 <button className="next-btn" onClick={() => setCurrentQuestion((prev) => prev + 1)}>
//                   Next →
//                 </button>
//               ) : (
//                 <button className="submit-btn" onClick={() => handleQuizSubmit(showQuiz)}>
//                   ✅ Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoGallery;
