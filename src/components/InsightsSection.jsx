import { useApp } from "../context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function InsightsSection() {
  const { transactions } = useApp();

  // FILTER 
  const expenses = transactions.filter(t => t.type === "expense");
  const incomeTx = transactions.filter(t => t.type === "income");

  const totalIncome = incomeTx.reduce((a, b) => a + b.amount, 0);
  const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);

  const savingsRate = totalIncome
    ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(0)
    : 0;

  // CATEGORY
  const categoryMap = {};
  expenses.forEach(t => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const sortedCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1]);

  const topCategory = sortedCategories[0];

  // MONTHLY DATA
  const monthly = {};

  transactions.forEach(t => {
    const date = new Date(t.date);

    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);

    const label = `${month} ${year}`;

    if (!monthly[label]) {
      monthly[label] = {
        month: label,
        dateObj: new Date(date.getFullYear(), date.getMonth()),
        income: 0,
        expense: 0,
      };
    }

    if (t.type === "income") monthly[label].income += t.amount;
    else monthly[label].expense += t.amount;
  });

  // SORT
  const chartData = Object.values(monthly)
    .sort((a, b) => a.dateObj - b.dateObj);

  // AVERAGE
  const avgIncome = (totalIncome / 6).toFixed(2);
  const avgExpense = (totalExpense / 6).toFixed(2);

  return (
    <div className="insights-container">
      <h2 className="insights-title">Insights & Analytics</h2>

      {/* CARDS */}
      <div className="insights-cards">
        <div className="insight-card purple">
          <p>HIGHEST SPENDING CATEGORY</p>
          <h3>{topCategory?.[0]}</h3>
          <span>₹{topCategory?.[1]?.toLocaleString()} total</span>
        </div>

        <div className="insight-card green">
          <p>MONTHLY EXPENSE CHANGE</p>
          <h3>₹190</h3>
          <span>Decreased vs last month</span>
        </div>

        <div className="insight-card blue">
          <p>AVG MONTHLY INCOME</p>
          <h3>₹{avgIncome}</h3>
          <span>Over 6 months</span>
        </div>

        <div className="insight-card purple">
          <p>AVG MONTHLY EXPENSES</p>
          <h3>₹{avgExpense}</h3>
          <span>Over 6 months</span>
        </div>

        <div className="insight-card green">
          <p>OVERALL SAVINGS RATE</p>
          <h3>{savingsRate}%</h3>
          <span>Great savings habit!</span>
        </div>

        <div className="insight-card blue">
          <p>TOTAL TRANSACTIONS</p>
          <h3>{transactions.length}</h3>
          <span>₹{totalIncome.toLocaleString()} income</span>
        </div>
      </div>

      {/* CHARTS */}
      <div className="insights-charts">
        
        {/* BAR CHART */}
        <div className="chart-box">
          <h3>Monthly Income vs Expenses</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid stroke="#222" />
              
              <XAxis 
                dataKey="month" 
                stroke="#aaa"
                tick={{ fontSize: 12 }}
              />

              <YAxis 
                stroke="#aaa"
                tickFormatter={(v) => `${v / 1000}k`}
              />

              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "#0f0f0f",
                  border: "1px solid #262626",
                  borderRadius: "10px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
              />

              <Bar dataKey="income" fill="#22c55e" />
              <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CATEGORY BREAKDOWN */}
        <div className="chart-box">
          <h3>Category Breakdown</h3>

          {sortedCategories.map(([cat, val]) => (
            <div key={cat} className="cat-row">
              <span>{cat}</span>

              <div className="cat-bar">
                <div
                  className="cat-fill"
                  style={{
                    width: `${(val / sortedCategories[0][1]) * 100}%`,
                  }}
                />
              </div>

              <span>₹{val}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}