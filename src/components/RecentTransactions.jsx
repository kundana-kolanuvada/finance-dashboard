import { useApp } from "../context/AppContext";

export default function RecentTransactions({ setPage }) {
  const { transactions } = useApp();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="card">
      <div className="recent-header">
        <h2>Recent Transactions</h2>

        <span
          className="view-all"
          onClick={() => setPage("transactions")}
        >
          View All →
        </span>
      </div>

      <table className="table-pro">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {recent.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>

              <td>
                <span className={`chip cat-${t.category.toLowerCase()}`}>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}