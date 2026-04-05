import { createContext, useContext, useEffect, useState } from "react";
import { MOCK_TRANSACTIONS } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {

  // TRANSACTIONS LOCAL STORAGE
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("tx");
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
    // return MOCK_TRANSACTIONS;
  });

  // ROLE
  const [role, setRole] = useState("admin");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // SAVE TRANSACTIONS
  useEffect(() => {
    localStorage.setItem("tx", JSON.stringify(transactions));
  }, [transactions]);

  // SAVE THEME
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme; 
  }, [theme]);

  // ADD
  const addTransaction = (tx) => {
    setTransactions(prev => [
      { ...tx, id: Date.now() },
      ...prev
    ]);
  };

  // DELETE
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // EDIT
  const editTransaction = (updatedTx) => {
    setTransactions(prev =>
      prev.map(t => (t.id === updatedTx.id ? updatedTx : t))
    );
  };

  // CALCULATIONS
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        setRole,
        addTransaction,
        deleteTransaction,
        editTransaction,
        income,
        expense,
        balance: income - expense,
        theme,      
        setTheme    
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);