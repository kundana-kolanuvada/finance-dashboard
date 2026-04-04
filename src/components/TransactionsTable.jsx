import { useState } from "react";
import { useApp } from "../context/AppContext";
import AddTransactionModal from "./AddTransactionModal";
import { CATEGORIES } from "../data/mockData";

export default function TransactionsTable() {
  const {
    transactions,
    role,
    searchQuery,
    setSearchQuery,
    deleteTransaction,
  } = useApp();

  const [open, setOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [month, setMonth] = useState("all");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const filtered = transactions.filter((t) => {
    const matchSearch = t.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchCategory = category === "all" || t.category === category;
    const matchType = type === "all" || t.type === type;

    const matchMonth =
      month === "all" ||
      new Date(t.date).getMonth() + 1 === parseInt(month);

    return matchSearch && matchCategory && matchType && matchMonth;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="card">
      <h2>Transactions</h2>

      {/* TOP BAR */}
      <div className="top-bar">
        <input
          className="search-small"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select onChange={(e) => setType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select onChange={(e) => setMonth(e.target.value)}>
          <option value="all">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", {
                month: "short",
              })}
            </option>
          ))}
        </select>

        {role === "admin" && (
          <button className="btn" onClick={() => setOpen(true)}>
            + Add
          </button>
        )}
      </div>

      {/* TABLE */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {paginated.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>

              <td>
                <span className={`badge cat-${t.category.toLowerCase()}`}>
                  {t.category}
                </span>
              </td>

              <td>
                <span className={`type ${t.type}`}>
                  {t.type.toUpperCase()}
                </span>
              </td>

              <td className={t.type === "income" ? "income-text" : "expense-text"}>
                ₹{t.amount}
              </td>

              {role === "admin" && (
                <td>
                  <button className="edit-btn" onClick={() => setEditTx(t)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTransaction(t.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="pagination-bar">
        <span>Page {page} of {totalPages || 1}</span>

        <div>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={page === i + 1 ? "active-page" : ""}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {open && <AddTransactionModal onClose={() => setOpen(false)} />}
      {editTx && (
        <AddTransactionModal
          editData={editTx}
          onClose={() => setEditTx(null)}
        />
      )}
    </div>
  );
}