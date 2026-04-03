import { FiGrid, FiList, FiTrendingUp } from "react-icons/fi";
import RoleSwitcher from "./RoleSwitcher";

export default function Sidebar({ activePage, setActivePage }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: <FiGrid/> },
    { id: "transactions", label: "Transactions", icon: <FiList/> },
    { id: "insights", label: "Insights", icon: <FiTrendingUp/> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Wealth<span>Flow</span></div>

      {items.map(i => (
        <button
          key={i.id}
          className={`nav-item ${activePage===i.id?"active":""}`}
          onClick={()=>setActivePage(i.id)}
        >
          {i.icon} {i.label}
        </button>
      ))}

      <RoleSwitcher/>
    </aside>
  );
}