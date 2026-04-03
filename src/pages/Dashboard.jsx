import SummaryCards from "../components/SummaryCards";
import TransactionsTable from "../components/TransactionsTable";
import Insights from "../components/Insights";
import RoleSwitcher from "../components/RoleSwitcher";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Finance Dashboard</h1>

      <RoleSwitcher />
      <SummaryCards />
      <Insights />
      <TransactionsTable />
    </div>
  );
};

export default Dashboard;