import { useEffect, useState } from "react";

export default function Sidebar({ activePage, setActivePage }) {

  // THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // APPLY THEME
  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // TOGGLE FUNCTION
  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="sidebar">

      <div className="sidebar-logo">
        Fin<span>flow</span>
      </div>

      <button
        className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
        onClick={() => setActivePage("dashboard")}
      >
        Dashboard
      </button>

      <button
        className={`nav-item ${activePage === "transactions" ? "active" : ""}`}
        onClick={() => setActivePage("transactions")}
      >
        Transactions
      </button>

      <button
        className={`nav-item ${activePage === "insights" ? "active" : ""}`}
        onClick={() => setActivePage("insights")}
      >
        Insights
      </button>

      {/* THEME TOGGLE (BOTTOM) */}
      <div className="theme-toggle">
        <h3> Theme : </h3>
        <div className="toggle-switch" onClick={toggleTheme}>
          <div className="toggle-track">
            
            <div className="toggle-thumb"></div>

            {/* ICONS */}
            <span className="icon moon">🌙</span>
            <span className="icon sun">☀️</span>

          </div>
        </div>

      </div>
    </div>
  );
}