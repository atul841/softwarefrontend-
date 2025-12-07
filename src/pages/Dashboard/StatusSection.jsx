import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./StatusSection.css";

export default function StatusSection({ totalIncome }) {
  const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

  // 💾 State
  const [viewMode, setViewMode] = useState("Monthly"); // 'Monthly' | 'Weekly'
  const [monthlyData, setMonthlyData] = useState(
    monthLabels.map((m) => ({ name: m, income: 0 }))
  );
  const [weeklyData, setWeeklyData] = useState(
    weekLabels.map((w) => ({ name: w, income: 0 }))
  );

  const [lastIncome, setLastIncome] = useState(0);

  // 📊 Update data based on current view
  useEffect(() => {
    if (totalIncome > lastIncome) {
      const diff = totalIncome - lastIncome;
      const now = new Date();

      if (viewMode === "Monthly") {
        const monthIndex = now.getMonth();
        setMonthlyData((prev) => {
          const updated = [...prev];
          updated[monthIndex] = {
            ...updated[monthIndex],
            income: updated[monthIndex].income + diff,
          };
          return updated;
        });
      } else {
        const weekIndex = Math.floor((now.getDate() - 1) / 7); // 0–3
        setWeeklyData((prev) => {
          const updated = [...prev];
          updated[weekIndex] = {
            ...updated[weekIndex],
            income: updated[weekIndex].income + diff,
          };
          return updated;
        });
      }

      setLastIncome(totalIncome);
    }
  }, [totalIncome, lastIncome, viewMode]);

  // 🧠 Chart height responsive
  const [chartHeight, setChartHeight] = useState(
    Math.max(300, window.innerHeight * 0.35)
  );

  useEffect(() => {
    const handleResize = () =>
      setChartHeight(Math.max(300, window.innerHeight * 0.35));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeData = viewMode === "Monthly" ? monthlyData : weeklyData;

  return (
    <div className="status-section">
      <div className="status-chart-box">
        <div className="chart-header">
          <h2>Status</h2>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option>Monthly</option>
            <option>Weekly</option>
          </select>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={activeData}>
              {/* Gradient Line */}
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#86efac" stopOpacity={0.2} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#555" }} />
              <YAxis tick={{ fill: "#555" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />
              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                stroke="url(#incomeGradient)"
                strokeWidth={4}
                dot={{ r: 5, fill: "#22c55e", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 8, stroke: "#16a34a", strokeWidth: 3 }}
                name={`${viewMode} Income`}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>

          <p className="chart-info">
            Showing {viewMode.toLowerCase()} revenue forecast based on current
            income progress.
          </p>
        </div>
      </div>
    </div>
  );
}
