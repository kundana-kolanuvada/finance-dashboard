import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import TransactionsTable from "./components/TransactionsTable";
import DashboardCharts from "./components/DashboardCharts";
import RecentTransactions from "./components/RecentTransactions";
import InsightsSection from "./components/InsightsSection";
import TopBar from "./components/TopBar"
import "./styles/global.css";

function AppContent() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-layout">
      <Sidebar activePage={page} setActivePage={setPage} />

      <main className="main-content">
        <TopBar onAdd={() => alert("Open Add Modal")} />
        {page === "dashboard" && (
          <>
            <div className="dashboard-section">
              <SummaryCards />
            </div>

            <div className="dashboard-section">
              <DashboardCharts />
            </div>

            <div className="dashboard-section">
              <RecentTransactions setPage={setPage} />
            </div>
          </>
        )}

        {page === "transactions" && <TransactionsTable />}
        {page === "insights" && <InsightsSection />}

      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}