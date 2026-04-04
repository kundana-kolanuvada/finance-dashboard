import { useState } from "react";
import { useApp } from "../context/AppContext";
import AddTransactionModal from "./AddTransactionModal";
import { CATEGORIES } from "../data/mockData";

export default function TransactionsTable() {
  const { transactions, role, deleteTransaction } = useApp();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [month, setMonth] = useState("all");

  const [open, setOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);

  // PAGINATION
  const [page, setPage] = useState(1);
  const perPage = 10;

  // MONTH OPTIONS
  const MONTHS = [
    { value: "all", label: "All Months" },
    { value: "01", label: "Jan" },
    { value: "02", label: "Feb" },
    { value: "03", label: "Mar" },
    { value: "04", label: "Apr" },
    { value: "05", label: "May" },
    { value: "06", label: "Jun" },
    { value: "07", label: "Jul" },
    { value: "08", label: "Aug" },
    { value: "09", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];

  // FILTER LOGIC
  const filtered = transactions.filter((t) => {
    const txMonth = t.date?.split("-")[1];

    return (
      t.description.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || t.category === category) &&
      (type === "all" || t.type === type) &&
      (month === "all" || txMonth === month)
    );
  });

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="card">
      <h2>Transactions</h2>

      {/* TOOLBAR */}
      <div className="toolbar-row">
        <input
          className="search-dark"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select value={category} onChange={(e) => {
          setCategory(e.target.value);
          setPage(1);
        }}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select value={type} onChange={(e) => {
          setType(e.target.value);
          setPage(1);
        }}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* MONTH FILTER */}
        <select value={month} onChange={(e) => {
          setMonth(e.target.value);
          setPage(1);
        }}>
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        {/* CLEAR */}
        <button
          className="btn-clear"
          onClick={() => {
            setSearch("");
            setCategory("all");
            setType("all");
            setMonth("all");
            setPage(1);
          }}
        >
          Clear
        </button>

        {role === "admin" && (
          <button className="btn-primary" onClick={() => setOpen(true)}>
            + Add
          </button>
        )}
      </div>

      {/* TABLE */}
      <table className="table-pro">
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
          {paginated.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No transactions found
              </td>
            </tr>
          ) : (
            paginated.map((t) => (
              <tr key={t.id}>
                <td>{t.date}</td>

                <td className="desc">{t.description}</td>

                <td>
                  <span className={`chip cat-${t.category.toLowerCase().replace(/\s+/g, "-")}`}>
                    {t.category}
                  </span>
                </td>

                <td>
                  <span className={`tag ${t.type}`}>
                    {t.type}
                  </span>
                </td>

                <td className={t.type === "income" ? "green" : "red"}>
                  ₹{t.amount}
                </td>

                {role === "admin" && (
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => setEditTx(t)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => deleteTransaction(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      {filtered.length > 0 && (
        <div className="pagination-bar">
          <span>
            Page {page} of {totalPages}
          </span>

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
      )}

      {/* MODALS */}
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