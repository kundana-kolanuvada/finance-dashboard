import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function TopBar({ page, onAdd }) {
  const { role, setRole, transactions } = useApp();
  const [showExport, setShowExport] = useState(false);

  const getTitle = () => {
    if (page === "dashboard") return "Dashboard Overview";
    if (page === "transactions") return "Transactions";
    if (page === "insights") return "Insights & Analytics";
    return "";
  };

  // CSV
  const exportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];
    const rows = transactions.map(t => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "transactions.csv";
    link.click();
  };

  // JSON
  const exportJSON = () => {
    const data =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(transactions, null, 2));

    const link = document.createElement("a");
    link.href = data;
    link.download = "transactions.json";
    link.click();
  };

  return (
    <div className="topbar">

      <h2 className="topbar-title">{getTitle()}</h2>

      <div className="topbar-right">

        {/* ROLE */}
        <div className="role-wrapper">
          <span className="role-label">Role:</span>

          <select
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* EXPORT */}
        <div className="export-box">
          <button onClick={() => setShowExport(!showExport)}>
            Export ▾
          </button>

          {showExport && (
            <div className="export-dropdown">
              <div onClick={exportCSV}>Download CSV</div>
              <div onClick={exportJSON}>Download JSON</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}