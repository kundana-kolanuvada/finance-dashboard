import { createContext, useState } from "react";
import { transactions as mockData } from "../data/mockData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockData);
  const [role, setRole] = useState("viewer"); // viewer | admin
  const [search, setSearch] = useState("");

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        search,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};