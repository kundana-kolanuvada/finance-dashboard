import { useState } from "react";
import { useApp } from "../context/AppContext";
import { CATEGORIES } from "../data/mockData";

export default function AddTransactionModal({ onClose, editData }) {
  const { addTransaction, editTransaction } = useApp();

  const [form, setForm] = useState(
    editData || {
      description: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: "",
    }
  );

  const handleSubmit = () => {
    if (!form.description || !form.amount || !form.date) return;

    const tx = {
      ...form,
      amount: parseFloat(form.amount),
    };

    if (editData) {
      editTransaction(tx);
    } else {
      addTransaction(tx);
    }

    onClose();
  };

  return (
    <div className="modal">
      <h3>{editData ? "Edit" : "Add"} Transaction</h3>

      <input
        value={form.description}
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="number"
        value={form.amount}
        placeholder="Amount"
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <select
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      >
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <select
        value={form.type}
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        type="date"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <button className="btn" onClick={handleSubmit}>
        {editData ? "Update" : "Add"}
      </button>

      <button onClick={onClose}>Cancel</button>
    </div>
  );
}