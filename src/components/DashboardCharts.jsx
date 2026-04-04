import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function DashboardCharts() {
  const { transactions } = useApp();
  const [range, setRange] = useState(6);

  // LAST 12 MON
  const getMonths = () => {
    const months = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

      months.push({
        key: d.toISOString().slice(0, 7),
        label: d.toLocaleString("default", {
          month: "short",
          year: "2-digit",
        }),
        income: 0,
        expense: 0,
      });
    }

    return months;
  };

  const monthsData = getMonths();

  // MAP DATA
  transactions.forEach((t) => {
    const key = t.date.slice(0, 7);
    const found = monthsData.find((m) => m.key === key);

    if (found) {
      if (t.type === "income") found.income += t.amount;
      else found.expense += t.amount;
    }
  });

  // BALANCE TREND
  let running = 0;

  const trendData = monthsData.map((m) => {
    running += m.income - m.expense;
    return { date: m.label, balance: running };
  });

  const finalTrend = trendData.slice(-range);

  // K FORMAT
  const formatK = (v) => (v >= 1000 ? v / 1000 + "k" : v);

  // DONUT DATA
  const categoryData = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryData[t.category] =
        (categoryData[t.category] || 0) + t.amount;
    });

  const total = Object.values(categoryData).reduce((a, b) => a + b, 0);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    percent: ((value / total) * 100).toFixed(0),
  }));

  // pastel colors
  const COLORS = [
    "#a5b4fc",
    "#6ee7b7",
    "#fca5a5",
    "#fde68a",
    "#93c5fd",
    "#f9a8d4",
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{label}</p>
          <p>₹{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  const DonutTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="custom-tooltip">
          <p>{data.name}</p>
          <p>₹{data.value}</p>
          <p>{data.percent}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-grid">

      {/* BALANCE TREND */}
      <div className="card">
        <div className="chart-header">
          <h2>Balance Trend</h2>

          <select
            className="range-dropdown"
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
          >
            <option value={6}>Last 6 Months</option>
            <option value={12}>Last 12 Months</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={finalTrend}>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis tickFormatter={formatK} stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#6366f1"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* DONUT CHART */}
      <div className="card">
        <h2>Spending by Category</h2>

        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip content={<DonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* LEGEND */}
        <div className="donut-legend">
          {pieData.map((item, i) => (
            <div key={i} className="legend-item">
              <span
                className="dot"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              {item.name} - {item.percent}%
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}