import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TransactionsTable = () => {
  const { transactions, search, setSearch, role } = useContext(AppContext);

  const filtered = transactions.filter(t =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Transactions</h2>

      <input
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {role === "admin" && <button>Add Transaction</button>}
    </div>
  );
};

export default TransactionsTable;