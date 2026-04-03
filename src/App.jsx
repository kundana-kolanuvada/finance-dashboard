import { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import TransactionsTable from "./components/TransactionsTable";
import InsightsSection from "./components/InsightsSection";
import { motion } from "framer-motion";
import "./styles/global.css";

function AppContent(){
  const [page,setPage]=useState("dashboard");

  return (
    <div className="app-layout">
      <Sidebar activePage={page} setActivePage={setPage}/>

      <main className="main-content">
        <motion.div key={page} initial={{opacity:0}} animate={{opacity:1}}>

          {page==="dashboard" && <SummaryCards/>}
          {page==="transactions" && <TransactionsTable/>}
          {page==="insights" && <InsightsSection/>}

        </motion.div>
      </main>
    </div>
  );
}

export default function App(){
  return <AppProvider><AppContent/></AppProvider>;
}