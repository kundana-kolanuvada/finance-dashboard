import { useState } from "react";
import { useApp } from "../context/AppContext";
import AddTransactionModal from "./AddTransactionModal";

export default function TransactionsTable() {
  const { transactions, role, searchQuery, setSearchQuery, deleteTransaction } = useApp();
  const [open,setOpen]=useState(false);

  const filtered = transactions.filter(t =>
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="card">
      <h2>Transactions</h2>

      <input
        className="search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
      />

      {role==="admin" && <button className="btn" onClick={()=>setOpen(true)}>+ Add</button>}

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th><th>Description</th><th>Amount</th>
            {role==="admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.map(t=>(
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>₹{t.amount}</td>
              {role==="admin" && (
                <td><button onClick={()=>deleteTransaction(t.id)}>Delete</button></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {open && <AddTransactionModal onClose={()=>setOpen(false)}/>}
    </div>
  );
}