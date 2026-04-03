import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const SummaryCards = () => {
  const { transactions } = useContext(AppContext);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="card-container">
      <div className="card">Balance: ₹{balance}</div>
      <div className="card">Income: ₹{income}</div>
      <div className="card">Expenses: ₹{expenses}</div>
    </div>
  );
};

export default SummaryCards;