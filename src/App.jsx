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

    <div className="main-wrapper">

      <TopBar page={page} onAdd={() => alert("Open modal")} />

      <main className="main-content">

        {page === "dashboard" && (
          <>
            <SummaryCards />
            <DashboardCharts />
            <RecentTransactions setPage={setPage} />
          </>
        )}

        {page === "transactions" && <TransactionsTable />}
        {page === "insights" && <InsightsSection />}

      </main>
    </div>
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