import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useApp();

  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    date: "",
  });

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;

    addTransaction({
      ...form,
      amount: parseFloat(form.amount),
    });

    onClose();
  };

  return (
    <div className="modal">
      <h3>Add Transaction</h3>

      <input
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Amount"
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Add</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}