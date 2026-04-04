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
    <div className="modal-overlay">
      <div className="modal">

        {/* HEADER */}
        <h3 className="modal-title">
          {editData ? "Edit Transaction" : "Add Transaction"}
        </h3>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Description</label>
          <input
            placeholder="Enter description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* AMOUNT */}
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label>Category</label>
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
        </div>

        {/* TYPE */}
        <div className="form-group">
          <label>Type</label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* DATE */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSubmit}>
            {editData ? "Update" : "Add"}
          </button>

          <button className="btn-clear" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}